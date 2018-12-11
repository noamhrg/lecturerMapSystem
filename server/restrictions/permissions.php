
<?php
header("Content-Type:application/json");
session_start();

if($_SERVER["REQUEST_METHOD"] == "GET") {
    if(isset($_SESSION["current-user"])) {
        if(isset($_SESSION["role"])) {
            
            if ($_SESSION["role"]== "admin"){    // for admin buttons 
                echo json_encode($_SESSION['role']);

                
            }
            else{ http_response_code(401);}

        }
    }
    else {
        http_response_code(401);
    } 
 }
 else {
    http_response_code(401);
 }


?>