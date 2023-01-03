
--DATABASE NAME: ilt_academy



CREATE TABLE "cohorts" (
	"id" SERIAL PRIMARY KEY,
	"cohortName" VARCHAR(255) NOT NULL UNIQUE,
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
	"cohortId" INT REFERENCES "cohorts" ON DELETE SET NULL,
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
	"seriesId" INT REFERENCES "series" ON DELETE CASCADE,
    UNIQUE ("cohortId", "seriesId")
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
	"dueDate" TIMESTAMP,
    UNIQUE ("cohortId", "moduleId")
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


INSERT INTO "orientation"
("name", "step", "content")
VALUES
('Letter from ILT Founder, Nick Tietz', '0', '<table style="color: rgb(51, 51, 51); font-family: &quot;Helvetica Neue&quot;; font-size: 13px;" class="se-table-size-auto"><tbody><tr><td><div><span style="font-size: 14px;">Welcome, founders!<br></span></div><div><span style="font-size: 14px;"><br></span></div><p><span style="font-size: 14px;">My name is Nick Tietz, and I'm a husband, father, serial entrepreneur, and Founder/CEO of ILT Academy.</span></p>​<p><span style="font-size: 14px;">I created ILT Academy in order to train innovators, entrepreneurs, and students in&nbsp;<span style="background-color: transparent;">the skills needed to develop successful ventures and create high-growth 21st&nbsp;century businesses. Our team is delighted&nbsp;to have you participating in our Lean Startup program!</span></span></p>​<p><span style="font-size: 14px;">I just have to say one thing right away: ILT Academy is not your typical course.</span></p>​<p><span style="font-size: 14px;">Our academy is 100% learner-centered and guides you through the interactive&nbsp;<em style="background-color: transparent;">ILT Nimble Innovation</em><span style="background-color: transparent;">&nbsp;process. Nimble Innovation was created by founders for founders.&nbsp;Our academy will help you expand and&nbsp;develop holistic ideas, as well as focus in on the most important parts that propel business ideas forward.</span></span></p>​<p><span style="font-size: 18px;">We believe that being an entrepreneur is not a talent,&nbsp;<span style="background-color: transparent;">but a skill that can be taught and trained.</span></span></p>​<p><span style="font-size: 18px;">We co-create the ideal spaces and places for anyone<span style="background-color: transparent;">&nbsp;looking to learn and practice the skills of startup entrepreneurship.</span></span></p>​<p><span style="font-size: 14px;">Our mission is to engage, train, and connect underestimated&nbsp;<span style="background-color: transparent;">innovators and startup entrepreneurs in underserved geographies and build&nbsp;up the next generation of 21st century business leaders.</span></span><span style="background-color: transparent;">&nbsp;</span></p>​<p>&nbsp;</p><p><span style="font-size: 14px;">Cheers,</span></p><p><span style="font-size: 20px;">Nick</span></p>​</td><td><div class="se-component se-image-container __se__float- __se__float-none" contenteditable="false"><figure style="margin: 0px; width: 396px;"><img src="https://canvas.instructure.com/courses/4223650/files/167910312/preview" alt="Nick profile.JPG" data-origin="100," data-proportion="true" data-size="396px,795px" data-align="none" data-file-name="preview" data-file-size="0" style="width: 396px; height: 795px;" data-index="1"></figure></div><div><br></div></td></tr></tbody></table><p>&nbsp;</p>'),
('🏠 Gathertown Tutorial', '1', '<p><span style="font-size: 14px;">Hi Founders,</span></p><p><span style="font-size: 14px;">We will be using&nbsp;<strong>Gathertown</strong>&nbsp;as our video platform and virtual meeting space. Think of it as Zoom, but with a video game-style twist!&nbsp;</span></p><p><span style="font-size: 14px;">&nbsp;</span></p><p><span style="font-size: 14px;">Check out this Intro Video to get familiar with Gathertown before we meet for the first time:</span></p><div class="se-component se-video-container __se__float-none" contenteditable="false"><figure style="height: 540px; padding-bottom: 540px; width: 960px; margin: 0px;"><iframe frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/89at5EvCEvk" data-proportion="true" data-size="960px,540px" data-align="none" style="width: 960px; height: 540px;" data-index="0" data-file-name="89at5EvCEvk" data-file-size="0" data-origin="960px,540px"></iframe></figure></div><p><span style="font-size: 14px;">​<br></span></p>'),
('✍️ MURAL/Community Board Overview & Setup', '2', '<p><span style="font-size: 14px;">Hi Founders,</span></p><p><span style="font-size: 14px;">In this program, we will be using&nbsp;<strong>Mural</strong>, a digital workspace for visual collaboration. Think of it as a notebook, white board, and stack of post-its all in one virtual environment!</span></p><p><span style="font-size: 14px;">Based on our experience, most founders need 20 - 30 minutes of "Mural practice" before they're ready to use Mural's tools the best way possible during our live sessions.</span></p><p><span style="font-size: 14px;">Before class, go into Mural and join our Community Board.</span></p><p><span style="font-size: 14px;">1. Practice using Mural by uploading a headshot to our Community Board! (for an example, see your ILT Facilitator's photo already on the board).</span></p><p><span style="font-size: 14px;">&nbsp;</span></p><p><span style="font-size: 14px;">Here's an overview of what Mural is and how it works!</span></p><div class="se-component se-video-container __se__float-none" contenteditable="false"><figure style="height: 540px; padding-bottom: 540px; width: 960px; margin: 0px;"><iframe frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/mBFFpsy-RUo" data-proportion="true" data-size="960px,540px" data-align="none" style="width: 960px; height: 540px;" data-index="0" data-file-name="mBFFpsy-RUo" data-file-size="0" data-origin="960px,540px"></iframe></figure></div><p><span style="font-size: 14px;">​<br></span></p>'),
('💬 Slack Account Setup', '3', '<p><span style="font-size: 14px;">Founders,</span></p><p><span style="font-size: 14px;">Please join ILT Academy on Slack -- our virtual chat room!</span></p><p><span style="font-size: 14px;">It’s a very immediate and straightforward method of communication that you can access from your desktop or phone (via app).</span></p><p><span style="font-size: 14px;">&nbsp;</span></p><ol><li style="font-size: 14px;"><a href="https://join.slack.com/t/iltacademy-founders/shared_invite/zt-wq32cox2-uIlnBqPEg9OwXkqlSUCLyA" target="_blank" rel="noreferrer noopener">Click here to create your free Slack account.</a></li><li style="font-size: 14px;">Leave the message "<em>Hello world</em>" in the #general Channel.</li></ol>'),
('🔗 Join ILT Academy on Social Media', '4', '<div class="se-component se-image-container __se__float- __se__float-none" contenteditable="false" style="width: 100%;"><figure style="margin: 0px; width: 100%;"><img src="https://canvas.instructure.com/courses/4223650/files/168206877/preview" alt="ILT Cohort_C9_2021.jpeg" data-origin="100,399" data-proportion="true" data-size="100%," data-align="" data-index="0" data-file-name="preview" data-file-size="0" style="width: 100%;" data-rotate="" data-rotatex="" data-rotatey="" data-percentage="100,"></figure></div><p style="text-align: center"><em><span style="font-size: 13px">ILT Founder Showcase, Dec 2021</span></em></p><h4><span style="font-size: 16px;"><br></span></h4><h4><span style="font-size: 16px;">Connect with us on our social feeds to stay up to date on ILT news and events:</span></h4><ul><li style="font-size: 14px;">"Like us" on<strong>&nbsp;<a href="https://www.facebook.com/ILTAcademy1" target="_blank" rel="noreferrer noopener">Facebook!</a></strong></li><li style="font-size: 14px;">"Follow us" on&nbsp;<strong><a href="https://www.linkedin.com/company/ilt-academy-startup/" target="_blank" rel="noreferrer noopener">LinkedIn!</a></strong></li><li style="font-size: 14px;">"Subscribe" to our&nbsp;<strong><a href="https://www.youtube.com/channel/UCh4_Jk_73qXxjQHHjUeR0WA" target="_blank" rel="noreferrer noopener">Youtube Channel</a>!</strong></li></ul><p><span style="font-size: 14px;">&nbsp;</span></p><h4><span style="font-size: 16px;">For bonus points, follow the ILT Academy team on LinkedIn:</span></h4><ul><li style="font-size: 14px;"><a href="https://www.linkedin.com/in/nick-tietz/" target="_blank" rel="noreferrer noopener">Nick Tietz (Founder + CEO)</a></li><li style="font-size: 14px;"><a href="https://www.linkedin.com/in/saralynndolan/" target="_blank" rel="noreferrer noopener">Sara Dolan (Director, Education and Digital Development)</a></li><li style="font-size: 14px;"><a href="https://www.linkedin.com/in/allison-wood-00204a215/" target="_blank" rel="noreferrer noopener">Allison Wood (Community Manager)</a></li><li style="font-size: 14px;"><a href="https://www.linkedin.com/in/jon-walters-6007b880/" target="_blank" rel="noreferrer noopener">Jon Walters (ILT Trainer/Facilitator)</a></li></ul><p style="text-align: center"><span style="font-size: 14px;">​</span></p>')









