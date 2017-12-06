<?php
    $db = mysqli_connect("localhost", "root", "", "se3309");
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    $res = array();

    $country  = $_POST['country'];
	$province = $_POST['province'];
    $city     = $_POST['city'];
    $range    = $_POST['range'];

    if ($range != 'filter') {
        switch ($range) {
            case 'day':
                $from = date("Y-m-d H:i:s", strtotime("-1 day"));            
                break;
            case 'week':
                $from = date("Y-m-d H:i:s", strtotime("-1 week"));
                break;
            
            case 'month':
                $from = date("Y-m-d H:i:s", strtotime("-1 month"));
                break;

            case 'year':
                $from = date("Y-m-d H:i:s", strtotime("-1 year"));
                break;
        
            default:
                $from = '%';
                break;
        }

        if ($from != '%') {
            $s = "SELECT country, province, city, locationID, weatherID, high, low, precipitationAmt, precipitationType, date FROM weather "
            ."JOIN locations USING (locationID) "
            ."WHERE date < NOW() AND date > '$from' AND country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city'";

            $q = $db->query($s);

            $a = "SELECT AVG(high) AS havg, AVG(low) AS lavg FROM weather "
                ."JOIN locations USING (locationID) "
                ."WHERE date < NOW() AND date > '$from' AND country LIKE '%' AND province LIKE '%' AND city LIKE '%'";

            $avg = $db->query($a);

        } else {
            $s = "SELECT country, province, city, locationID, weatherID, high, low, precipitationAmt, precipitationType, date FROM weather "
            ."JOIN locations USING (locationID) "
            ."WHERE date < NOW() AND country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city'";

            $q = $db->query($s);

            $a = "SELECT AVG(high) AS havg, AVG(low) AS lavg FROM weather "
                ."JOIN locations USING (locationID) "
                ."WHERE date < NOW() AND date > '$from' AND country LIKE '%' AND province LIKE '%' AND city LIKE '%'";

            $avg = $db->query($a);
        }

        while($row = mysqli_fetch_assoc($avg)) {
            $havg = $row['havg'];
            $lavg = $row['lavg'];
        }

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
                            'date'     => $row['date'],
                            'havg'     => $havg,
                            'lavg'     => $lavg
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
