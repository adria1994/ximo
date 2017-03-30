<?php
include_once('connect.php');
header('Content-type: text/html; charset=UTF-8');
$array = [];
if ($resultado = $mysqli->query('SELECT city.Name from city join country on CountryCode = country.Code')) {
    $i = 0;
    while ($row = $resultado->fetch_assoc()){
        $array[$i] = $row['Name'];
        $i++;

    }

     echo json_encode($array);
}



