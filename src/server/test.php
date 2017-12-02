<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$q = $db->query('SELECT * FROM weather LIMIT 10');
	$weather_array = array();

	while($row = mysqli_fetch_assoc($q)) {
		array_push($weather_array, array(
									'high' => $row['high'],
									'low' => $row['low']
								));
	}

	echo json_encode($weather_array);

?>