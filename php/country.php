<?php
include_once('connect.php');
header('Content-type: text/html; charset=UTF-8');
$array = [];
if ($resultado = $mysqli->query('SELECT name from country')) {
    $i = 0;
    while ($row = $resultado->fetch_assoc()){
        $array[$i] = $row['name'];
        $i++;

    }

    echo json_encode($array);
}



