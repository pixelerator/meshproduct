<?php
$productId = $_GET["productId"];
require_once "../vendor/autoload.php";
$db = new MysqliDb ('localhost', 'root', '', 'meshproduct');
$db->where("id",$_GET["productId"]);
$db->get("products");
if($db->count>0){
    header('Content-Type: application/json');
    $db->where("id",$_GET["productId"]);
    $data = $db->getOne("products");
    echo json_encode(array("status"=>1,"data"=>$data));
}else{
    header('Content-Type: application/json');
    echo json_encode(array("status"=>0,'data'=>array()));
}
?>