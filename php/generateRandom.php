<?php
function getRandoms($arrayAll, $arrayGet) {
    $length = sizeof($arrayAll);
    do {
        $rand = rand(1, $length);
    } while (in_array($arrayAll[$rand-1], $arrayGet));
    return $arrayAll[$rand-1];
}