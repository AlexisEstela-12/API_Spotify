require("dotenv").config()
var crypto = require('crypto')
var querystring = require('querystring');
const axios = require('axios')

// generate random string 
var generateRandomString = (length) =>{
    return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0,length)
}

// save state authentication
var statekey = 'spotify_auth_state'


/**
 * 
 * @param {string} code value obtained from each user authentication
 * @returns {string} returns the value of the user's token
 */
async function auth_token(code){
    
    const auth_token_response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
                    code: code,
                    redirect_uri: process.env.REDIRECT_URL,
                    grant_type: 'authorization_code'
                }), {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
                    }
                });
            return auth_token_response
            }

// We export the state key variable, the string and token generation function
module.exports = {statekey, generateRandomString, auth_token}
