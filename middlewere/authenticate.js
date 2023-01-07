const jwt = require('jsonwebtoken')
const app = require('express')()
const User = require("../model/userSchema")
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const Authenticate = async (req,res,next) => {
    try {

        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        // const user = await User.findOne({_id})
        // console.log(verifyToken)
        
        const user = await User.findOne({_id: verifyToken._id, "tokens.token": token})

        if(!user){
            throw new Error('user not found')
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({msg:'No user found'})
        console.log('err cae')
        console.log(err);
        return
    }
}

module.exports = Authenticate