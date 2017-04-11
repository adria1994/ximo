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
    case 'deleteQuestion':
        deleteQuestion($mysqli);
        break;
    case 'loadQuestion':
        loadQuestion($mysqli);
}
function loadQuestion($mysqli){
    $id = $_POST['Id'];
    $array = [];
    foreach ($mysqli->query('SELECT * from question where Id ='. $id) as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}
function loadTable($mysqli){
    $array = [];
    foreach ($mysqli->query('SELECT question.Id,Name,Statement from question join theme on question.IdTheme = theme.Id;') as $row) array_push($array, $row);
    $mysqli = null;
    echo json_encode($array);
}
function deleteQuestion($mysqli){
    $id = $_POST['Id'];
    try {
        $sql = "DELETE FROM question WHERE id = $id";
        $query = $mysqli->prepare($sql);
        var_dump($query);
        if($query->execute()){
            echo true;
        }else{
            echo false;
        }

    } catch (Exception $e) {
        echo $e->getMessage();
    }
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
    try {
        $sql = "INSERT INTO question VALUES($id,'$statement','$a1','$a2','$a3','$a4','$correctAnswer',$idTheme)";
        $query = $mysqli->prepare($sql);
        var_dump($query);
        if($query->execute()){
            echo true;
        }else{
            echo false;
        }

    } catch (Exception $e) {
        echo $e->getMessage();
    }


}
