<?php
include_once('connect.php');
getProfile($_POST['username'],$_POST['token'],$mysqli);
function getProfile($name,$token,$mysqli){
    $response = [];
    $array = [];
    $select = "SELECT Id FROM `user` WHERE `Username` = :name AND `Token` = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name, ':token' => $token));

    $data = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT);


    if ($row->rowCount() == 1) {
        $response['auth'] = 1;
        $response['id'] = $data['Id'];
        $response['token'] = $data['Token'];
        $response["rol"] = $data["Rol"];

        $select = "SELECT Id, Fecha, Edad, Id_user FROM game where Id_user = :id";
        $row = $mysqli->prepare($select);
        $row->execute(array(":id" => $response['id']));

        while ($query = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

            array_push($array, $query);
        }


    } else {
        $response['auth'] = 0;
    }

    echo json_encode($array);
}