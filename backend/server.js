const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/database');
const cors = require("cors");
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

app.use(cors());

const whatsAppRoutes = require('./routes/whatsAppRoutes');
app.use("/api/v1",whatsAppRoutes);

//listener
app.listen(PORT,() => {
    console.log(`Server Started Successfully at Port ${PORT}`);
});

//database

dbConnect();

//api routes
app.get('/',(req,res) => {
    res.send(`<h1 style="color:green">THIS IS MY HOMEPAGE</h1>`);
});
