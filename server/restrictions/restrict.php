<?php
session_start();
header("Content-Type:application/json");

if($_SERVER["REQUEST_METHOD"] == "GET") {
    if(count($_SESSION) > 0 ){
        if(isset($_SESSION["current-user"])){
            echo json_encode("logged in");
        }
        else {
            http_response_code(401);
            echo json_encode("UnAuthorized");  
        }
    } 
    else {
        http_response_code(401);
        echo json_encode("UnAuthorized");
    }
 }

?>