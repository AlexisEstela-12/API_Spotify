var {statekey, generateRandomString,auth_token} = require('../Authentication/Token')
var {user_info,top_tracks,top_artist} = require('../search/api_search')
var querystring = require('querystring')
const {connectDB, saveDB, searchDB} =require("../Config_DB/database")
require("dotenv").config()

// login view, use the login.ejs template
module.exports.login= (req,res) =>{
    res.render("login",{})
    }

//* spotify platform authentication view
// uses spotify developer account values: client id, scope, redirect_uri
//*
module.exports.spotify = (req,res) => {
    var state = generateRandomString(16);
    res.cookie(statekey,state)
    var scope = 'user-read-private user-read-email,user-top-read ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-library-modify user-library-read'
    res.redirect('https://accounts.spotify.com/authorize?'+ querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URL,
        state: state
}))

}

// authProcess view, use the logged.ejs template
module.exports.authProcess = async (req,res) =>{
    try {
        var code = req.query.code || null;
        var state = req.query.state || null;
        var savedState = req.cookies ? req.cookies[statekey] : null;

            // verified state for security
        if (state === null || state !== savedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mistmatch'
                }));
        } else {
            // clean cookies
            res.clearCookie(statekey);

            // use auth_token function 
            const auth_token_response = await auth_token(code)
            const access_token = auth_token_response.data.access_token;


            // get basic info
            const user_info_response = await user_info(access_token)
            var personal_info = user_info_response.data;
            // filter id from personal_info
            var id = personal_info.id

            // save in database mongodb
            await saveDB(id,access_token)
            
            // save personal info in userData for saving in session
            var userData = {
                name: personal_info.display_name,
                email: personal_info.email,
                account: personal_info.href,
                country: personal_info.country,
                followers:personal_info.followers.total,
                image: personal_info.image
            }

            // save in session user information and then redirect to logged
            req.session.userData = userData
            res.redirect(`/logged/${id}`) 
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).render('error', {
            error: 'Internal Server Error'
        });
    }
    
}


// logged view, use the logged.ejs template
module.exports.logged = async (req, res) => {

    try{
    // extract userData from session, id from params and send request to top_artist api 
    const userData = req.session.userData
    const id = req.params.id
    const artists_response = await top_artist(id)
    var artists = artists_response.data.items
    res.render ("logged",{
        userData,
        artists
    })
} catch(error){
    console.log(error)
}};

// this function is used to search top_tracks with api and resend information to frontend
module.exports.songs = async(req,res) =>{ 
    try{
        var id = req.params.id || null;
        if (id){
            const songs_response = await top_tracks(id)
            var songs = songs_response.data.items 
            res.json(songs)

        }
    } catch{
        console.log("error")
    }
}