<?php
function getRandoms($length, $array) {
    do {
        $rand = rand(1, $length);
    } while (in_array($rand, $array));
    return $rand;
}
var_dump(getRandoms(10, [1,2,3,4,5,6,7]));