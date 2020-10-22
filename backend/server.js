// import
const express = require('express') // express framework
const bodyParser = require('body-parser') // http post req handler
const cors = require('cors') // frontend backend api calling

// instantiate app
const app = express()

// configurations
const port = 8080 // port

// enable
app.use(bodyParser.urlencoded({ extended: true })) // url-encoded body parsing
app.use(bodyParser.json()) // json parsing
app.use(express.json()) // enable json parsing???
app.use(cors()) // cross origin resource sharing

// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port