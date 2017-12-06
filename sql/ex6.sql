-- Data Mod Query 1
/* Add into forecasts multiple rows of data at once */
INSERT INTO forecasts (date, high, low, precipitationAmt, precipitationType, humidity, chance, locationID)
	VALUES 
	('2014-09-13', 18, 15, 40, 'rain', 30, 70, 1),
	('2015-11-20', 3, -2, 32, 'snow', 30, 43, 2),
	('2016-01-04', 18, 15, 0, 'none', 30, 23, 1),
	('2014-05-24', 21, 18, 60, 'rain', 30, 64, 1);


-- Data Mod Query 2
/* Add into weather data from forecasts for dates which have not yet been logged */
INSERT INTO weather(date, high, low, precipitationAmt, precipitationType, humidity, locationID)
	(SELECT date, high, low, precipitationAmt, precipitationType, humidity, locationID FROM forecasts WHERE date > NOW());


-- Data Mod Query 3
/* Delete from storms after the first 3 id numbers where there is a tornado 
   with a scale < 5 or any storm duration > 4 or any storm of type rain */
DELETE FROM storms WHERE
    (stormID > 3)
    AND ((scale < 5 AND type = 'tornado')
    OR (duration > 4)
    OR (type = 'rain'));

