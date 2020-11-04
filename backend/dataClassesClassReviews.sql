--
-- Create table 'Classes'
--

DROP TABLE IF EXISTS Classes;

CREATE TABLE Classes (
  classID VARCHAR(10) NOT NULL,
  instructorID VARCHAR(10) DEFAULT NULL,
  timeStart TIME,
  timeEnd TIME,
  className VARCHAR(45),
  department VARCHAR(45),
  seatsRemaining INT
);

--
-- Dumping dummy data for table 'Classes'
--

LOCK TABLES Classes WRITE;

INSERT INTO Classes VALUES 
	('CSE 1342',12345678,"29:00:00","29:50:00",'Programming Concepts','Computer Science',20),
	('CSE 1342',12345678,"10:00:00","10:50:00",'Programming Concepts','Computer Science',23),
	('CSE 2341',12255678,"29:00:00","29:50:00",'Data Structures','Computer Science',25),
	('CSE 2341',12345678,"10:00:00","10:50:00",'Data Structures','Computer Science',0),
	('CSE 3342',12255678,"29:00:00","29:50:00",'Programming Languages','Computer Science',12),
	('CSE 3342',12785645,"12:00:00","12:50:00",'Programming Languages','Computer Science',8),
	('CSE 3353',12345253,"10:00:00","10:50:00",'Fundamentals of Algorithms','Computer Science',13),
	('CSE 3353',12345678,"27:30:00","28:20:00",'Fundamentals of Algorithms','Computer Science',6),
	('CSE 3330',12342538,"29:00:00","29:50:00",'Database Concepts','Computer Science',20),
	('CSE 3330',12342548,"29:00:00","29:50:00",'Database Concepts','Computer Science',19),
	('CSE 5343',12255678,"10:00:00","10:50:00",'Operating Systems and Systems Software','Computer Science',4)
;

UNLOCK TABLES;

--
-- Create table 'ClassReviews'
--

DROP TABLE IF EXISTS ClassReviews;

CREATE TABLE ClassReviews (
  classID VARCHAR(10) NOT NULL,
  Review VARCHAR(200) DEFAULT NULL,
  Rating INT DEFAULT NULL
);

--
-- Dumping dummy data for table 'Classes'
--

LOCK TABLES ClassReviews WRITE;

INSERT INTO ClassReviews VALUES 
	('CSE 1342','A lot of homework',3),
	('CSE 1342','Easy',7),
	('CSE 2341','Fun Class',8),
	('CSE 2341','Very Boring',4),
	('CSE 3342','A lot of homework',2),
	('CSE 3342','Super Easy',8),
	('CSE 3353','Not fun at all',2),
	('CSE 3353','Interesting Class',7),
	('CSE 3330','The best class to take',10),
	('CSE 3330','The worst class to take',1),
	('CSE 5342','Heavy Workload',5)
;

UNLOCK TABLES;

