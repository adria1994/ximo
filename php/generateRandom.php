<?php
function getRandoms($length, $array) {
    do {
        $rand = rand(1, $length);
    } while (in_array($rand, $array));
    return $rand;
}