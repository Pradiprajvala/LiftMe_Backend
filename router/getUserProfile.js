const express = require('express')
const router = express.Router()
require('../db/connection')
const Authenticate = require('../middlewere/authenticate') 
const Car = require('../model/carSchema')
const User = require('../model/userSchema')

router.get('/getUserProfile', async (req,res) => {
    console.log('req came')
    const {id} = req.query
     console.log(req.query);
    try {
        const user = await User.findOne({_id: id})
    if(!user){
        throw new Error('user not found')
    }
    console.log(user)
    const cars = await Car.find({_id: {$in: user.myCars}})
    if(!cars){
        throw new Error('cars not found')
    }
    console.log(cars)
    const {_id, name, email, myCars, image} = user
    res.status(201).json({user: {
        _id, name, email, myCars,image
    },
    cars})
    } catch(err) {
        console.log(err)

    }
    
})

module.exports = router