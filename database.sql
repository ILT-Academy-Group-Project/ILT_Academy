
--DATABASE NAME: ilt_academy



CREATE TABLE "cohorts" (
	"id" SERIAL PRIMARY KEY,
	"cohortName" VARCHAR(255) NOT NULL,
	"accessCode" VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"firstName" VARCHAR(255),
	"lastName" VARCHAR(255),
	"email" VARCHAR(255),
	"slack" VARCHAR,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"hipsterInterest" INT DEFAULT 0,
	"hipsterSkill" INT DEFAULT 0,
	"hackerInterest" INT DEFAULT 0,
	"hackerSkill" INT DEFAULT 0,
	"hustlerInterest" INT DEFAULT 0,
	"hustlerSkill" INT DEFAULT 0,
	"accessLevel" INT DEFAULT 1,
	"cohortId" INT REFERENCES "cohorts",
	"oriented" INT DEFAULT 0,
	"aboutMe" VARCHAR
);

CREATE TABLE "adminCode"(
	"id" SERIAL PRIMARY KEY,
	"adminCode" VARCHAR(255) NOT NULL
);

CREATE TABLE "series" (
	"id" SERIAL PRIMARY KEY,
	"seriesName" VARCHAR(255) NOT NULL
);



CREATE TABLE "cohorts_series" (
	"id" SERIAL PRIMARY KEY,
	"cohortId" INT REFERENCES "cohorts" ON DELETE CASCADE,
	"seriesId" INT REFERENCES "series" ON DELETE CASCADE
);


CREATE TABLE "modules" (
	"id" SERIAL PRIMARY KEY,
	"seriesId" INT REFERENCES "series" ON DELETE CASCADE,
	"name" VARCHAR(255) NOT NULL
);


CREATE TABLE "cohorts_modules" (
	"id" SERIAL PRIMARY KEY,
	"cohortId" INT REFERENCES "cohorts" ON DELETE CASCADE,
	"moduleId" INT REFERENCES "modules" ON DELETE CASCADE,
	"assignedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"dueDate" TIMESTAMP
);


CREATE TABLE "assignments" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"createdDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"moduleId" INT REFERENCES "modules" ON DELETE CASCADE,
	"content" VARCHAR,
	"media" VARCHAR,
	"textField" BOOL DEFAULT 'false',
	"file" BOOL DEFAULT 'false',
	"video" BOOL DEFAULT 'false',
	"community" BOOL DEFAULT 'false',
	"postClass" BOOL DEFAULT 'false',
    "feedback" VARCHAR,
    "seriesId" INT REFERENCES "series" ON DELETE CASCADE
);



CREATE TABLE "submissions" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user" ON DELETE CASCADE,
	"assignmentId" INT REFERENCES "assignments" ON DELETE CASCADE,
	"textInput" VARCHAR,
	"file" VARCHAR,
	"video" VARCHAR,
	"submissionDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"completed" BOOL NOT NULL DEFAULT 'false'
);



CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"content" VARCHAR,
	"userId" INT REFERENCES "user" ON DELETE CASCADE,
	"submissionId" INT REFERENCES "submissions" ON DELETE CASCADE,
	"parentCommentId" INT,
	"createdDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE "announcements" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"content" VARCHAR NOT NULL,
	"createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "orientation" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"step" INT NOT NULL UNIQUE,
	"content" VARCHAR,
	"media" VARCHAR,
	"submission" BOOL DEFAULT 'false'
);


--TEST DATA

INSERT INTO "cohorts"
	("cohortName", "accessCode")
VALUES
	('Ramirez', '1234'),
	('Bannanas', 'asdf');


INSERT INTO "series"
	("seriesName")
VALUES
	('100'),
	('200'),
	('300');
	
INSERT INTO "modules"
	("seriesId", "name")
VALUES
	('1', '101'),
	('2', '201');
	
INSERT INTO "assignments"
	("name", "moduleId", "content", "textField", "file", "video", "postClass", "seriesId")
VALUES
	('Plant a tree',
	1,
	'take an acorn and put it 6" deep and mulch above it',
	'true',
	'true',
	'false',
	'true',
    1),
	('Dance a jig',
	1,
	'turn on some Mylie and throw your hands up, make sure to party like you just dont care',
	'false',
	'false',
	'true',
	'false',
    1);
	
INSERT INTO "announcements"
	("title", "content")
VALUES
	('No class today :(', 'Due to the abundance of sparrows in the entry way we will not have class today');


INSERT INTO "adminCode"
	("adminCode")
VALUES
	('1376eRsDD');












