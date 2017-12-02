<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();
	$name = $_POST['name'];
	$email = $_POST['email'];
	$pass = $_POST['password'];
	$pass = hash('sha256', $pass);

	$q = $db->query("INSERT INTO users VALUES ('$email', '$pass', '$name')");

	echo json_encode("{ message: 'user registered' }");
?>