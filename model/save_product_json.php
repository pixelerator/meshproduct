<?php

require_once "../vendor/autoload.php";
$params = json_decode(file_get_contents('php://input'),true);

$db = new MysqliDb ('localhost', 'root', '', 'meshproduct');

echo "<pre>";
    print_r($params);
    echo "</pre>";
?>