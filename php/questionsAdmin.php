<?php
include_once('connect.php');

switch ($_POST['funcion']){
    case 'loadTable':
        loadTable($mysqli, $_POST['country']);
        break;
    case 'loadThemes':
        loadThemes($mysqli);
        break;
    case 'insertQuestion':
        insertQuestion($mysqli);
        break;
}
function loadTable($mysqli){
    $array = [];
    foreach ($mysqli->query('SELECT Statement,Name from question join theme on question.IdTheme = theme.Id;') as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}

function loadThemes($mysqli){
    $array = [];
    foreach ($mysqli->query('SELECT Id,Name from theme;') as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}
function insertQuestion($mysqli){
    $id = 'default';
    $statement = $_POST["Statement"];
    $a1 = $_POST["Answer1"];
    $a2 = $_POST["Answer2"];
    $a3 = $_POST["Answer3"];
    $a4 = $_POST["Answer4"];
    $correctAnswer = $_POST["CorrectAnswer"];
    $idTheme = $_POST["IdTheme"];
    $result = $mysqli->query("INSERT INTO question VALUES('$id','$statement','$a1','$a2','$a3','$a4','$correctAnswer','$idTheme')");
    $success = ($result == true ? true : false);
    echo $mysqli->error;
     $mysqli = null;
}
