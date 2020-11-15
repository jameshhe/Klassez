// import
require('dotenv').config()
const express = require('express') // express framework
const bodyParser = require('body-parser') // http post req handler
const cors = require('cors') // frontend backend api calling
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// mysql connection
var connection = mysql.createConnection({
    host: process.env.MYSQL_CLOUD_HOST,
    user: process.env.MYSQL_CLOUD_USER,
    password: process.env.MYSQL_CLOUD_PASS,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
  });

// instantiate app
const app = express()

// configurations
const port = 8080 // port

// enable
app.use(bodyParser.urlencoded({ extended: true })) // url-encoded body parsing
app.use(bodyParser.json()) // json parsing
app.use(express.json()) // enable json parsing???
app.use(cors()) // cross origin resource sharing

// create router
var router = express.Router();

// REGISTER  ROUTES
app.use('/api', router);

// @route   GET api/classes
// @desc    GET all classes
router.get('/classes', function (req, res) {
	con.query("SELECT * FROM classes", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// @route   GET api/classes/:id
// @desc    GET class info by classID
router.get('/classes/:id', function (req, res) {
    var classID 		= req.param.id
	con.query("SELECT * FROM classes WHERE classID = ?",classID ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port