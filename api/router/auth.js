const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../db/connection')
const User = require('../model/userSchema')

const router = express.Router()



// router.post('/register', (req,res) => {

//     const { name, email, password , confirmPassword} = req.body

//     if( !name || !email || !password || !confirmPassword){
//         return res.status(422).json({error: "please correctly add data"})
//     }

//     User.findOne({ email: email })
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error: 'email already exist'})
//         }

//         const user = new User({name,email,password,confirmPassword})

//         user.save().then(() => {
//             res.status(201).json({message: "user registered success"})
//         }).catch((err) => res.status(500).json({error: err}) )
    
//     }).catch(err => {
//         return res.status(422).json({error: err})
//     })
// })


router.post('/register', async (req,res) => {
    
    const { name, email, password , confirmPassword, image} = req.body
    // console.log(req.body);
    if( !name || !email || !password || !confirmPassword || (password !== confirmPassword) ){
        return res.status(422).json({error: "please correctly add data"})
    }

    try {
        const userExist = await User.findOne({ email: email })

        if(userExist) {
            return res.status(422).json({error: 'email already exist'})
        }

        const user = new User({name,email,password,confirmPassword, requestsToMe: [], image})
 
        const userRegistered = await user.save()

        if(userRegistered){
            res.status(201).json({userRegistered})
        } 
        
    } catch(err) {
        console.log(err);
    }

})

router.post('/login', async (req,res) => {
    console.log('login req come')

    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: 'please fill the data'})
        }

        const userLogin = await User.findOne({email})

        if(!userLogin) return res.status(400).json({msg: ' no user found'})
        
        const isMatch = await bcrypt.compare(password, userLogin.password)
        if(isMatch){
            // res.json({msg: 'user login sucess'})
            const token = await userLogin.generateAuthToken();
            console.log(token)
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
            console.log(verifyToken);
            // res.cookie("jwtoken",token, {
            //     expires: new Date(Date.now() + (30*24*60*60*1000)), // in mili second
            //     httpOnly: true
            // })
            res.status(200).json({user: userLogin, token: token})
        } else {
            res.status(400).json({msg: 'wrong password'})
        }

        console.log(userLogin)
        
    } catch (err) {
        console.log(err)
    }
    
})
module.exports = router

