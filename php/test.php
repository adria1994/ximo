<?php
include('Auth.php');

/*$token = Auth::SignIn([
    'id' => 1,
    'name' => 'Eduardo'
echo $token;
]);*/
$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTE0OTkyMTcsImF1ZCI6ImY0MzMxMGEzMjM4ZjM3MTk1ZGRjNTFjN2U0OTdhNDRmMjVlOTI4NTgiLCJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRWR1YXJkbyJ9fQ.joWbEh5l6-uVE2-CU4UGOsdNgXyEVVSe09ILpOTPEDA';

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