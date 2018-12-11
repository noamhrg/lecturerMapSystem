<?php

require_once(__DIR__."/model.php");

class HomeModel extends Model {

    public function get_tech() {
        $data = $this->dbc->Select("SELECT * FROM lecturerMap.list JOIN list_values ON list.id = list_values.list_id WHERE listname != 'Areas' ;");
        return $data;
    }

    public function get_lecturers(){
        $data = $this->dbc->Select("SELECT id, firstName, lastName, age, email FROM lecturers WHERE delete_date IS NULL ORDER BY id ASC ");
        return $data;
    }

    public function get_areas() {
        $data = $this->dbc->Select("SELECT lecturers.id AS lectId , lecturers.firstName, lecturers.lastName , list_values.value, lecturer_area.area_id
        FROM list_values 
        JOIN lecturer_area ON lecturer_area.area_id = list_values.id
        JOIN lecturers ON lecturers.id = lecturer_area.lecturer_id
        WHERE list_id = 1
        ORDER BY lecturers.id ASC;");
        return $data;
    }

    public function get_tech_grades() {
        $data = $this->dbc->Select("SELECT list_values.id , list_values.value, lecturer_tech.lecturer_id , lecturer_tech.grade , lecturer_tech.comment
        FROM list_values 
        JOIN lecturer_tech ON lecturer_tech.tech_id = list_values.id
        ORDER BY lecturer_id ASC;");
        return $data;
    }

    public function del_lecturer($id){ ///neded to be fixt to posttt

        $q = "UPDATE lecturermap.lecturers 
        SET delete_date = CURRENT_TIMESTAMP where id = '$id' ";
         $data = $this->dbc->Prepare($q);
         $data->execute();
    }
    
}


?>