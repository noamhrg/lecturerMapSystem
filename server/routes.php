<?php
$controllers = array("home"=>["getTech", "getLecturers", "getAreas", "techGrades", "deleteLecturer"], "lecturerForm"=>["getFormAreas", "retrieveTechs" ,"lectFormSubmit", "getLecturerDetails" ,"lectEditSubmit"], "user"=>["getUsers","addUser", "deleteUser", "editUser"],"areaAndSkill"=>["getareaAndSkill","addArea","delArea","editArea","addSkill","delSkill","editSkill"]);

if(array_key_exists($controller,$controllers)){ //do we have such controller
    if(in_array($action,$controllers[$controller])){ //do we have such action
        navigate($controller, $action);
    } else {
        navigate($controller,"output");
    }
}

function navigate($controllerName,$action){
    require_once("./Controllers/" . $controllerName . "Controller.php" );
    $controllerName = $controllerName."Controller";
    $controller = new $controllerName();

    $controller->{$action}();
}

?>