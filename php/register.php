<?php
include_once('connect.php');

switch ($_POST['function']){
    case 'getCity':
        getCity();
        break;
    case 'getCountry';

}

function getCity(){
    $sql = 'SELECT city.Name from city join country on CountryCode = country.Code';
    foreach ($this->conn->query($sql) as $row) {
        print $row['name'] . "\t";
    }
}

