const blacklistTokenService = require('../services/blacklistToken.service');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await blacklistTokenService.isTokenBlacklisted(token);
    if (isBlacklisted) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.getUserById(decoded._id);
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }

        req.user = user;
        return next();
    }
    catch (err) {
        return res.status(401).json({message: 'Unauthorized'});
    }
};