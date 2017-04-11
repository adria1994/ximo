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
        $response['auth'] = 1;
        $id = $row->fetch()['Id'];
        $response['id'] = $id;
        $response['username'] = $user;
        $response['token'] = Auth::SignIn([
            'id' => $id,
            'name' => $user
        ]);
    }

    echo json_encode($response);
}