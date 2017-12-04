<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();
	$locID = $_POST['id'];
	$email = $_POST['email'];

	$q = $db->query("INSERT INTO userlocations(email, locationID) VALUES ('$email', '$locID')");

	$res = array('message' => 'Added location');

	echo json_encode($res);


?>