const express = require('express')
const Authenticate = require('../middlewere/authenticate')
const router = express.Router()
require('../db/connection')

router.get('/getMyProfile', Authenticate , (req,res) => {
    console.log('user',req.user)
    const {_id, name, email, myCars, myFavouriteCars, requestsToMe , image} = req.user
    res.status(200).json({_id, name, email, myCars, myFavouriteCars, requestsToMe, image})
})

module.exports = router