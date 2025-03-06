const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname,
    lastname,
    email,
    password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}

module.exports.getUserByEmail = async(email) => {
    if (!email) {
        throw new Error('Email is required');
    }
    const user = userModel.findOne({
        email
    }).select('+password');
    return user;
}

module.exports.getUserById = async(id) => {
    if (!id) {
        throw new Error('User ID is required');
    }
    const user = userModel.findById(id);
    return user;
}

module.exports.updateUser = async(id, {
    fullname: {firstname, lastname},
    email
}) => {
    if (!id) {
        throw new Error('User ID is required');
    }
    const user = await userModel.findByIdAndUpdate(id, {
        fullname: {
            firstname,
            lastname
        },
        email
    }, {
        new: true,
    })
    return user;
}

module.exports.hashPassword = async(password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    return await userModel.hashPassword(password);
}