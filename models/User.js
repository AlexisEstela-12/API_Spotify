const mongoose = require('mongoose')
const Schema = mongoose.Schema

// we create a model for the values we use in the database
const UserSchema = new Schema({
    user_id: {
        type:String,
        unique: true,
        index:true
    },
    access_Token: String,
    expireAt: {  // token is deleted 1h after being created 
        type: Date,
        default: Date.now,
        expires: 3600   
    }
})


module.exports = mongoose.model('User', UserSchema)