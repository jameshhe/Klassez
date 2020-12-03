
use dummyData;



DROP table Classes ;
drop table ClassReviews ;
drop table InstructorReviews ;
drop table Instructors ;
drop table Users;
drop table Students ;
drop table Schedules ;



CREATE TABLE ClassReviews (
  classID int NOT NULL AUTO_INCREMENT,
  classCode varchar(10) NOT NULL,
  Review varchar(200) DEFAULT NULL,
  Rating int DEFAULT NULL,
  StudentID int NOT NULL,
  PRIMARY KEY (classID)
);
 
 
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

insert into Students values('Billy Bob', 2022, 'Computer Science', true);
insert into Students values('Sarah Sue', 2021, 'Arts', false);
insert into Students values('Jane Doe', 2023, 'Math', true);
insert into Students values('John Doe', 2023, 'Math', false);
insert into Students values('Kelly King', 2022, 'Computer Science', true);
insert into Students values('Lola Lee', 2024, 'Undeclared', false);
insert into Students values('Casey Carl', 2023, 'Math', true);
insert into Students values('Molly Moe', 2023, 'Math', false);
insert into Students values('Patrick Pear', 2022, 'Computer Science', true);
insert into Students values( 'Donald Duck', 2024, 'Arts', false);

-- instructors have type = 2, id begins with 2
insert into Users values('johnjack', 'password', 2, 'johnj@school.edu', 21);
insert into Users values('bettyblue', 'password', 2, 'bettyb@school.edu', 22);
insert into Users values('mariamoon', 'password', 2, 'mariam@school.edu', 23);
insert into Users values('zachzebra', 'password', 2, 'zachz@school.edu', 24);
insert into Users values('ryanred', 'password', 2, 'ryanr@school.edu', 25);
insert into Users values('gloriagreen', 'password', 2, 'gloriag@school.edu', 26);

insert into Instructors values('John Jack');
insert into Instructors values('Betty Blue');
insert into Instructors values('Maria Moon');
insert into Instructors values('Zach Zebra');
insert into Instructors values('Ryan Red');
insert into Instructors values('Gloria Green');

-- classes have id's that start with 4
insert into Classes values(21, 'MWF', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 30);
insert into Classes values(22, 'MWF', '10:00:00', '11:00:00', 'CS 3330', 'Databases', 'Computer Science', 20);
insert into Classes values(23, 'TuTh', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 10);
insert into Classes values(24, 'TuTh', '12:00:00', '14:00:00', 'MATH 1022', 'Algebra', 'Math', 20);
insert into Classes values(25, 'MWF', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes values(26, 'TuTh', '10:00:00', '12:00:00', 'ART 4230', 'Painting 4', 'Arts', 40);
insert into Classes values(21, 'MW', '09:00:00', '10:30:00', 'CS 1342', 'Intro to coding','Computer Science', 5);
insert into Classes values(22, 'MW','09:00:00', '10:30:00', 'CS 1342', 'Intro to coding', 'Computer Science', 15);


INSERT INTO ClassReviews VALUES 
	('CSE 1342','A lot of homework',3,'1234567890'),
	('CSE 1342','Easy',7,'123412390'),
	('CSE 2341','Fun Class',8,'1231437890'),
	('CSE 2341','Very Boring',4,'1236357890'),
	('CSE 3342','A lot of homework',2,'1238825390'),
	('CSE 3342','Super Easy',8,'1236357890'),
	('CSE 3353','Not fun at all',2,'1238825390'),
	('CSE 3353','Interesting Class',7,'1231437890'),
	('CSE 3330','The best class to take',10,'1234567890'),
	('CSE 3330','The worst class to take',1,'123412390'),
	('CSE 5342','Heavy Workload',5,'1236357890')
;

INSERT INTO Prerequesites values(1, 'CS 3330', 'CS 1342');
