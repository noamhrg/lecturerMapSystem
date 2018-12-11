<?php
header("Content-Type:application/json");
require_once("../DB/dbc.php");

$dbConnection = DatabaseConnection::getSingleTonInstance();

if($_SERVER["REQUEST_METHOD"] == "GET") {
   session_start();
   if(isset($_SESSION["current-user"])) {
    echo json_encode($_SESSION["current-user"]);
   }
   else {
    http_response_code(401);
    echo "Unauthorized";
   } 
}

else {
    if(isset($_POST["email"]) && isset($_POST["password"])) {
        $userEmail = $_POST["email"];
        $password = hash("sha256", $_POST["password"]);
        $q  = "SELECT * FROM users WHERE email = '$userEmail' AND password = '$password'";
        $res = $dbConnection->Select($q);

        if(count($res) > 0 ){
            session_start();
            unset($res[0]->password);
            unset($res[0]->id);
            unset($res[0]->date_created);
            unset($res[0]->email);
            $loggedInUser = $res[0];
            $_SESSION["current-user"] = $loggedInUser;
            $_SESSION["role"] = $loggedInUser->role;
            unset($loggedInUser->role);
            echo json_encode($loggedInUser); // return logged in user to success
        }
        else {
            http_response_code(404);
            echo "User Not Found";
        }
    }
}

?>