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
		$return_array = array('message' => 'authenticated', 'email' => $email);
		echo json_encode($return_array);
	}
	else {
		$return_array = array('message' => 'Incorrect login information');
		echo json_encode($return_array);
	}

?>