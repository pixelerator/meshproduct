<?php

require_once "../vendor/autoload.php";
require_once "../lib/functions.php";
$params = json_decode(file_get_contents('php://input'),true);
//print_r($params); die;
$db = new MysqliDb ('localhost', 'root', '', 'meshproduct');
$v = new Valitron\Validator($params);
$v->rule('required', ['productName', 'productDescription']);
$v->rule('lengthBetween',["productName"],2,100);
$v->rule('lengthBetween',["productDescription"],4,100);
$error = 0;
$errorsDescription = [];
$data = [];
if($v->validate()) {
    if(isset($params["productId"])){
          if(is_numeric($params["productId"])){
              $db->where ('id', $params["productId"]);
              $temp = $params;
              unset($temp["productId"]);
              $db->update ('products', $temp);
               $data = array(
                   "id"=> $params["productId"]
               );

          }else{
              $id = $db->insert ('products', $params);
              $data = array(
                  "id"=>$id
              );
          }
    }else{
        $id = $db->insert ('products', $params);
        $data = array(
            "id"=>$id
        );
    }

   /* if($id){

        $data = array(
            "id"=>$id
        );
    }else{
        $error = 1;
        $errorsDescription[]["databaseError"]  = "Please Contact website Owner/Database Connectivity Problem";

    } */

} else {
    // Errors
    $error = 1;
    $errorsDescription = $v->errors();
}
header('Content-Type: application/json');
echo json_encode(array("status"=>$error,"errorData" =>$errorsDescription,"data"=>$data));

?>