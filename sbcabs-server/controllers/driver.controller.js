const driverService = require('../services/driver.service');
const blacklistTokenService = require('../services/blacklistToken.service');
const { validationResult } = require('express-validator');


module.exports.registerDriver = async (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { fullname: { firstname, lastname }, email, password, vehicle } = req.body;

     const isDriverAlreadyRegistered = await driverService.getDriverByEmail(email);

     if (isDriverAlreadyRegistered) {
          return res.status(400).json({ message: 'Driver already registered' });
     }

     const hashedPassword = await driverService.hashPassword(password);

     const driver = await driverService.createDriver({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          color: vehicle.color,
          plate: vehicle.plate,
          capacity: vehicle.capacity,
          vehicleType: vehicle.vehicleType
     });

     const token = driver.generateAuthToken();

     res.status(201).json({ token, driver });

}

module.exports.loginDriver = async (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;

     const driver = await driverService.getDriverByEmail(email);

     if (!driver) {
          res.status(404).json({ message: 'Driver not found' });
     }

     const isMatch = await driver.comparePassword(password);

     if (!isMatch) {
          res.status(401).json({ message: 'Invalid credentials' });
     }

     const token = driver.generateAuthToken();

     res.cookie('token', token, { httpOnly: true });

     res.status(200).json({ token, driver });
}

module.exports.getDriverProfile = async (req, res, next) => {

     res.status(200).json(req.driver);
}

module.exports.updateDriverProfile = async (req, res, next) => {
     const driver = req.driver;

     const updatedDriver = await driverService.updateDriver(driver._id, req.body);

     res.status(200).json(updatedDriver);
}

module.exports.logoutDriver = async (req, res, next) => {
     res.clearCookie('token');
     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
     await blacklistTokenService.addToBlacklist(token);

     res.status(200).json({ message: 'Logged out successfully' });
}