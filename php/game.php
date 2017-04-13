<?php
include_once('connect.php');

switch (@$_POST['funcion']){
    case 'create':
        $token = $_POST['token'];
        $username = $_POST['username'];
        createGame($mysqli, $username, $token);
        break;
    case 'update';
        updateGame($mysqli, $username, $token);
        break;
    case 'finish';
        finish($mysqli, $username, $token);
        break;
}

function createGame($mysqli, $username, $token) {
    $array = [];
    $array['error'] = 1;
    $array['errorMessage'] = '';

    $idUser = getUserId($mysqli, $username, $token);
    if ($idUser > 0) {
        $select = "INSERT INTO `game` (`Id`, `Fecha`, `Edad`, `Id_user`) VALUES (DEFAULT, :date, NULL, :idUser)";
        $row = $mysqli->prepare($select);
        $row->execute(array(':date' => date('Y-m-d'), ':idUser' => $idUser));

        if ($row->rowCount() == 1) {
            $id = $mysqli->lastInsertId();
            $select = "UPDATE `user` SET `CurrentGame` = :id WHERE Username = :name AND Token = :token";
            $row = $mysqli->prepare($select);
            $row->execute(array(':id' => $id, ':name' => $username, ':token' => $token));
            if ($row->rowCount() == 1) $array['error'] = 0;
        }
    } else $array['errorMessage'] = 'Sesion invalida';

    echo json_encode($array);
}

function getUserId($mysqli, $name, $token) {
    $select = "SELECT * FROM user WHERE Username = :name AND Token = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name, ':token' => $token));
    return $row->rowCount() == 1 ? $row->fetch()['Id'] : -1;
}

$mysqli = null;