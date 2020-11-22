// import
require('dotenv').config()
const express = require('express') // express framework
const bodyParser = require('body-parser') // http post req handler
const cors = require('cors') // frontend backend api calling
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const logger = require('@rama41222/node-logger/src/logger');
// mysql connection
var con = mysql.createPool({
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
// @route   POST api/register
// @desc    POST user by username, password
router.post('/register', function(req, res) {	//verify path matches
	mysql.createPool.getConnection((err, con) =>{
		if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
			var id = req.body.id;
			var type = req.body.type;		//Users declare account type at register?
			var email = req.body.email;
			var username = req.body.username;
			var password = req.body.password;

			con.query('INSERT INTO users (username,password,type,email,id) VALUES (?,?,?,?,?)', [username, password, type, email, id], (err, result, fields) => {
			con.release()
			if (err) throw err;
			res.end(JSON.stringify(result));
			});
		}
	})
});

// @route   GET api/classes
// @desc    GET all classes
router.get('/classes', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT * FROM Classes", function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classes/:id
// @desc    GET class info by classID
router.get('/classes/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM Classes WHERE classID = ?", classID, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classes/:professorID
// @desc    GET class info by professorID
router.get('/classes/:instructorID', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM Classes WHERE instructorID = ?", instructorID, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classes/:classCode
// @desc    GET class info by classCode
router.get('/classes/:classCode', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM Classes WHERE classCode = classCode'", classCode, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classes/:classCode
// @desc    GET class info by classCode
router.get('/classes/:classCode', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM Classes WHERE classCode LIKE '%[?]%'", classCode, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});








router.get('/students', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT * FROM Students", function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classes/:id
// @desc    GET class info by classID
router.get('/students/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var studentID = req.params.id;
            con.query("SELECT * FROM Students WHERE studentID = ?", studentID, function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/schedules
// @desc    GET all schedules
router.get('/schedules', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT * FROM Schedules", function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/schedules/:id
// @desc    GET student schedule by student ID
router.get('/Schedules/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var studentID = req.params.id;
            con.query("SELECT * FROM Schedules WHERE studentID = ?", studentID, function(err, result, fields) {
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/teacherReview/:id
// @desc    GET teacher review by teacher ID
router.get('/teacherReview/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorID = req.params.id;
            con.query("SELECT * FROM InstructorReviews WHERE instructorID = ?", instructorID, function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/classReview/:id
// @desc    GET class review by class ID
router.get('/classReview/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM ClassReviews WHERE classID = ?", classID, function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// @route   GET api/prereqs/:id
// @desc    GET pre-reqs for a class by ID
router.get('/prereqs/:id', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT * FROM Prerequesites WHERE classID = ?", classID, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});
// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port





//build more routes routes for classes for searching purposes
//routes for searching for professors
//stats page that shows how many students got their preferred times
