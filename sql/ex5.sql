-- SELECT Query 1
SELECT country, province, city FROM locations WHERE country='Canada' LIMIT 20;

-- SELECT Query 2
SELECT fullName, country, city, province FROM users AS u
	JOIN userlocations AS ul
	JOIN locations AS loc
	ON u.email = ul.email AND ul.locationID = loc.locationID
	WHERE fullName LIKE "C%";

-- SELECT Query 3
SELECT fullName, reportID, date, temp, precipitation, comments, city 
	FROM users AS u
	JOIN userreports AS ur
	JOIN locations AS l
	ON l.locationID = ur.locationID AND u.email = ur.email
	WHERE ur.temp > 30
	GROUP BY ur.date
	ORDER BY reportID ASC;

-- SELECT Query 4
SELECT forecastID, weatherID, w.high AS whigh, f.high AS fhigh, chance, f.date FROM forecasts AS f 
	JOIN weather AS w
	ON f.date = w.date
	WHERE f.high = ANY (SELECT high FROM weather WHERE high > 30)
	ORDER BY chance DESC;

-- SELECT Query 5
SELECT * FROM
	(SELECT date, high, low FROM weather) t1
	INNER JOIN
	(SELECT date, temp FROM userreports) t2
	ON DATE(t1.date) = DATE(t2.date);


-- SELECT Query 6
SELECT stormID, weatherID, type, COUNT(*) 
	FROM storms WHERE scale > 7
	GROUP BY stormID;
