const express = require('express')
const mongoose = require('mongoose')
require('../db/connection')
const Car = require('../model/carSchema')
const router = express.Router()


router.get('/getCars',async (req,res) => {
    try{
        const cars = await Car.find()
        // console.log('res sent')
        return res.status(201).json({cars})
    } catch(err) {
        console.log(err)
        res.status(401).json('could not fetch data')
    } 
})

module.exports = router
