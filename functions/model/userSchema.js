const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    myCars: [
        String
    ],
    myFavouriteCars: [
        String
    ],
    requestsToMe: [
        {
            userId: {
                type: String,
            },
            carId: {
                type: String
            },
            isApproved: {
                type: Boolean,
            }
        }
    ],
    requestsByMe: [
        {
            ownerId: {
                type: String,
            },
            carId: {
                type: String
            },
            isApproved: {
                type: Boolean,
            }
        }
    ],

})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    try {
       let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
       this.tokens = this.tokens.concat({token})

       await this.save()
            return token
    } catch(err) {
        console.log(err);
    }
}

userSchema.methods.updateProfileImage = async function({image}){
    try {
        this.image = image
 
        await this.save()
             return this
     } catch(err) {
         console.log(err);
     }
}

userSchema.methods.addCarId = async function(carId) {
    try {
        this.myCars = this.myCars.concat(carId)
        await this.save()
        return this
    } catch(err) {
        console.log(err);
        return
    }
}

userSchema.methods.addCarRequest = async function({userId, carId, isApproved}){
    try {
        console.log('this',this)
        this.requestsToMe = this.requestsToMe.concat({userId, carId, isApproved})
        await this.save()
        return this
    } catch (err) {
        console.log(err)
        return
    }
}

userSchema.methods.addCarRequestByMe = async function({ownerId, carId, isApproved}){
    try {
        this.requestsByMe = this.requestsByMe.concat({ownerId, carId, isApproved})
        await this.save()
        return this
    } catch (err) {
        console.log(err)
        return
    }
}

userSchema.methods.acceptRequest = async function({requestId}) {
    try {
        this.requestsToMe.map(request => {
            // console.log(request)
            // console.log(requestId)
            if(request._id == requestId){
                request.isApproved = true
                console.log('yes')
                
            }
        })
        // console.log(this)
       await this.save()
       return this
    } catch(err) {
        console.log(err)
    }
}

userSchema.methods.requestAccepted = async function({carId}){
    try {
        this.requestsByMe.map(request => {
            if(request.carId === carId){
                request.isApproved = true
                console.log('available')
            }
        })
        await this.save()
        return this
    } catch (err) {
        console.log(err)
    }
}

userSchema.methods.postLikeDislike = async function({carId, isFavourite}) {
    try {
        if(isFavourite){
            this.myFavouriteCars = this.myFavouriteCars.concat(carId)
        } else {
            this.myFavouriteCars = this.myFavouriteCars.filter(myFavCar => myFavCar !== carId)
        }
        await this.save()
            return this
    } catch(err) {
        console.log(err)
    }
}
const User = mongoose.model('USER',userSchema)
module.exports = User

