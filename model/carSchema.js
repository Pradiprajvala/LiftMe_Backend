const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    passengerCapacity: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        required: true
    },
    tankCapacity: {
        type: Number,
        required: true
    },
    economy: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
         String
    ],
    ownerId: {
        type: String,
        required: true
    },
    liftFrom: {
        type: String,
        required: true,
    },
    dropTo: {
        type: String,
        required: true,
    },
    carRequests: [
        {
            userId: {
                type: String
            },

            isApproved: {
                type: Boolean
            }
        }
    ]

    
})

carSchema.methods.addCarRequest = async function({userId,isApproved}) {
    try {
        this.carRequests = this.carRequests.concat({userId, isApproved})
        await this.save()
        return this
    } catch (err) {
        console.log(err)
        return
    }
}

carSchema.methods.acceptRequest = async function({userId}){
    try {
        this.carRequests.map(request => {
            if(request.userId == userId){
                request.isApproved = true
                console.log('this', request, 'userId', userId)
                console.log('got')
            }
        })
        console.log(this)
        await this.save()
        return this
    } catch(err) {
        console.log(err)
    }
}


const Car = mongoose.model('CAR', carSchema)
module.exports = Car