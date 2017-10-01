<?php
require_once "../vendor/autoload.php";
$db = new MysqliDb ('localhost', 'root', '', 'meshproduct');
$products = $db->get('products'); //contains an Array of all products
header('Content-Type: application/json');
echo json_encode($products);
?>