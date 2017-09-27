<?php
$params = json_decode(file_get_contents('php://input'),true);


echo "<pre>";
    print_r($params);
    echo "</pre>";
?>