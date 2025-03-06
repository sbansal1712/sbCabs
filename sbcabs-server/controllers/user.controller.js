const userService = require('../services/user.service');
const blacklistTokenService = require('../services/blacklistToken.service');
const {validationResult} = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({errors: errors.array()});
    }

    const {fullname: {firstname, lastname}, email, password} = req.body;

    const hashedPassword = await userService.hashPassword(password);

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

     res.status(201).json({token, user});
    
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
         res.status(404).json({message: 'User not found'});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
         res.status(401).json({message: 'Invalid credentials'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {httpOnly: true}); 

    res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req, res, next) => {

     res.status(200).json(req.user);
}

module.exports.updateUserProfile = async (req, res, next) => {
    const user = req.user;

    const updatedUser = await userService.updateUser(user._id, req.body);

    res.status(200).json(updatedUser);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenService.addToBlacklist(token);

     res.status(200).json({message: 'Logged out successfully'});
}