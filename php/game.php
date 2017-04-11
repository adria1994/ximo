<?php
include_once('connect.php');
include('');

switch ($_POST['funcion']){
    case 'create':

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
    $select = "SELECT Code, Name from country";
    $row = $mysqli->prepare($select);
    $row->execute();
    while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) array_push($array, $row2);
    $mysqli = null;
    echo json_encode($array);
}

function getCity($mysqli, $country) {
    $array = [];
    $select = "SELECT Id, Name from city WHERE CountryCode = :country";
    $row = $mysqli->prepare($select);
    $row->execute(array(':country' => $country));
    while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) array_push($array, $row2);
    $mysqli = null;
    echo json_encode($array);
}

function register($mysqli, $name, $password, $password_confirm, $email, $bornDate, $bornCity) {
    $response['auth'] = 0;
    if ($name != "" && $password != "" && $password_confirm != "" && $email != "" && $bornDate != "" && $bornCity != "") {
        if ($password == $password_confirm) {
            $exist = userExist($mysqli, $name);

            if (!$exist) {
                $bornDate = date("Y-m-d", strtotime($bornDate));
                $select = "INSERT INTO `user` (`Id`, `Username`, `Password`, `Rol`, `Email`, `DateBorn`, `IdCity`) VALUES(default, :name, :password, 'user', :email, :bornDate, :bornCity)";
                $row = $mysqli->prepare($select);
                $row->execute(array(':name' => $name ,':password' => $password , ':email' => $email , ':bornDate' => $bornDate , ':bornCity' => $bornCity));

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
            } else $response['error'] = "El nombre de usuario ya existe";
        } else $response['error'] = "Las contraseñas no coinciden";
    } else $response['error'] = "Hay campos vacios";
    $mysqli = null;
    echo json_encode($response);
}

function userExist($mysqli, $name) {
    $select = "SELECT * FROM user WHERE Username = :name";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name));
    $mysqli = null;
    return $row->rowCount();
}

