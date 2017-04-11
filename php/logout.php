<?php
include_once('connect.php');

$user = $_POST['username'];
$token = $_POST['token'];


logout($mysqli, $user, $token);

function logout($mysqli, $user, $token) {
    $response = [];
    $response['auth'] = 0;

    $select = "SELECT * FROM user WHERE Username = :user AND Token = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':user' => $user, ':token' => $token));

    if ($row->rowCount() == 1) {

        $id = $row->fetch()['Id'];

        $select = "UPDATE user SET Token = NULL WHERE Id = :id";
        $row = $mysqli->prepare($select);
        $row->execute(array(':id' => $id));

        $response['error'] = 0;
    } else {
        $response['error'] = 1;
        $response['errorMsg'] = 'No se ha encontrado el usuario';
    }

    echo json_encode($response);
}