const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const app = express();
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const driverRoutes = require('./routes/driver.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);


module.exports = app;