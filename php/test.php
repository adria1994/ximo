<?php
include('Auth.php');

$token = Auth::SignIn([
    'id' => 1,
    'name' => 'Eduardo'
]);
echo $token;

echo "<br>";
echo "<br>";

try {
    if (Auth::Check($token)) {
        echo "gg";
    }
} catch (Exception $e) {
    echo "Token invalido";
}

echo "<br>";
echo "<br>";

try {
    var_dump(Auth::getData($token));
} catch (Exception $e) {
    echo "Token invalido";
}