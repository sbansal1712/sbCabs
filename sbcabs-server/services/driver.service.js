const driverModel = require('../models/driver.model');

module.exports.createDriver = async({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const driver = driverModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return driver;
}

module.exports.getDriverByEmail = async(email) => {
    if (!email) {
        throw new Error('Email is required');
    }
    const driver = driverModel.findOne({
        email
    }).select('+password');
    return driver;
}

module.exports.getDriverById = async(id) => {
    if (!id) {
        throw new Error('Driver ID is required');
    }
    const driver = driverModel.findById(id);
    return driver;
}

module.exports.updateDriver = async(id, {
    fullname: {firstname, lastname},
    email
}) => {
    if (!id) {
        throw new Error('Driver ID is required');
    }
    const driver = await driverModel.findByIdAndUpdate(id, {
        fullname: {
            firstname,
            lastname
        },
        email
    }, {
        new: true,
    })
    return driver;
}

module.exports.hashPassword = async(password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    return await driverModel.hashPassword(password);
}