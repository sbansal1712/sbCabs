const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.isTokenBlacklisted = async(token) => {
    if (!token) {
        throw new Error('Token is required');
    }
    const isBlacklisted = blacklistTokenModel.findOne({
        token
    });
    return isBlacklisted;
}

module.exports.addToBlacklist = async(token) => {
    if (!token) {
        throw new Error('Token is required');
    }
    const blacklistedToken = blacklistTokenModel.create({
        token
    });
    return blacklistedToken;
}