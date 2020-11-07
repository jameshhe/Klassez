CREATE Database dummyData;
use dummyData;


create Table ClassReviews (classCode varchar(45), review varchar(200), rating int, studentID varChar(10));
create Table Classes (classID int, instructorID varchar(10), days varchar(100), timeStart Time, timeEnd Time, classCode varchar(45), className varchar(45), department varchar(45), seatsRemaining int);
create Table InstructorReviews (instructorID varchar(10), reviews varchar(200));
create Table Instructors (instructorID varchar(10), name varchar(100));
create Table Schedules (studentID varchar(10), hours int, semester varchar(45), classesList varchar(45));
create Table Students (studentID varchar(10), name varchar(45), gradYear varchar(4), major varchar(45),  openToNightClasses bool);
create Table Users (username varchar(45), password varchar(45), type int, email varchar(100), id varchar(10));


-- students have type = 1
insert into Users values('billybob', 'password', 1, 'billyb@school.edu', 0000000001);
insert into Users values('sarahsue', 'password', 1, 'sarahs@school.edu', 0000000002);
insert into Users values('janedoe', 'password', 1, 'janed@school.edu', 0000000003);
insert into Users values('johndoe', 'password', 1, 'johndb@school.edu', 0000000004);
insert into Users values('kellyking', 'password', 1, 'kellyk@school.edu', 0000000005);
insert into Users values('lolalee', 'password', 1, 'lolal@school.edu', 0000000006);
insert into Users values('caseycarl', 'password', 1, 'caseyc@school.edu', 0000000007);
insert into Users values('mollymoe', 'password', 1, 'mollym@school.edu', 0000000008);
insert into Users values('patrickpear', 'password', 1, 'patrickp@school.edu', 0000000009);
insert into Users values('donaldduck', 'password', 1, 'donaldd@school.edu', 0000000010);

insert into Students values(0000000001, 'Billy Bob', 2022, 'Computer Science', true);
insert into Students values(0000000002, 'Sarah Sue', 2021, 'Arts', false);
insert into Students values(0000000003, 'Jane Doe', 2023, 'Math', true);
insert into Students values(0000000004, 'John Doe', 2023, 'Math', false);
insert into Students values(0000000005, 'Kelly King', 2022, 'Computer Science', true);
insert into Students values(0000000006, 'Lola Lee', 2024, 'Undeclared', false);
insert into Students values(0000000007, 'Casey Carl', 2023, 'Math', true);
insert into Students values(0000000008, 'Molly Moe', 2023, 'Math', false);
insert into Students values(0000000009, 'Patrick Pear', 2022, 'Computer Science', true);
insert into Students values(0000000010, 'Donald Duck', 2024, 'Arts', false);

-- instructors have type = 2, id begins with 2
insert into Users values('johnjack', 'password', 2, 'johnj@school.edu', 2000000001);
insert into Users values('bettyblue', 'password', 2, 'bettyb@school.edu', 2000000002);
insert into Users values('mariamoon', 'password', 2, 'mariam@school.edu', 2000000003);
insert into Users values('zachzebra', 'password', 2, 'zachz@school.edu', 2000000004);
insert into Users values('ryanred', 'password', 2, 'ryanr@school.edu', 2000000005);
insert into Users values('gloriagreen', 'password', 2, 'gloriag@school.edu', 2000000006);

insert into Instructors values(2000000001, 'John Jack');
insert into Instructors values(2000000002, 'Betty Blue');
insert into Instructors values(2000000003, 'Maria Moon');
insert into Instructors values(2000000004, 'Zach Zebra');
insert into Instructors values(2000000005, 'Ryan Red');
insert into Instructors values(2000000006, 'Gloria Green');

-- classes have id's that start with 4
insert into Classes values(4000000001, 2000000001, '10:00:00', '11:00:00', 'CS 3330', 'Computer Science', 30);
insert into Classes values(4000000001, 2000000002, '10:00:00', '11:00:00', 'CS 3330', 'Computer Science', 20);
insert into Classes values(4000000002, 2000000003, '12:00:00', '14:00:00', 'MATH 1022', 'Math', 10);
insert into Classes values(4000000002, 2000000004, '12:00:00', '14:00:00', 'MATH 1022', 'Math', 20);
insert into Classes values(4000000003, 2000000005, '10:00:00', '12:00:00', 'ART 4230', 'Arts', 40);
insert into Classes values(4000000003, 2000000006, '10:00:00', '12:00:00', 'ART 4230', 'Arts', 40);
insert into Classes values(4000000004, 2000000001, '09:00:00', '10:30:00', 'CS 1342', 'Math', 5);
insert into Classes values(4000000004, 2000000002, '09:00:00', '10:30:00', 'CS 1342', 'Math', 15);
