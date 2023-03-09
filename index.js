const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')

dotenv.config({path: './config.env'})

const app = express()

const PORT = process.env.PORT || 5001;

app.use(logger("dev"))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://vercel-react-starter-l4f4lteyj-pradiprajvala.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



const cookieParser = require('cookie-parser')
app.use(cookieParser())

require('./api/db/connection')

// const User = require('./model/userSchema')
app.use(express.json())

app.use('/api',require('./api/router/auth'))

app.use('/api',require('./api/router/postCar'))

app.use('/api',require('./api/router/getCars'))

app.use('/api',require('./api/router/getCurrentUser'))

app.use('/api',require('./api/router/sendLiftRequest'))

app.use('/api',require('./api/router/getRequests'))

app.use('/api',require('./api/router/acceptRequest'))

app.use('/api',require('./api/router/getMyProfile'))

app.use('/api',require('./api/router/getMyCars'))

app.use('/api',require('./api/router/getUserProfile'))

app.use('/api',require('./api/router/postLikeDislike'))

app.use('/api',require('./api/router/updateProfile'))

// app.use(express.static(path.join(__dirname,"./client/build")))

// app.get("*", function (_, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html")),
//     function (err) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     }
// })


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` );
})

