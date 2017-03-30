<?php
include_once('connect.php');

switch ($_POST['funcion']){
    case 'getCity':
        getCity($mysqli, $_POST['country']);
        break;
    case 'getCountry';
        getCountry($mysqli);
        break;
}

function getCountry($mysqli) {
    $array = [];
    foreach ($mysqli->query('SELECT Code, Name from country') as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}

function getCity($mysqli, $country) {
    $array = [];
    foreach ($mysqli->query('SELECT Id, Name from city WHERE CountryCode = \'' . $country . '\'') as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}



