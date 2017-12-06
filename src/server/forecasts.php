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
    $date     = date("Y-m-d H:i:s");
    $end_date = date("Y-m-d H:i:s", strtotime("+1 week"));
    
    if ($type != 'filter') {
        $s = "SELECT country, province, city, locationID, high, low, precipitationAmt, precipitationType, chance, humidity, DATE(date) AS date FROM forecasts "
        ."JOIN locations USING (locationID) "
        ."WHERE country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city' "
        ."AND date > NOW() AND date < NOW() + INTERVAL 1 WEEK";

        $q = $db->query($s);

        $i = 0;

        while ($row = mysqli_fetch_assoc($q)) {
            $res[$i] = array(
                            'country'  => $row['country'],
                            'province' => $row['province'],
                            'city'     => $row['city'],
                            'high'     => $row['high'],
                            'low'      => $row['low'],
                            'precAmt'  => $row['precipitationAmt'],
                            'precType' => $row['precipitationType'],
                            'chance'   => $row['chance'],
                            'date'     => $row['date'],
                            'humidity' => $row['humidity']
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
