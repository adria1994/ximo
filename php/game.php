<?php
include_once('connect.php');
include_once('generateRandom.php');
define('maxQuestionGame',3);

switch (@$_POST['funcion']){
    case 'create':
        $token = $_POST['token'];
        $username = $_POST['username'];
        createGame($mysqli, $username, $token);
        break;
    case 'update';
        $token = $_POST['token'];
        $username = $_POST['username'];
        $idPregunta = $_POST['idPregunta'];
        $answer = $_POST['answer'];
        updateGame($mysqli, $username, $token, $idPregunta, $answer);
        break;
}

function createGame($mysqli, $username, $token) {
    $array = [];
    $array['error'] = 1;
    $array['finish'] = 0;
    $array['errorMessage'] = '';

    $idUser = getUserId($mysqli, $username, $token);
    if ($idUser > 0) {
        $select = "INSERT INTO `game` (`Id`, `Fecha`, `Edad`, `Id_user`) VALUES (DEFAULT, :date, NULL, :idUser)";
        $row = $mysqli->prepare($select);
        $row->execute(array(':date' => date('Y-m-d'), ':idUser' => $idUser));

        if ($row->rowCount() == 1) {
            $idGame = $mysqli->lastInsertId();
            $select = "UPDATE `user` SET `CurrentGame` = :id WHERE Username = :name AND Token = :token";
            $row = $mysqli->prepare($select);
            $row->execute(array(':id' => $idGame, ':name' => $username, ':token' => $token));
            if ($row->rowCount() == 1) {
                $array['error'] = 0;

                $random = getRandomQuestion($mysqli, $idGame)[0];
                $array = array_merge($array, $random);
            }
        }
    } else $array['errorMessage'] = 'Sesion invalida';

    echo json_encode($array);
}

function updateGame($mysqli, $username, $token, $idPregunta, $answer) {
    $array = [];
    $array['error'] = 1;
    $array['finish'] = 0;
    $array['errorMessage'] = '';

    $idUser = getUserId($mysqli, $username, $token);
    $currentGame = getCurrentGame($mysqli, $username, $token);
    if ($idUser > 0) {
        $select = "INSERT INTO `question_game` (`IdQuestion`, `IdGame`, `Response`) VALUES (:question, :game, " . ($answer == "" ? "NULL" : ":response") . ")";
        $row = $mysqli->prepare($select);

        $params = array(':question' => $idPregunta, ':game' => $currentGame);
        if ($answer != "") $params[':response'] = $answer;

        $row->execute($params);

        if ($row->rowCount() == 1) {
            if (finishGame($mysqli, $currentGame) != TRUE) {
                $array['error'] = 0;
                $random = getRandomQuestion($mysqli, $currentGame)[0];
                $array = array_merge($array, $random);
            }  else {
                finish($mysqli, $idUser);
                $game = getAgeOfGame($mysqli, $currentGame);

                $array = array_merge($array, $game);
                $array['error'] = 0;
                $array['finish'] = 1;
            }
        }else $array['errorMessage'] = 'Pregunta invalida';
    } else $array['errorMessage'] = 'Sesion invalida';

    echo json_encode($array);
}

function getRandomQuestion($mysqli, $idGame) {
    $array = [];

    $idAllQuestions = countQuestion($mysqli);
    $randomQuestion = getQuestionGame($mysqli, $idGame);

    if ($randomQuestion != null) {
        $num = getRandoms($idAllQuestions, $randomQuestion);
    } else {
        $num = $idAllQuestions[rand(1,sizeof($idAllQuestions))-1];
    }

    $select = "SELECT * FROM question WHERE Id = :id";
    $row = $mysqli->prepare($select);
    $row->execute(array(':id' => $num));

    while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $array[] = array(
            'IdPregunta' => $num,
            'Statement' => $row2['Statement'],
            'Answer1' => $row2['Answer1'],
            'Answer2' => $row2['Answer2'],
            'Answer3' => $row2['Answer3'],
            'Answer4' => $row2['Answer4'],
        );
    }
    return $array;
}

function countQuestion($mysqli) {
    $array = [];
    $select = "SELECT Id FROM question";
    $row = $mysqli->prepare($select);
    $row->execute();
    if($row->rowCount() > 0) {
        while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
            $array[] = $row2['Id'];
        }
    }
    return $array;
}

function getQuestionGame($mysqli, $id) {
    $array = [];
    $select = "SELECT IdQuestion FROM question_game WHERE IdGame = :id";
    $row = $mysqli->prepare($select);
    $row->execute(array(':id' => $id));
    if($row->rowCount() > 0) {
        while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
            $array[] = $row2['IdQuestion'];
        }
    }
    return $array;
}

function finishGame($mysqli, $id) {
    $select = "SELECT COUNT(*) as cantidad FROM question_game WHERE IdGame = :id";
    $row = $mysqli->prepare($select);
    $row->execute(array(':id' => $id));
    $num = (int)$row->fetch(PDO::FETCH_ASSOC)['cantidad'];
    return ($num >= maxQuestionGame);
}

function getUserId($mysqli, $name, $token) {
    $select = "SELECT * FROM user WHERE Username = :name AND Token = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name, ':token' => $token));
    return $row->rowCount() == 1 ? $row->fetch()['Id'] : -1;
}

function getCurrentGame($mysqli, $name, $token) {
    $select = "SELECT * FROM user WHERE Username = :name AND Token = :token";
    $row = $mysqli->prepare($select);
    $row->execute(array(':name' => $name, ':token' => $token));
    return $row->rowCount() == 1 ? $row->fetch()['CurrentGame'] : -1;
}

function getAgeOfGame($mysqli, $currentGame) {
    $cantidad = 0;

    $select = "SELECT COUNT(*) as cantidad FROM question_game JOIN question " .
        " ON question_game.IdQuestion = question.Id AND question_game.Response = question.CorrectAnswer " .
        " WHERE IdGame = :id";
    $row = $mysqli->prepare($select);
    $row->execute(array(':id' => $currentGame));

    while ($row2 = $row->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $cantidad = (int)$row2['cantidad'];
    }

    $edad = 100 - ($cantidad * 10) + rand(1,9);

    return array('cantidad' => $cantidad, 'edad' => $edad);
}

function finish($mysqli, $idUser) {
    $select = "UPDATE `user` SET `CurrentGame` = null WHERE Id = :id";
    $row = $mysqli->prepare($select);
    $row->execute(array(':id' => $idUser));
}

$mysqli = null;