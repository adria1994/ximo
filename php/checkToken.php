<?php
include_once('connect.php');
//include('Auth.php');

$name = $_POST['username'];
$token = $_POST['token'];

checkToken($mysqli, $name, $token);

function checkToken($mysqli, $name, $token) {
    $response = [];

    $select = "SELECT * FROM `user` WHERE `Username` = :name AND `Token` = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name, ':token' => $token));

    $data = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT);

    if ($row->rowCount() == 1) {
        $response['auth'] = 1;
        $response['id'] = $data['Id'];
        $response['token'] = $data['Token'];
        $response["rol"] = $data["Rol"];
    } else {
        $response['auth'] = 0;
    }

    echo json_encode($response);
}
