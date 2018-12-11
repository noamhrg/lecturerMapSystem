<?php
header('Content-Type: application/json');
require_once(__DIR__."/../Models/homeModel.php");

class HomeController {

    public $model;
 
    public function __construct() {
         $this->model = new HomeModel();
    }

    public function getTech() {     // Get All Technologies From DB
        $data = $this->model->get_tech();
        $_SESSION['techs'] = $data;
        echo json_encode($data);
    }

    public function getLecturers() {    // Get All Lecturers From DB
        $data = $this->model->get_lecturers();
        $_SESSION['lecturers'] = $data;
        echo json_encode($data);
    }

    public function getAreas() {    // // Get All Lecturers' Areas From DB
        $data = $this->model->get_areas();
        echo json_encode($data);
    }

    public function techGrades() {  // Get All Lecturers' Technolgies' Grades From DB
        $data = $this->model->get_tech_grades();
        $_SESSION['grades'] = $data;
        echo json_encode($data);
    }



    public function deleteLecturer() {  // delete lecturer
        $id=$_POST["id"];
        $data = $this->model->del_lecturer($id);
        echo json_encode("inside deleteLecturer");
    }



}


?>