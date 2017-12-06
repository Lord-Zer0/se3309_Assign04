<?php
    $db = mysqli_connect("localhost", "root", "", "se3309");
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    $res = array();

    $country  = $_POST['country'];
	$province = $_POST['province'];
    $city     = $_POST['city'];
    $date     = date("Y-m-d H:i:s");
    $end_date = date("Y-m-d H:i:s", strtotime("+1 week"));
    
    $s = "SELECT country, province, city, locationID, high, low, precipitationAmt, precipitationType, chance FROM forecasts "
    ."JOIN locations USING (locationID) "
    ."WHERE country LIKE '$country' AND province LIKE '$province' AND city LIKE '$city'"
    ."WHERE date > $date AND date < $end_date";

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
                        'chance'   => $row['chance']
                        );
        $i++;
    }

    echo json_encode($res);
    return true;
?>