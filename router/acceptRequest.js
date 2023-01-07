const express = require('express')
const Authenticate = require('../middlewere/authenticate')
const Car = require('../model/carSchema')
const User = require('../model/userSchema')
const router = express.Router()
require('../db/connection')


router.post('/acceptRequest', Authenticate,async (req,res) => {
   try {
   const user = req.user
    const {requestId, userId,carId} = req.body 
    // console.log(requestId)
   //  console.log('hellooo')
   //  console.log('body',req.body)
   console.log(carId)
    const data = await user.acceptRequest({requestId})
    if(data) {console.log('got data 1')}
    const car = await Car.findOne({_id: carId})
    if(car) {console.log('got data 2')}
    const data2 = await car.acceptRequest({userId})
    const sender = await User.findOne({_id: userId})
    const data3 = await sender.requestAccepted({carId})
    if(data2) {console.log('got data 3')}
      if(!data || !data2 || !data3){
         throw new Error('err')
      }
      // console.log(data)
      res.status(201).json({msg: 'ok'})
   } catch(err) {
    console.log(err)
    res.status(500).json({msg:err})
   }
})

module.exports = router