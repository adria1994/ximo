<?php
$servername = "localhost";
$username = "root";
$password = "root";
$db = 'practicasM6';
$mysqli = null;

try {
    $mysqli = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
    $mysqli->exec("set names utf8");
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
