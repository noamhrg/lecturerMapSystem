<?php
header('Content-Type: application/json');
require_once(__DIR__."/../Models/areaAndSkillModel.php");

class areaAndSkillController {

    public $model;
 
    public function __construct() {
         $this->model = new areaAndSkillModel();
    }

    public function getareaAndSkill() {    // get all areasandsills getareaAndSkill
        $data = $this->model->get_areaAndSkill();
        echo json_encode($data);
    }

    public function addArea() {    // add area
        $data = $this->model->add_area();
        echo json_encode($data);
    }

    public function delArea() {    // del area
        $data = $this->model->del_area();
        echo json_encode($data);
    }

    public function editArea() {    // edit area
        $data = $this->model->edit_area();
        echo json_encode($data);
    }

    public function addSkill() {    // add skill
        $data = $this->model->add_skill();
        echo json_encode($data);
    }
    public function delSkill() {    // del skill
        $data = $this->model->del_skill();
        echo json_encode($data);
    }
    public function editSkill() {    // edit skill
        $data = $this->model->edit_skill();
        echo json_encode($data);
    }
    
    
    
    
}

?>