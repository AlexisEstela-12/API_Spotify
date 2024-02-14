const mongoose = require('mongoose')
const User = require('../models/User')


/**
 * Function that initiates the connection with the database using the env values
 */
const connectDB = async() =>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_DB)
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch(error){
        console.log(error)
    }
}

/**
 * 
 * @param {string} id value used to look up the user's token to query the spotify api
 * @param {string} token token value used for authentication in the spotify api
 */
const saveDB = async(id,token) =>{
    // the user is found and verified
    const existingUser = await User.findOne({user_id: id})
    if (existingUser){
        console.log('The user is already in the DB')
    } else {
        // If it is not saved, it is added to the database
        const newUser = new User({
            user_id: id,
            access_Token: token
        })
        await newUser.save()
        console.log('New user saved in the database.')
    }
}

/**
 * 
 * @param {string} id value used to look up the user's token to query the spotify api
 * @returns token that is associated with the entered id
 */
const searchDB = async(id) =>{
    try {   
    const user = await User.findOne({user_id: id})
    return user ? user.access_Token : null
    }catch(error){
        console.error("Error searching in the database: ", error)
        throw error
    }
}


// we export the function of connecting to DB, searching in DB and saving in DB
module.exports = {connectDB, saveDB, searchDB}