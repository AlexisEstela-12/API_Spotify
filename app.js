//module imports
const express = require('express')
const session = require('express-session');
const Routes = require('./routes/appRoutes')
var cors = require('cors');
var cookieParser = require('cookie-parser');
const {connectDB, saveDB, searchDB} = require("./Config_DB/database")
require("dotenv").config()

// express variable
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true
}));


// use EJS templates
app.set('view engine', 'ejs')

// routes
app.use(Routes)

//static files
app.use(express.static(__dirname + '/public'))
    .use(cors())

// MongoDB database connection
connectDB()

// start server 
app.listen(process.env.PORT_SERVER,()=>{
    console.log(`app listening on port ${process.env.PORT_SERVER}`)
})