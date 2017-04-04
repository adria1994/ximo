<?php
include_once('connect.php');
include('Auth.php');

$token = $_POST['token'];

checkToken($token);

function checkToken($token) {
    $response = [];

    try {
        if (Auth::Check($token)) {
            $response['auth'] = 1;
            $data = Auth::GetData($token);
            $response['id'] = $data->id;
            $response['token'] = $token;
        }
    } catch (Exception $e) {
        $response['auth'] = 0;
    }

    echo json_encode($response);
}