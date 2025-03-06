const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const driverController = require('../controllers/driver.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type'),
], 
    driverController.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
], driverController.loginDriver);

router.get('/profile', authMiddleware.authDriver, driverController.getDriverProfile);

router.post('/profile', authMiddleware.authDriver, driverController.updateDriverProfile);

router.get('/logout', authMiddleware.authDriver, driverController.logoutDriver);

module.exports = router;