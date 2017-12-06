-- CREATE VIEWS
-- =================================================================
-- CREATE VIEW 1
/* create view combining forecasts and userreports as a full join */
CREATE VIEW observable_data AS
	SELECT * FROM forecasts
	LEFT OUTER JOIN userreports
	USING (date,locationID)
	UNION
	SELECT * FROM userreports
	LEFT OUTER JOIN forecasts
	USING (date, locationID);

-- CREATE VIEW 2
/* Create view for high and low temp as well as storms */
CREATE VIEW extreme_weather AS
	SELECT weatherID, high, low, precipitationType, humidity, type, duration, scale FROM weather
	JOIN storms
	USING (weatherID)
	WHERE high > 30 OR low < -20;

-- CREATE VIEW 3
/* Create view for more information on user*/
CREATE VIEW user_data AS
	SELECT * FROM LOCATIONS 
	RIGHT JOIN userlocations 
	USING (locationID)
	JOIN users 
	USING (email)
	ORDER BY fullName;