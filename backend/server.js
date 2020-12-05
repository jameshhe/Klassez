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
    host: `sampledockercompose.cjckyqum6coy.us-east-1.rds.amazonaws.com`,
    user: 'admin',
    password: `8bNk9XbVZ5o2HrhpJMNF`,
    port: 3306,
    database: 'dummyData'
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
router.post('/login', function(req, res) { //verify path matches
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            const email = req.body.email;
            const password = req.body.password;

            con.query('SELECT * FROM Users WHERE email = ?', email, function(err, result, fields) {
                if(result.length == 0){
                    return res.status(401).json({ noUser: "User doesn't exist" });
                }
                con.release()
                if (err) throw err;
                //res.end(JSON.stringify(result));
                    // Check password
                bcrypt.compare(password, result[0].password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: result[0].id,
                            username: result[0].username,
                            type: result[0].type,
                            email: result[0].email
                        };
                        // Sign token
                        jwt.sign(
                            payload,
                            secretOrKey, {
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
                        return res.status(400).json({ passwordincorrect: "Password incorrect" });
                    }
                });
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   POST api/register
// @desc    POST user by username, password
router.post('/register', function(req, res) { //verify path matches
    con.getConnection((err, con) => {
        console.log(req.body)
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var type = req.body.type; 
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
			
			// Update Students or Instructors
			if(type == 1){
				con.query('INSERT INTO Students (name) VALUES (?)', [username], (err, result, fields) => {
					con.release()
					if (err) throw err;
					res.end(JSON.stringify(result));
				});
			}
			else if(type == 2){
				con.query('INSERT INTO Instructors (name) VALUES (?)', [username], (err, result, fields) => {
					con.release()
					if (err) throw err;
					res.end(JSON.stringify(result));
				});
			}
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
            con.query("SELECT c.*,i.name,i.instructorID AS Insturctor FROM Classes c \
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

// @route   GET api/classes/:c=instructorName
// @desc    GET class info by instructorName
// router.get('/classes/:instructorName', function(req, res) {
//     con.getConnection((err, con) => {
//         if (err) {
//             res.status(400).send('Problem obtaining MySQL connection')
//         } else {
//             var instructorName = req.params.instructorName;
//             con.query("SELECT * FROM Classes INNER JOIN Instructors ON Classes.instructorID = Instructors.instructorID WHERE name = ?", instructorName, function(err, result, fields) {
//                 con.release()
//                 if (err) throw err;
//                 res.end(JSON.stringify(result)); // Result in JSON format
//             });
//         }
//     })
// });

/* ---------------------------------------------------------------- */
// @route   GET api/instructor/:id
// @desc    GET instructor info by id
router.get('/instructor/:id', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorID = req.params.id;
            con.query("SELECT * FROM Instructors WHERE instructorID = ?", instructorID, function(err, result, fields) {
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

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:classCode
// @desc    GET class info by classCode
router.get('/classes/:classCode', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classCode = req.params.classCode;
            con.query("SELECT * FROM Classes WHERE classCode = ?", classCode, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:classCode
// @desc    GET class info by classCode
router.get('/classes/:classCode', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classCode = req.params.classCode;
            con.query("SELECT * FROM Classes WHERE classCode LIKE '%[?]%'", classCode, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:c=instructorName
// @desc    GET class info by instructorName
router.get('/classes/:instructorName', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorName = req.params.instructorName;
            con.query("SELECT * FROM Classes INNER JOIN Instructors ON Classes.instructorID = Instructors.instructorID WHERE instructorName = ?", instructorName, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/classes/:className, instructorName
// @desc    GET class info by className with a className AND specific instructor
router.get('/classes/:className,instructorName', function(req, res) {
    mysql.createPool.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorName = req.params.instructorName;
            var className = req.params.className
            con.query("SELECT * FROM Classes INNER JOIN Instructors ON instructorID WHERE className = ? && instructorName = ?", instructorName, className, function(err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/students
// @desc    GET all students' info
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

// @route   GET api/teacherReview/:instructorName
// @desc    GET teacher review by teacher name
router.get('/teacherReview/:instructorName', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorName = req.params.instructorName;
            con.query("SELECT * FROM InstructorReviews WHERE instructorName = ?", instructorName, function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
})

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

// @route   GET api/classReview/:classCode
// @desc    GET class review by class Code
router.get('/classReview/:classCode', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classCode = req.params.classCode;
            con.query("SELECT * FROM ClassReviews WHERE classCode = ?", classCode, function(err, result, fields) {
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

// @route   GET api/instructors
// @desc    GET all instructors
router.get('/instructors', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            con.query("SELECT * FROM Instructors", function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

// @route   GET api/instructor/:id
// @desc    GET instructor info by id
router.get('/instructor/:id', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var instructorID = req.params.id;
            con.query("SELECT * FROM Students WHERE instructorID = ?", instructorID, function(err, result, fields) {
                con.release();
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });
        }
    })
});

/* ---------------------------------------------------------------- */

/* POST */

// @route   POST api/classesbytime/:startTime
// @desc    return list of classes in the preferred time
router.post('/classoptions', function(req, res) {
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

// @route   GET api/classoptionsTop
// @desc    GET first five classes, not all 
router.post('/classoptionsTop', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var start = req.body.startTime;
            var classes = req.body.classes;
            var end = req.body.endTime ;

            con.query("SELECT TOP 5 FROM (SELECT c.*,i.name AS Insturctor FROM Classes c \
                INNER JOIN Instructors i \
                ON c.instructorID = i.instructorID \
                WHERE timeStart >= ? AND timeEnd <= ? \
                AND classID IN (?)) sub ", [start, end, classes], function (err, result, fields) {
                con.release()
                if (err) throw err;
                res.end(JSON.stringify(result)); // Result in JSON format
            });

        }
    })
});

/* ---------------------------------------------------------------- */

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
            var timeEnd         = req.body.timeEnd;
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

// @route   POST api/addPrereqs/::classID,parentClassName, childClassName
// @desc    POST class info by className with a specific instructor
router.post('/addPrereqs', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.body.classID;
            var parentClassName = req.body.className;
            var childClassName = req.body.className

            console.log("Adding class: ", className);

            con.query("INSERT INTO Prerequesites \
            (classID, parentClassName, childClassName) \
            VALUES (?, ?, ?)", [classID, parentClassName, childClassName],
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

// @route   POST api/addPrereqs/::classID,parentClassName, childClassName
// @desc    POST class info by className with a specific instructor
router.post('/addPrereqs', function(req, res) {
    con.getConnection((err, con) => {
        if (err) {
            res.status(400).send('Problem obtaining MySQL connection')
        } else {
            var classID = req.body.classID;
            var parentClassName = req.body.className;
            var childClassName = req.body.className

            console.log("Adding class: ", className);

            con.query("INSERT INTO Prerequesites \
            (classID, parentClassName, childClassName) \
            VALUES (?, ?, ?)", [classID, parentClassName, childClassName],
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

router.put('/updateclass/:classId', async (req, res) => {
    if(!req.body.days || !req.body.timeStart || !req.body.timeEnd || !req.body.classCode||
        !req.body.className || !req.body.department || !req.body.seatsRemaining || !req.body.instructorID){
        return res.status(400).send("Missing one or more fields")
    }

    if (req.body.timeStart == req.body.timeEnd) return res.status(400).send('start time and end time are equal');

    con.query("UPDATE Classes \
    SET instructorID = ?, days = ?, timeStart = ?, timeEnd = ?, classCode = ?, className = ?, department = ?, seatsRemaining = ? \
    WHERE classID = ?", [req.body.instructorID, req.body.days, req.body.timeStart, req.body.timeEnd, req.body.classCode, req.body.className, req.body.department, req.body.seatsRemaining, req.params.classId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

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