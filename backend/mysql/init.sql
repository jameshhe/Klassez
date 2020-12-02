use dummyData;



DROP table Classes ;
<<<<<<< HEAD
drop table ClassReviews ;
drop table InstructorReviews ;
drop table Instructors ;
drop table Users;
drop table Students ;
drop table Schedules ;
drop table Prerequesites ;
=======
DROP table ClassReviews ;
DROP table InstructorReviews ;
DROP table Instructors ;
DROP table Users;
DROP table Students ;
DROP table Schedules ;
>>>>>>> ecacb9efc8595b1904e56dc9dda1553177a3d9fa



CREATE TABLE ClassReviews (
<<<<<<< HEAD
  classID INT NOT NULL AUTO_INCREMENT,
  classCode VARCHAR(10) NOT NULL,
  Review VARCHAR(200) DEFAULT NULL,
  Rating INT DEFAULT NULL,
  StudentID INT NOT NULL,
=======
  classID int NOT NULL AUTO_INCREMENT,
  classCode varchar(10) NOT NULL,
  Review varchar(200) DEFAULT NULL,
  Rating int DEFAULT NULL,
  StudentID int NOT NULL,
>>>>>>> ecacb9efc8595b1904e56dc9dda1553177a3d9fa
  PRIMARY KEY (classID)
);
 
 
<<<<<<< HEAD
create Table Classes (classID int, instructorID int, days varchar(100), timeStart Time, timeEnd Time, classCode varchar(45), className varchar(45), department varchar(45), seatsRemaining int, PRIMARY KEY (classID));
create Table InstructorReviews (instructorID int, reviews varchar(200));
create Table Instructors (instructorID INT NOT NULL AUTO_INCREMENT, name varchar(100), PRIMARY KEY (instructorID));
create Table Schedules (studentID int, hours int, semester varchar(45), classesList varchar(45), PRIMARY KEY (studentID));
create Table Students (studentID int, name varchar(45), gradYear varchar(4), major varchar(45),  openToNightClasses bool, PRIMARY KEY (studentID));
create Table Users (username varchar(45), password varchar(45), type int, email varchar(100), id int, PRIMARY KEY (id));
create Table Prerequesites (classID int, parentClassCode varchar(45), childClassCode varchar(45), PRIMARY KEY (classID));

=======
CREATE TABLE Classes (
  classID int NOT NULL AUTO_INCREMENT,
  instructorID int NOT NULL,
  days varchar(100) NOT NULL,
  timeStart time NOT NULL,
  timeEnd time NOT NULL,
  classCode varchar(45) NOT NULL,
  className varchar(45) NOT NULL,
  department varchar(45) NOT NULL,
  seatsRemaining int NOT NULL,
  PRIMARY KEY (classID)
);

CREATE TABLE InstructorReviews (
  instructorID int NOT NULL,
  reviews varchar(200) NOT NULL
);

CREATE TABLE Instructors (
  instructorID int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (instructorID)
);

CREATE TABLE Schedules (
  studentID int NOT NULL,
  numHours int DEFAULT NULL,
  semester varchar(45) DEFAULT NULL,
  classesList varchar(45) DEFAULT NULL,
  PRIMARY KEY (studentID)
);

CREATE TABLE Students (
  studentID int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  gradYear varchar(4) DEFAULT NULL,
  major varchar(45) NOT NULL,
  openToNightClasses tinyint(1) DEFAULT NULL,
  PRIMARY KEY (studentID)
);

