<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();
	$city = $_POST['term'];

	$q = $db->query("SELECT * FROM locations WHERE city='$city'");

	$i = 0;

	while($row = mysqli_fetch_assoc($q)) {
		$res[$i] = array(
					'loc_id'   => $row['locationID'],
					'city'     => $row['city'],
					'province' => $row['province'],
					'country'  => $row['country']
				);
		$i++;
	}

	echo json_encode($res);


?>