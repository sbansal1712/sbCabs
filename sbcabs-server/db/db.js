const mongoose = require('mongoose');


function connectToDB() {
    return mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
            console.log('Connected to MongoDB');})
            .catch((err) => {
                console.log('Error connecting to MongoDB', err);
    });
}

module.exports = connectToDB;