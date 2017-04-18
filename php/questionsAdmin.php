<?php
include_once('connect.php');

switch ($_POST['funcion']){
    case 'loadTable':
        loadTable($mysqli);
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
        break;
    case 'updateQuestion';
        updateQuestion($mysqli);
        break;
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
        if($query->execute()){
            echo ·hola;
        }else{
            echo false;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
function loadThemes($mysqli){
    $array = [];
    $select = "SELECT Id, Name from theme;";
    $row = $mysqli->prepare($select);
    $row->execute();
    while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) array_push($array, $row2);
    echo json_encode($array);
}
function insertQuestion($mysqli){
    $statement = $_POST["Statement"];
    $a1 = $_POST["Answer1"];
    $a2 = $_POST["Answer2"];
    $a3 = $_POST["Answer3"];
    $a4 = $_POST["Answer4"];
    $correctAnswer = $_POST["CorrectAnswer"];
    $idTheme = $_POST["IdTheme"];

    $select = "INSERT INTO question VALUES(DEFAULT, :statement, :a1, :a2, :a3, :a4, :correctAnswer, :idTheme)";
    $row = $mysqli->prepare($select);
    $row->execute(
        array(
            ':statement' => $statement,
            ':a1' => $a1,
            ':a2' => $a2,
            ':a3' => $a3,
            ':a4' => $a4,
            ':correctAnswer' => $correctAnswer,
            ':idTheme' => $idTheme
        )
    );

    if($row->rowCount() == 1){
        echo 1;
    }else{
        echo 0;
    }
}
function updateQuestion($mysqli){
    $QuestionId = $_POST['QuestionId'];
    $Statement = $_POST['Statement'];
    $Answer1 = $_POST['Answer1'];
    $Answer2 = $_POST['Answer2'];
    $Answer3 = $_POST['Answer3'];
    $Answer4 = $_POST['Answer4'];
    $CorrectAnswer = $_POST['CorrectAnswer'];
    $IdTheme= $_POST['IdTheme'];
    try{
        $update = "UPDATE question SET Statement = '$Statement', Answer1 = '$Answer1', Answer2 = '$Answer2',Answer3 = '$Answer3',Answer4 = '$Answer4',CorrectAnswer = $CorrectAnswer, IdTheme = $IdTheme WHERE id = $QuestionId";
        $query = $mysqli->prepare($update);
        $query->execute();
        if($query->rowCount() == 1){
            echo false;
        }else{
            echo true;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

}
$mysqli = null;