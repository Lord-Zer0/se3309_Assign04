<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();
	$temp  = $_POST['temp'];
	$prec  = $_POST['prec'];
	$comm  = $_POST['comments'];
	$loc   = $_POST['locationID'];
	$email = $_POST['email'];


	$q = $db->query("INSERT INTO userreports(date, temp, precipitation, comments, locationID, email) VALUES(NOW(), '$temp', '$prec', '$comm', '$loc', '$email')");

	$res = array('message' => 'done');

	echo json_encode($res);

?>