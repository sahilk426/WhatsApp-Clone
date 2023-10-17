const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log(`Database Connect Successfull at ${process.env.DATABASE_URL}.`);
    })
    .catch ((error) => {
        console.log("Database Connection Error");
        console.error(error);
    })
}

module.exports = dbConnect;