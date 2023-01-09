const express = require('express')
const Authenticate = require('../middlewere/authenticate')
const Car = require('../model/carSchema')
const User = require('../model/userSchema')
const router = express.Router()
require('../db/connection')

router.post('/postLikeDislike', Authenticate ,async (req,res) => {
    try {
        
        const {carId} = req.body
        const {isFavourite} = req.body
        console.log(req.body)
        const user = req.user
        const data = await user.postLikeDislike({carId, isFavourite})
        if(!data) {
            throw new Error('cant like car')
        }
        console.log(data)
        
        res.status(201).json({data})

    } catch(err) {
        res.status(404).json({msg: 'cant get car'})
        console.log(err)
    }
})

module.exports = router