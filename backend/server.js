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

/* GET */

// @route   GET api/classes
// @desc    GET all classes
router.get('/classes', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT * FROM classes_view", function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:id
// @desc    GET class info by classID
router.get('/classes/:id', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.params.id;
            con.query("SELECT c.*,i.name AS Insturctor FROM Classes c \
             INNER JOIN Instructors i \
             ON c.instructorID = i.instructorID \
             WHERE classID = ? ", classID, function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });

        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classesbytime/:startTime
// @desc    GET class info by start time
router.get('/classesbytime/:startTime', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var startTime = req.params.startTime;
            con.query("SELECT * FROM classes_view WHERE `Start time` = ?", startTime, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });

        }
    })
});

/* ---------------------------------------------------------------- */

router.get('/students', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:id
// @desc    GET class info by classID
router.get('/students/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/schedules
// @desc    GET all schedules
router.get('/schedules', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/schedules/:id
// @desc    GET student schedule by student ID
router.get('/Schedules/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/teacherReview/:id
// @desc    GET teacher review by teacher ID
router.get('/teacherReview/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/classReview/:id
// @desc    GET class review by class ID
router.get('/classReview/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/prereqs/:id
// @desc    GET pre-reqs for a class by ID
router.get('/prereqs/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

// @route   GET api/prereqs/:id
// @desc    GET pre-reqs for a class by ID
router.get('/prereqs/:id', function(req, res) {
    con.getConnection((err, con) => {
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

/* ---------------------------------------------------------------- */

/* POST */

// @route   POST api/addclass
// @desc    add a class
router.post('/addclass', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorID    = req.body.instructorID;
            var days            = req.body.days;
            var timeStart       = req.body.timeStart;
            var timeEnd         = req.body.timeStart;
            var classCode       = req.body.classCode;
            var className       = req.body.className;
            var department      = req.body.department;
            var seatsRemaining  = req.body.seatsRemaining;

            console.log("Adding class: ", className);

            con.query("INSERT INTO Classes \
            (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) \
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining],
            function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   POST api/reviewclass
// @desc    add a class review
router.post('/reviewclass', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID         = req.body.classID;
            var classCode       = req.body.classCode;
            var review          = req.body.review;
            var rating          = req.body.rating;
            var studentID       = req.body.studentID;

            console.log("Adding class review: ", classCode);

            con.query("INSERT INTO ClassReviews \
            (classID, classCode, Review, Rating, studentID) \
            VALUES (?, ?, ?, ?, ?)", [classID, classCode, review, rating, studentID],
            function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   POST api/reviewteacher
// @desc    add a instructor review
router.post('/reviewteacher', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorID    = req.body.instructorID;
            var review          = req.body.review;

            console.log("Adding review of instructor: ", instructorID);

            con.query("INSERT INTO InstructorReviews \
            (instructorID, reviews) \
            VALUES (?, ?)", [instructorID, review],
            function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});


// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port