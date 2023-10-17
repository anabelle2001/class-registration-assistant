CREATE TABLE semester (
    SID          INTEGER,
    semesterName TEXT,

    PRIMARY KEY(SID)
);

CREATE TABLE section (
    SID INTEGER NOT NULL,
    CRN INTEGER NOT NULL,
    section INTEGER,
    online INTEGER NOT NULL,
    independentStudy INTEGER NOT NULL,
    seatsMaximum INTEGER,
    seatsAvaliable INTEGER,
    creditHours INTEGER NOT NULL,
    courseName TEXT NOT NULL,
    express INTEGER,

    PRIMARY KEY(SID,CRN)
);

CREATE TABLE meeting (
    SID INTEGER,
    CRN INTEGER,

    days TEXT,
    starts INTEGER,
    ends INTEGER,
    room TEXT,
    PRIMARY KEY(SID,CRN,days,starts),
    FOREIGN KEY(SID,CRN) REFERENCES section(SID,CRN)
);

CREATE TABLE faculty (
    FID INTEGER NOT NULL UNIQUE,
    Name TEXT,
    Email TEXT,
    PRIMARY KEY(FID)
);

CREATE TABLE teaches (
    SID INTEGER,
    CRN INTEGER,
    FID INTEGER,

    FOREIGN KEY(FID) REFERENCES faculty(FID),
    FOREIGN KEY(SID,CRN) REFERENCES section(SID,CRN)
);

CREATE TABLE enrollment(
    SID INTEGER,
    CRN INTEGER,
    maxSeats INTEGER,
    filledSeats INTEGER,
    atTime INTEGER,

    PRIMARY KEY(SID,CRN,atTime),
    FOREIGN KEY(SID,CRN) REFERENCES section(SID,CRN)
);