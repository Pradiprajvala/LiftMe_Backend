const express = require('express')
const Authenticate = require('../middlewere/authenticate')
const Car = require('../model/carSchema')
const router = express.Router()
require('../db/connection')

router.post('/getMyCars', Authenticate ,async (req,res) => {
    try {
        const myCarsId = req.user.myCars
        const myCars = await Car.find({_id: {$in: myCarsId}})
        if(!myCars) {
            throw new Error('cant get Your car')
        }
        res.status(200).json({myCars})

    } catch(err) {
        res.status(404).json({msg: 'cant get car'})
        console.log(err)
    }
})

module.exports = router