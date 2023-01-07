const express = require('express')
const Authenticate = require('../middlewere/authenticate')
require('../db/connection')
const User = require('../model/userSchema')
const Car = require('../model/carSchema')

const router = express.Router()

router.post('/postCar',Authenticate,async (req,res) => {
    const {name,catagory,company,passengerCapacity,transmission,fuel,tankCapacity,economy,price,images,liftFrom,dropTo} = req.body
    if(!name || !catagory || !company || !passengerCapacity || !transmission || !fuel || !tankCapacity || !economy || !price || !images || !liftFrom || !dropTo){
        return res.status(422).json({error: 'please add data correctly'})
    }
    // console.log(req.user)
    const ownerId = req.user._id
    try {
        const car = new Car({name,catagory,company,passengerCapacity,transmission,fuel,tankCapacity,economy,price,images,ownerId, liftFrom, dropTo, carRequests:[]})
        const carSaved = await car.save()

        if(carSaved){
            const user = await User.findOne({_id: req.user._id})

            const updatedUser = await user.addCarId(car._id)
            // console.log(updatedUser)
            res.status(201).json({carSaved})
            // console.log(carSaved);
            return
        } else {
            console.log('not saving car')
            res.status(422).json({error:'car coudent save'})
            return
        }
    } catch(err) {
        res.status(422).json({error:'car coudent save'})
        console.log('err')
        console.log(err);
    }
} )


module.exports = router