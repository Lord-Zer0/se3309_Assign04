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

    switch ($range) {
        case 'day':
            $from = date("Y-m-d H:i:s", strtotime("-1 day"));            
            break;
        case 'week':
            $from = date("Y-m-d H:i:s", strtotime("-1 day"));
            break;
            
        case 'month':
            $from = date("Y-m-d H:i:s", strtotime("-1 day"));
            break;

        case 'year':
            $from = date("Y-m-d H:i:s", strtotime("-1 day"));
            break;
        
        default:
            $from = '%';
            break;
    }

    if ($from != '%') {
        $s = "SELECT country, province, city, locationID, weatherID, high, low, precipitationAmt, precipitationType, stormID, type, date FROM weather "
        ."JOIN locations USING (locationID) "
        ."WHERE date < $date AND date > $from ";

        $q = $db->query($s);
    } else {
        $s = "SELECT country, province, city, locationID, weatherID, high, low, precipitationAmt, precipitationType, stormID, type, date FROM weather "
        ."JOIN locations USING (locationID) "
        ."WHERE date < $date ";

        $q = $db->query($s);
    }
    if ($q == null) {
        return false;
    }

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
                        'precType' => $row['precipitationType']
                        );
        $i++;
    }
    
    echo json_encode($res);
    return true;

?>