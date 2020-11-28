
use dummyData;



DROP table Classes ;
drop table ClassReviews ;
drop table InstructorReviews ;
drop table Instructors ;
drop table Users;
drop table Students ;
drop table Schedules ;



CREATE TABLE ClassReviews (
  classID INT NOT NULL AUTO_INCREMENT,
  classCode VARCHAR(10) NOT NULL,
  Review VARCHAR(200) DEFAULT NULL,
  Rating INT DEFAULT NULL,
  StudentID VARCHAR(10) NOT NULL,
  PRIMARY KEY (classID)

  );
 
 
create Table Classes (classID int, instructorID int, days varchar(100), timeStart Time, timeEnd Time, classCode varchar(45), className varchar(45), department varchar(45), seatsRemaining int, PRIMARY KEY (classID));
create Table InstructorReviews (instructorID int, reviews varchar(200));
create Table Instructors (instructorID INT NOT NULL AUTO_INCREMENT, name varchar(100), PRIMARY KEY (instructorID));
create Table Schedules (studentID int, hours int, semester varchar(45), classesList varchar(45), PRIMARY KEY (studentID));
create Table Students (studentID int, name varchar(45), gradYear varchar(4), major varchar(45),  openToNightClasses bool, PRIMARY KEY (studentID));
create Table Users (username varchar(45), password varchar(45), type int, email varchar(100), id int, PRIMARY KEY (id));
create Table Prerequesites (classID int, parentClassCode varchar(45), childClassCode varchar(45), PRIMARY KEY (classID));


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

-- instructors have type = 2, id begins with 2
insert into Users values('johnjack', 'password', 2, 'johnj@school.edu', 21);
insert into Users values('bettyblue', 'password', 2, 'bettyb@school.edu', 22);
insert into Users values('mariamoon', 'password', 2, 'mariam@school.edu', 23);
insert into Users values('zachzebra', 'password', 2, 'zachz@school.edu', 24);
insert into Users values('ryanred', 'password', 2, 'ryanr@school.edu', 25);
insert into Users values('gloriagreen', 'password', 2, 'gloriag@school.edu', 26);

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
	(1,'CSE 1342','A lot of homework',3,'1234567890'),
	(2,'CSE 1342','Easy',7,'123412390'),
	(3,'CSE 2341','Fun Class',8,'1231437890'),
	(4,'CSE 2341','Very Boring',4,'1236357890'),
	(5,'CSE 3342','A lot of homework',2,'1238825390'),
	(6,'CSE 3342','Super Easy',8,'1236357890'),
	(7,'CSE 3353','Not fun at all',2,'1238825390'),
	(8,'CSE 3353','Interesting Class',7,'1231437890'),
	(9,'CSE 3330','The best class to take',10,'1234567890'),
	(10,'CSE 3330','The worst class to take',1,'123412390'),
	(11,'CSE 5342','Heavy Workload',5,'1236357890')
;

INSERT INTO Prerequesites values(101, 'CS 3330', 'CS 1342');



use dummyData;



DROP table Classes ;
drop table ClassReviews ;
drop table InstructorReviews ;
drop table Instructors ;
drop table Users;
drop table Students ;
drop table Schedules ;



CREATE TABLE ClassReviews (
  classID INT NOT NULL AUTO_INCREMENT,
  classCode VARCHAR(10) NOT NULL,
  Review VARCHAR(200) DEFAULT NULL,
  Rating INT DEFAULT NULL,
  StudentID VARCHAR(10) NOT NULL,
  PRIMARY KEY (classID)

  );
 
 
create Table Classes (classID int, instructorID int, days varchar(100), timeStart Time, timeEnd Time, classCode varchar(45), className varchar(45), department varchar(45), seatsRemaining int, PRIMARY KEY (classID));
create Table InstructorReviews (instructorID int, reviews varchar(200));
create Table Instructors (instructorID INT NOT NULL AUTO_INCREMENT, name varchar(100), PRIMARY KEY (instructorID));
create Table Schedules (studentID int, hours int, semester varchar(45), classesList varchar(45), PRIMARY KEY (studentID));
create Table Students (studentID int, name varchar(45), gradYear varchar(4), major varchar(45),  openToNightClasses bool, PRIMARY KEY (studentID));
create Table Users (username varchar(45), password varchar(45), type int, email varchar(100), id int, PRIMARY KEY (id));
create Table Prerequesites (classID int, parentClassCode varchar(45), childClassCode varchar(45), PRIMARY KEY (classID));


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

-- instructors have type = 2, id begins with 2
insert into Users values('johnjack', 'password', 2, 'johnj@school.edu', 21);
insert into Users values('bettyblue', 'password', 2, 'bettyb@school.edu', 22);
insert into Users values('mariamoon', 'password', 2, 'mariam@school.edu', 23);
insert into Users values('zachzebra', 'password', 2, 'zachz@school.edu', 24);
insert into Users values('ryanred', 'password', 2, 'ryanr@school.edu', 25);
insert into Users values('gloriagreen', 'password', 2, 'gloriag@school.edu', 26);

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
	(1,'CSE 1342','A lot of homework',3,'1234567890'),
	(2,'CSE 1342','Easy',7,'123412390'),
	(3,'CSE 2341','Fun Class',8,'1231437890'),
	(4,'CSE 2341','Very Boring',4,'1236357890'),
	(5,'CSE 3342','A lot of homework',2,'1238825390'),
	(6,'CSE 3342','Super Easy',8,'1236357890'),
	(7,'CSE 3353','Not fun at all',2,'1238825390'),
	(8,'CSE 3353','Interesting Class',7,'1231437890'),
	(9,'CSE 3330','The best class to take',10,'1234567890'),
	(10,'CSE 3330','The worst class to take',1,'123412390'),
	(11,'CSE 5342','Heavy Workload',5,'1236357890')
;

INSERT INTO Prerequesites values(101, 'CS 3330', 'CS 1342');


