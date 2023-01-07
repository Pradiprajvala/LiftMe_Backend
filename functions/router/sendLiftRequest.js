const express = require('express')

const Authenticate = require('../middlewere/authenticate')
require('../db/connection')
const Car = require('../model/carSchema')
const User = require('../model/userSchema')
const router = express.Router()
router.post('/sendLiftRequest', Authenticate, async (req,res) => {
    console.log('req came')
    const {carId, ownerId} = req.body
    const userId = req.user._id
    const user = req.user
    try {
        // console.log(req.body)
        const owner = await User.findOne({_id: ownerId})
        const car = await Car.findOne({_id: carId})
       
        const updatedUser = await owner.addCarRequest({userId, carId, isApproved: false})
        const updatedMe = await user.addCarRequestByMe({ownerId,carId, isApproved: false})
        
        const updatedCar = await car.addCarRequest({userId, isApproved: false})

        if(updatedUser && updatedCar && updatedMe){
            res.status(201).json({user: updatedUser, car: updatedCar})
            console.log(updatedMe)
        } else {
            throw new Error('error')
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({msg: 'could not send request'})

    }
    
})

module.exports = router