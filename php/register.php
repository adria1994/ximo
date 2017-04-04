<?php
include_once('connect.php');

switch ($_POST['funcion']){
    case 'getCity':
        getCity($mysqli, $_POST['country']);
        break;
    case 'getCountry';
        getCountry($mysqli);
        break;
    case 'register':
        register($_POST['name'],
            $_POST['password'],
            $_POST['password_confirmation'],
            $_POST['email'],
            $_POST['bornDate'],
            $_POST['bornCountry'],
            $_POST['bornCity']);
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

function register($name, $password, $password_confirm, $email, $bornDate, $bornCountry, $bornCity) {
    $response[] = $name;
    $response[] = $password;
    $response[] = $password_confirm;
    $response[] = $email;
    $response[] = $bornDate;
    $response[] = $bornCountry;
    $response[] = $bornCity;

    echo json_encode($response);

}


