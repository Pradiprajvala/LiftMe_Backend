const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')

dotenv.config({path: './config.env'})

const app = express()
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

require('./db/connection')

// const User = require('./model/userSchema')
const PORT = process.env.PORT || 5001
app.use(express.json())

app.use(require('./router/auth'))

app.use(require('./router/postCar'))

app.use(require('./router/getCars'))

app.use(require('./router/getCurrentUser'))

app.use(require('./router/sendLiftRequest'))

app.use(require('./router/getRequests'))

app.use(require('./router/acceptRequest'))

app.use(require('./router/getMyProfile'))

app.use(require('./router/getMyCars'))

app.use(require('./router/getUserProfile'))

app.use(require('./router/postLikeDislike'))

app.use(require('./router/updateProfile'))

app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*", function (_, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html")),
    function (err) {
        if (err) {
            res.status(500).send(err);
        }
    }
})
// app.get('/', (req,res) => {
//     res.send('hello')
// })


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` );
})

