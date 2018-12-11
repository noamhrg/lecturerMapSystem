<?php

header('Content-Type: application/json');
require_once(__DIR__."/../Models/lecturerFormModel.php");

class LecturerFormController {

    public $model;
 
    public function __construct() {
         $this->model = new LecturerFormModel();
    }

    public function getFormAreas() {    // Get All Areas In DB
        $data = $this->model->get_form_areas();
        $_SESSION['allAreas'] = $data;
        echo json_encode($data);
    }

    public function lectFormSubmit() {
        $data = $this->model->lect_form_submit($_POST['firstName'], $_POST['lastName'], $_POST['age'], $_POST['email'], $_POST['areas'] ,$_POST['skills']);
        echo json_encode($data);
    }

    public function getLecturerDetails() {
        $data = $this->model->lect_edit_info($_GET['lectId']);
        $_SESSION['editLectId'] = $_GET['lectId'];
        echo json_encode($data);
    }

    public function lectEditSubmit() {
        $data = $this->model->lect_form_edit_submit($_SESSION['editLectId'], $_POST['firstName'], $_POST['lastName'], $_POST['age'], $_POST['email'], $_POST['areas'] ,$_POST['skills']);
        echo json_encode($data);
    }
}

?>