CREATE TABLE Users (
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  type int NOT NULL,
  email varchar(100) NOT NULL,
  id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Prerequesites (
  classID int NOT NULL,
  parentClassCode varchar(45) DEFAULT NULL,
  childClassCode varchar(45) DEFAULT NULL,
  PRIMARY KEY (classID)
);
>>>>>>> ecacb9efc8595b1904e56dc9dda1553177a3d9fa

-- students have type = 1
insert into Users values('billybob', 'password', 1, 'billyb@school.edu', 1);
insert into Users values('sarahsue', 'password', 1, 'sarahs@school.edu', 2);
insert into Users values('janedoe', 'password', 1, 'janed@school.edu', 3);
insert into Users values('johndoe', 'password', 1, 'johndb@school.edu', 4);
insert into Users values('kellyking', 'password', 1, 'kellyk@school.edu', 5);
insert into Users values('lolalee', 'password', 1, 'lolal@school.edu', 6);
insert into Users values('caseycarl', 'password', 1, 'caseyc@school.edu', 7);
insert into Users values('mollymoe', 'password', 1, 'mollym@school.edu', 8);
insert into Users values('patrickpear', 'password', 1, 'patrickp@school.edu', 9);
insert into Users values('donaldduck', 'password', 1, 'donaldd@school.edu', 10);

<<<<<<< HEAD
insert into Students values(1, 'Billy Bob', 2022, 'Computer Science', true);
insert into Students values(2, 'Sarah Sue', 2021, 'Arts', false);
insert into Students values(3, 'Jane Doe', 2023, 'Math', true);
insert into Students values(4, 'John Doe', 2023, 'Math', false);
insert into Students values(5, 'Kelly King', 2022, 'Computer Science', true);
insert into Students values(6, 'Lola Lee', 2024, 'Undeclared', false);
insert into Students values(7, 'Casey Carl', 2023, 'Math', true);
insert into Students values(8, 'Molly Moe', 2023, 'Math', false);
insert into Students values(9, 'Patrick Pear', 2022, 'Computer Science', true);
insert into Students values(10, 'Donald Duck', 2024, 'Arts', false);
=======
insert into Students (name, gradYear, major, openToNightClasses) values('Billy Bob', 2022, 'Computer Science', true);
insert into Students (name, gradYear, major, openToNightClasses) values('Sarah Sue', 2021, 'Arts', false);
insert into Students (name, gradYear, major, openToNightClasses) values('Jane Doe', 2023, 'Math', true);
insert into Students (name, gradYear, major, openToNightClasses) values('John Doe', 2023, 'Math', false);
insert into Students (name, gradYear, major, openToNightClasses) values('Kelly King', 2022, 'Computer Science', true);
insert into Students (name, gradYear, major, openToNightClasses) values('Lola Lee', 2024, 'Undeclared', false);
insert into Students (name, gradYear, major, openToNightClasses) values('Casey Carl', 2023, 'Math', true);
insert into Students (name, gradYear, major, openToNightClasses) values('Molly Moe', 2023, 'Math', false);
insert into Students (name, gradYear, major, openToNightClasses) values('Patrick Pear', 2022, 'Computer Science', true);
insert into Students (name, gradYear, major, openToNightClasses) values( 'Donald Duck', 2024, 'Arts', false);
>>>>>>> ecacb9efc8595b1904e56dc9dda1553177a3d9fa

-- instructors have type = 2, id begins with 2
insert into Users values('johnjack', 'password', 2, 'johnj@school.edu', 21);
insert into Users values('bettyblue', 'password', 2, 'bettyb@school.edu', 22);
insert into Users values('mariamoon', 'password', 2, 'mariam@school.edu', 23);
insert into Users values('zachzebra', 'password', 2, 'zachz@school.edu', 24);
insert into Users values('ryanred', 'password', 2, 'ryanr@school.edu', 25);
insert into Users values('gloriagreen', 'password', 2, 'gloriag@school.edu', 26);

<<<<<<< HEAD
insert into Instructors values(21, 'John Jack');
insert into Instructors values(22, 'Betty Blue');
insert into Instructors values(23, 'Maria Moon');
insert into Instructors values(24, 'Zach Zebra');
insert into Instructors values(25, 'Ryan Red');
insert into Instructors values(26, 'Gloria Green');

-- classes have id's that start with 4
insert into Classes values(101, 21, 'MWF', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 30);
insert into Classes values(102, 22, 'MWF', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 20);
insert into Classes values(103, 23, 'TuTh', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 10);
insert into Classes values(104, 24, 'TuTh', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 20);
insert into Classes values(105, 25, 'MWF', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes values(106, 26, 'TuTh', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes values(107, 21, 'MW', '09:00:00', '10:30:00', 'CS 1342', 'Intro to coding','Computer Science', 5);
insert into Classes values(108, 22, 'MW','09:00:00', '10:30:00', 'CS 1342', 'Intro to coding', 'Computer Science', 15);


INSERT INTO ClassReviews VALUES 
	(1, 'CSE 1342','A lot of homework',3, 1),
	(2, 'CSE 1342','Easy',7, 2),
	(3, 'CSE 2341','Fun Class',8, 3),
	(4, 'CSE 2341','Very Boring',4, 4),
	(5, 'CSE 3342','A lot of homework',2, 5),
	(6, 'CSE 3342','Super Easy',8, 6),
	(7, 'CSE 3353','Not fun at all',2, 7),
	(8, 'CSE 3353','Interesting Class',7, 8),
	(9, 'CSE 3330','The best class to take',10, 9),
	(10, 'CSE 3330','The worst class to take',1, 10),
	(11, 'CSE 5342','Heavy Workload',5, 10)
;

INSERT INTO Prerequesites values(101, 'CS 3330', 'CS 1342');

=======
insert into Instructors (name) values('John Jack');
insert into Instructors (name) values('Betty Blue');
insert into Instructors (name) values('Maria Moon');
insert into Instructors (name) values('Zach Zebra');
insert into Instructors (name) values('Ryan Red');
insert into Instructors (name) values('Gloria Green');

-- classes have id's that start with 4
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(1, 'MWF', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 30);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(2, 'TuTh', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 20);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(3, 'MWF', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 10);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(4, 'TuTh', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 20);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(5, 'MWF', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(6, 'TuTh', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(1, 'MW', '12:00:00', '13:20:00', 'CS 1342', 'Intro to coding','Computer Science', 5);
insert into Classes (instructorID, days, timeStart, timeEnd, classCode, className, department, seatsRemaining) values(2, 'TuTh','08:30:00', '10:00:00', 'CS 1342', 'Intro to coding', 'Computer Science', 15);

INSERT INTO ClassReviews VALUES 
	(1, 'CS 1342', 'A lot of homework', 3, 1),
	(2, 'CS 1342', 'Easy', 4, 5),
	(3, 'MATH 1022', 'Fun Class', 5, 3),
	(4, 'MATH 1022', 'Very Boring', 1, 4),
	(5, 'ART 4230', 'A lot of homework', 2, 2),
	(6, 'ART 4230', 'Super Easy', 5, 10),
	(1, 'CS 3330', 'The best class to take', 5, 9),
	(2, 'CS 3330', 'The worst class to take', 1, 6)
;

INSERT INTO Prerequesites values(1, 'CS 3330', 'CS 1342');
>>>>>>> ecacb9efc8595b1904e56dc9dda1553177a3d9fa
