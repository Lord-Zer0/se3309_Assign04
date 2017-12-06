-- basic needs of the DB. These need to run first
INSERT INTO users(email, password, fullName) VALUES('exemail1@example.com', 'password', 'John Smith');
INSERT INTO users(email, password, fullName) VALUES('exemail2@example.com', 'wordpass', 'Rohn Smyth');
INSERT INTO users(email, password, fullName) VALUES('exemail3@example.com', 'pawossrd', 'Jon Smiths');
INSERT INTO locations(country, province, city) VALUES('Canada', 'Ontario', 'London');
INSERT INTO locations(country, province, city) VALUES('Canada', 'Ontario', 'Toronto');
INSERT INTO locations(country, province, city) VALUES('Canada', 'Ontario', 'Ottawa');
INSERT INTO weather(high, low, precipitationAmt, precipitationType, humidity, locationID) VALUES(3, -2, 0, 'none', 54, 1);
INSERT INTO forecasts(date, high, low, precipitationAmt, precipitationType, humidity, chance, locationID)
	VALUES(NOW(), 8, 2, 10, 'snow', 74, 62, 1);
INSERT INTO forecasts(date, high, low, precipitationAmt, precipitationType, humidity, chance, locationID)
	VALUES(NOW() + INTERVAL 1 DAY, -13, -20, 19, 'hail', 54, 76, 1);
-------------------------------------------------------------------------------------------------------------------

-- Insert query 1
INSERT INTO userReports SET temp=1, precipitation='y', comments='nice weather', 
	locationID=(SELECT locationID FROM locations LIMIT 1),
	email=(SELECT email FROM users LIMIT 1);

-- Insert query 2
INSERT INTO weather(high, low, precipitationAmt, precipitationType, humidity, locationID) 
	SELECT high, low, precipitationAmt, precipitationType, humidity, locationID FROM forecasts WHERE DATE(forecasts.date) = DATE(NOW());

-- Insert query 3
INSERT INTO userLocations(email, locationID) 
	SELECT email, locationID 
	FROM users JOIN locations;