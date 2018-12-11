<?php
header('Content-Type: application/json');
require_once(__DIR__."/../Models/userModel.php");

class userController {

    public $model;
 
    public function __construct() {
         $this->model = new userModel();
    }

    public function getUsers() {    // get all users
        $data = $this->model->get_users();
        echo json_encode($data);
    }
    public function addUser() {    // add  user
        $data = $this->model->add_user();
        echo json_encode($data);
    }

    public function deleteUser() {    // del  user
        $data = $this->model->delete_user();
        echo json_encode($data);
    }
    public function editUser() {    // del  user
        $data = $this->model->edit_user();
        echo json_encode($data);
    }
    
}

?>