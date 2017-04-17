<?php
include_once('connect.php');
include('Auth.php');

$user = $_POST['user'];
$password = $_POST['pass'];


login($mysqli, $user, $password);

function login($mysqli, $user, $pass) {
    $response = [];
    $response['auth'] = 0;

    $select = "SELECT * FROM user WHERE Username = :user AND Password = :pass";
    $row = $mysqli->prepare($select);
    $row->execute(array(':user' => $user, ':pass' => $pass));

    if ($row->rowCount() == 1) {

        $id = $row->fetch()['Id'];
        $token = Auth::SignIn([
            'id' => $id,
            'name' => $user
        ]);

        $select = "UPDATE user SET Token = :token WHERE Id = :id";
        $row = $mysqli->prepare($select);
        $row->execute(array(':token' => $token, ':id' => $id));

        $response['auth'] = 1;
        $response['id'] = $id;
        $response['username'] = $user;
        $response['token'] = $token;
    }

    echo json_encode($response);
}