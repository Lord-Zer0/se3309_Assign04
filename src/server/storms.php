<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();

	$country  = $_POST['country'];
	$province = $_POST['province'];
	$city     = $_POST['city'];
	$type     = $_POST['type'];

	if($type != 'filter') {
		$s = "SELECT country, province, city, locationID, weatherID, high, low, precipitationAmt, precipitationType, stormID, type, scale, duration FROM weather "
			."JOIN locations USING (locationID) "
			."JOIN storms USING (weatherID) "
			."WHERE country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city' AND type LIKE '$type'";

		// $res = array('message' => $s);
		// echo json_encode($res);
		// return true;

		$q = $db->query($s);

		$i = 0;

		while ($row = mysqli_fetch_assoc($q)) {
			$res[$i] = array(
							'country'  => $row['country'],
							'province' => $row['province'],
							'city'     => $row['city'],
							'type'     => $row['type'],
							'high'     => $row['high'],
							'low'      => $row['low'],
							'precAmt'  => $row['precipitationAmt'],
							'precType' => $row['precipitationType'],
							'scale'    => $row['scale'],
							'duration' => $row['duration']
							);
			$i++;
		}

		echo json_encode($res);
		return true;
	}

	$countries = $db->query("SELECT DISTINCT country FROM locations WHERE country LIKE '$country' ORDER BY country ASC");
	$provinces = $db->query("SELECT DISTINCT province FROM locations WHERE country LIKE '$country' AND province LIKE '$province' ORDER BY province ASC");
	$cities = $db->query("SELECT DISTINCT city FROM locations WHERE country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city' ORDER BY city ASC");

	$i = 0;

	while($row = mysqli_fetch_assoc($countries)) {
		$res['countries'][$i] = array(
					'country'   => $row['country']
				);
		$i++;
	}

	$i = 0;

	while($row = mysqli_fetch_assoc($provinces)) {
		$res['provinces'][$i] = array(
					'province'   => $row['province']
				);
		$i++;
	}

	$i = 0;

	while($row = mysqli_fetch_assoc($cities)) {
		$res['cities'][$i] = array(
					'city'   => $row['city']
				);
		$i++;
	}

	echo json_encode($res);


?>

