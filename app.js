//module imports
const express = require('express')
const Routes = require('./routes/appRoutes')
var cors = require('cors');
var cookieParser = require('cookie-parser');
const {connectDB, saveDB} = require("./Config_DB/database")
require("dotenv").config()

// express variable
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())

// use EJS templates
app.set('view engine', 'ejs')

// routes
app.use(Routes)

//static files
app.use(express.static(__dirname + '/public'))
    .use(cors())

// MongoDB database connection
connectDB()


app.listen(process.env.PORT_SERVER,()=>{
    console.log(`Example app listening on port ${process.env.PORT_SERVER}`)
})