const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 3 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        },

    },
    location:{
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
});

driverSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
}

driverSchema.methods.comparePassword = async function(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
}

driverSchema.statics.hashPassword = async function(plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, 10);
}

const driverModel = mongoose.model('Driver', driverSchema);

module.exports = driverModel;