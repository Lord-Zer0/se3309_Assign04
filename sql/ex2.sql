CREATE TABLE users (
	email    VARCHAR(256) NOT NULL,
	password VARCHAR(1024) NOT NULL,
	fullName VARCHAR(256),
	PRIMARY KEY(email)
);

CREATE TABLE locations (
	locationID BIGINT NOT NULL AUTO_INCREMENT,
	country    VARCHAR(128) NOT NULL,
	province   VARCHAR(128) NOT NULL,
	city       VARCHAR(128) NOT NULL,
	PRIMARY KEY(locationID)
);

CREATE TABLE userLocations (
	id         BIGINT NOT NULL AUTO_INCREMENT,
	email      VARCHAR(256) NOT NULL,
	locationID BIGINT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(locationID) REFERENCES locations(locationID),
	FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE weather (
	weatherID         BIGINT NOT NULL AUTO_INCREMENT,
	date              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	high              INT NOT NULL,
	low               INT NOT NULL,
	precipitationAmt  INT NOT NULL,
	precipitationType ENUM('rain', 'snow', 'hail', 'mixed', 'none'),
	humidity          INT NOT NULL,
	locationID        BIGINT NOT NULL,
	PRIMARY KEY(weatherID),
	FOREIGN KEY(locationID) REFERENCES locations(locationID)
);

CREATE TABLE forecasts (
	forecastID        BIGINT NOT NULL AUTO_INCREMENT,
	date              DATETIME NOT NULL,
	high              INT NOT NULL,
	low               INT NOT NULL,
	precipitationAmt  INT NOT NULL,
	precipitationType ENUM('rain', 'snow', 'hail', 'mixed', 'none'),
	humidity          INT NOT NULL,
	chance            INT NOT NULL,
	locationID        BIGINT NOT NULL,
	PRIMARY KEY(forecastID),
	FOREIGN KEY(locationID) REFERENCES locations(locationID)
);

CREATE TABLE storms (
	stormID   BIGINT NOT NULL AUTO_INCREMENT,
	weatherID BIGINT NOT NULL,
	type      ENUM('hurricane', 'tornado', 'snow', 'thunder', 'rain'),
	scale     INT,
	duration  INT,
	PRIMARY KEY(stormID, weatherID),
	FOREIGN KEY(weatherID) REFERENCES weather(weatherID)
);

CREATE TABLE userReports (
	reportID      BIGINT NOT NULL AUTO_INCREMENT,
	date          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	temp          INT NOT NULL,
	precipitation ENUM('y','n'),
	comments      VARCHAR(1024),
	locationID    BIGINT NOT NULL,
	email        VARCHAR(256) NOT NULL,
	PRIMARY KEY(reportID),
	FOREIGN KEY(locationID) REFERENCES locations(locationID),
	FOREIGN KEY(email) REFERENCES users(email)
);