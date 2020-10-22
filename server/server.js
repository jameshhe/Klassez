// import
const express    = require('express')      // express framework
const bodyParser = require('body-parser')  // http post req handler
const cors       = require('cors')         // frontend backend api calling
const routes     = require('./app/routes') // routes

// instantiate app
const app = express()

// configurations
const port = 8080         // port
const name = 'Klassez' // name 

// enable
app.use(bodyParser.urlencoded({extended: true})) // url-encoded body parsing
app.use(bodyParser.json())             // json parsing
app.use(express.json())                // enable json parsing???
app.use(cors())                        // cross origin resource sharing

// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port
routes(app)                            // routes