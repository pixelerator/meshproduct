<?php

require_once "../vendor/autoload.php";
require_once "../lib/functions.php";
$params = json_decode(file_get_contents('php://input'),true);
print_r($params); die;
$db = new MysqliDb ('localhost', 'root', '', 'meshproduct');
$v = new Valitron\Validator($params);
$v->rule('required', ['productName', 'productDescription']);
$v->rule('lengthBetween',["productName"],4,10);
$v->rule('lengthBetween',["productDescription"],20,100);
$error = 0;
$errorsDescription = [];
$data = [];
if($v->validate()) {
    $id = $db->insert ('products', $params);
    if($id){

        $data = array(
            "id"=>$id
        );
    }else{
        $error = 1;
        $errorsDescription[]["databaseError"]  = "Please Contact website Owner/Database Connectivity Problem";

    }

} else {
    // Errors
    $error = 1;
    $errorsDescription = $v->errors();
}
header('Content-Type: application/json');
echo json_encode(array("status"=>$error,"errorData" =>$errorsDescription,"data"=>$data));

?>