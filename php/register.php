<?php
include_once('connect.php');
include('Auth.php');

switch ($_POST['funcion']){
    case 'getCity':
        getCity($mysqli, $_POST['country']);
        break;
    case 'getCountry';
        getCountry($mysqli);
        break;
    case 'register':
        register($mysqli, $_POST['name'],
            $_POST['password'],
            $_POST['password_confirmation'],
            $_POST['email'],
            $_POST['bornDate'],
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

function register($mysqli, $name, $password, $password_confirm, $email, $bornDate, $bornCity) {
    $response['auth'] = 0;
    if ($password == $password_confirm) {
        $exist = userExist($mysqli, $name);

        if (!$exist) {
            $bornDate = date("Y-m-d", strtotime($bornDate));
            $select = "INSERT INTO `user` (`Id`, `Username`, `Password`, `Rol`, `Email`, `DateBorn`, `IdCity`) VALUES(default,'$name','$password', 'user', '$email', '$bornDate', '$bornCity')";
            $row = $mysqli->prepare($select);
            $row->execute();

            if ($row->rowCount() == 1) {
                $response['auth'] = 1;
                $id = $mysqli->lastInsertId();
                $response['id'] = $id;
                $response['username'] = $name;
                $response['token'] = Auth::SignIn([
                    'id' => $id,
                    'name' => $name
                ]);
            }
        }
    }

    echo json_encode($response);
}

function userExist($mysqli, $name) {
    $select = "SELECT * FROM user WHERE Username = '$name'";
    $row = $mysqli->prepare($select);
    $row->execute();

    return $row->rowCount();
}

