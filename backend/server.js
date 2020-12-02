// import
require('dotenv').config()
const express = require('express') // express framework
const bodyParser = require('body-parser') // http post req handler
const cors = require('cors') // frontend backend api calling
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const logger = require('@rama41222/node-logger/src/logger');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const secretOrKey = "secret"

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

// @route   GET api/login
// @desc    GET user by username, password
router.post('/login', function(req, res) {	//verify path matches
    con.getConnection((err, con) =>{
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            const email = req.body.email;
            const password = req.body.password;

            con.query('SELECT * FROM Users WHERE email = ?', email, function(err, result, fields) {
                con.release()
                if (err) throw err;
                //res.end(JSON.stringify(result));
                console.log(email, password, result[0].password)
                // Check password
                bcrypt.compare(password, result[0].password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        console.log("MATCH");
                        const payload = {
                            id: result[0].id,
                            username: result[0].username,
                            type: result[0].type,
                            email: result[0].email
                        };
// Sign token
                        jwt.sign(
                            payload,
                            secretOrKey,
                            {
                                expiresIn: 3600 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res
                            .status(400)
                            .json({ passwordincorrect: "Password incorrect" });
                    }
                });
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   POST api/register
// @desc    POST user by username, password
router.post('/register', function(req, res) {	//verify path matches
    con.getConnection((err, con) =>{
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var type = req.body.type;		//Users declare account type at register?
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    password = hash;

                    con.query('INSERT INTO Users (username,password,type,email) VALUES (?,?,?,?)', [username, password, type, email], (err, result, fields) => {
                        con.release()
                        if (err) throw err;
                        res.end(JSON.stringify(result));
                    });

                });
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classes
// @desc    GET all classes
router.get('/classes', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT c.*,i.name AS Insturctor FROM Classes c \
            INNER JOIN Instructors i \
            ON c.instructorID = i.instructorID", function (err, result, fields) {
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
            con.query("SELECT c.*,i.name AS Insturctor FROM Classes c \
            INNER JOIN Instructors i \
            ON c.instructorID = i.instructorID \
            WHERE timeStart = ?", startTime, function (err, result, fields) {
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
router.get('/schedules/:id', function(req, res) {
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

// @route   GET api/classesbytime/:startTime
// @desc    GET class info by start time
router.get('/classoptions', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var start = req.body.startTime;
            var classes = req.body.classes;
            var end = req.body.endTime ;

            con.query("SELECT c.*,i.name AS Insturctor FROM Classes c \
            INNER JOIN Instructors i \
            ON c.instructorID = i.instructorID \
            WHERE timeStart >= ? AND timeEnd <= ? \
            AND classID IN (?) ", [start, end, classes], function (err, result, fields) {
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

/* ---------------------------------------------------------------- */

// @route   POST api/reviewteacher
// @desc    add a instructor review
router.post('/addschedule', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var studentID   = req.body.studentID;
            var numHours    = req.body.numHours;
            var semester    = req.body.semester;
            var cList       = req.body.classesList;

            console.log("Adding schedule of student: ", studentID);

            con.query("INSERT INTO Schedules \
            (studentID, numHours, semester, classesList) \
            VALUES (?, ?, ?, ?)", [studentID, numHours, semester, cList],
            function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

/* PUT */

// @route   POST api/updateclasstime
// @desc    updates the start and end timne of a class by classID
router.put('/updateclasstime', async (req, res) => {
    var classID     = req.body.classID;
    var startTime   = req.body.timeStart;
    var endTime     = req.body.timeEnd;

    if (startTime == null || endTime == null) return res.status(400).send('missing data');
    else if (startTime == endTime) return res.status(400).send('start time and end time are equal');

    console.log("updating class", classID,"time");

    con.query("UPDATE Classes \
    SET timeStart = ?, timeEnd = ? \
    WHERE classID = ?", [startTime, endTime, classID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

/* ---------------------------------------------------------------- */

// @route   POST api/updateclassteacher
// @desc    updates the instructor ID in a class
router.put('/updateclassteacher', async (req, res) => {
    var classID         = req.body.classID;
    var instructorID    = req.body.instructorID;

    if (instructorID == null) return res.status(400).send('missing instructor id');

    console.log("updating instructor id in class:", classID,"to",instructorID);

    con.query("UPDATE Classes \
    SET instructorID = ? \
    WHERE classID = ?", [instructorID, classID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

/* ---------------------------------------------------------------- */

// @route   POST api/updateseats
// @desc    updates the number of seats in a class by ID
router.put('/updateseats', async (req, res) => {
    var classID         = req.body.classID;
    var seats           = req.body.seatsRemaining;

    if (seats == null) return res.status(400).send('missing number of seats');

    console.log("updating number of seats in class:", classID,"to",seats,"seats");

    con.query("UPDATE Classes \
    SET seatsRemaining = ? \
    WHERE classID = ?", [seats, classID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

// connect
app.listen(port, () => console.log(`backend running on http://localhost:${port}`)) // port