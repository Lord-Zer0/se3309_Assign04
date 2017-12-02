<?php
	$db = mysqli_connect("localhost", "root", "", "se3309");
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}

	$res = array();
	$email = $_POST['email'];
	$pass = $_POST['password'];
	$pass = hash('sha256', $pass);

	$q = $db->query("SELECT * FROM users WHERE email='$email' AND password='$pass' LIMIT 1");

	if($row = mysqli_fetch_assoc($q)) {
		echo json_encode("{ message: 'User authenticated' }");
	}
	else {
		echo json_encode("{ message: 'Incorrect login information' }");
	}

?>