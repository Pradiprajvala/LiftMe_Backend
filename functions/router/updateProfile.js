const express = require('express')
const Authenticate = require('../middlewere/authenticate')
const router = express.Router()
require('../db/connection')

router.post('/updateProfileImage' , Authenticate, async (req,res) => {
    try {
        const user = req.user
        const image = req.body.image 
        const data = await user.updateProfileImage({image})
        if(!data) {
            throw new Error('cant upload Image')
        }
        res.status(201).json({msg: "updated Sucessfully"})

    } catch(err) {
        console.log(err)
        res.status(500).json({msg: 'cant update image'})
    }
})

module.exports = router