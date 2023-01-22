const express = require('express')
require('../db/connection')
const router = express.Router()
const Authenticate = require('../middlewere/authenticate')
const Car = require('../model/carSchema')
const User = require('../model/userSchema')

router.post('/getRequests', Authenticate , async (req,res) => {
    const user = req.user
    const requests = user.requestsToMe
    const senders = requests.map(request => {
        return request.userId
    })
    const cars = requests.map(request => {
        return request.carId
    } )
    
    //console.log(cars)
    // console.log(users)
    // const senderId = requests.userId 
    // const carId = requests.carId
    // console.log(requests)
    try {
    const car = await Car.find({_id: {$in: cars}})
    if(!car){
        throw new Error('cant get car')
    }

    const sender = await User.find({_id: {$in: senders}})
    if(!sender){
    throw new Error('cant get sender')
    }
    // console.log('req', car,sender)
    res.status(200).json({car,sender})
    

    } catch(err) {
        res.status(404).json({msg: 'cant get data'})
        console.log(err)
    }
})

router.get('/getRequestsByMe',Authenticate, async (req,res) => {
    const user = req.user
    const requests = user.requestsByMe
    const owners = requests.map(request => { return request.ownerId })
    const cars = requests.map(request => { return request.carId })

    try {
        const car = await Car.find({_id: {$in: cars}})
        if(!car){
            throw new Error('cant get car')
        }
    
        const owner = await User.find({_id: {$in: owners}})
        if(!owner){
        throw new Error('cant get sender')
        }
        // console.log('req', car,sender)
        res.status(200).json({car,owner})
        
    
        } catch(err) {
            res.status(404).json({msg: 'cant get data'})
            console.log(err)
        }    
})

module.exports = router