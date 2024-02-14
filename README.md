# SoundView

This application allows you to access the user's Spotify account and show the information of the Top Songs and Top Artists.

# Usage
1. Click in Login to Spotify
2. Fill out your spotify credentials
3. Accept searches on spotify
4. All information about top artists appears
5. Click in Top Songs (Appear every information about Top Songs)

# Development

This project was created with [Nodejs](https://github.com/nodejs) ,templates [EJS](https://ejs.co/) and database [MongoDB](https://www.mongodb.com/es).

1. Clone repository  https://github.com/AlexisEstela-12/SoundView.git
2. Create a database in Mongo DB
3. Create a .env file inside directory with this information (
	**PORT_SERVER **=> information about the port where will be your server
	**CLIENT_ID**=> value from your [spotify for developer](https://developer.spotify.com/ ) account
	**REDIRECT_URL**=> URL where you will be redirected after authenticating with spotify 
	**MONGO_DB**= URL for connection to mongodb database
	**SECRET**= password for MONGODB) 
4. Install every requirements from package.json with command in terminal ** npm install **
5. Finally, use command ** nodemon app.js **

