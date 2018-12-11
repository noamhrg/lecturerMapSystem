<?php
require_once(__DIR__."/model.php");

class LecturerFormModel extends Model {
    
    public function get_form_areas(){
        $data = $this->dbc->Select("SELECT * FROM lecturerMap.list_values WHERE list_id = 1;");
        return $data;
    }

    public function lect_form_submit($_fName, $_lName, $_age, $_email, $_areas, $_skills){
        $q1 = "INSERT INTO lecturers (firstName, lastName ,age, email) VALUES (? , ? , ? , ?)";
        $stmt = $this->dbc->Prepare($q1);
        $stmt->bind_param("ssis",$_fName, $_lName ,$_age, $_email);
        $stmt->execute();

        if($stmt->insert_id != 0) {
            $newLectId = $stmt->insert_id;
            foreach ($_areas as $index => $areaId) {
                $q2 = "INSERT INTO lecturer_area (lecturer_id, area_id) VALUES (? , ?)";
                $stmt = $this->dbc->Prepare($q2);
                $stmt->bind_param("ii", $newLectId, $areaId);
                $stmt->execute();
            }
            if($stmt->insert_id != 0) {
               foreach ($_skills as $index => $skill) {
                $q3 = "INSERT INTO lecturer_tech (lecturer_id, tech_id, grade) VALUES (? , ? , ?)";
                $stmt = $this->dbc->Prepare($q3);
                $stmt->bind_param("iii", $newLectId, $skill['skillId'], $skill['skillGrade']);
                $stmt->execute();
               } 
               return $stmt->insert_id;
            }
        }
    }

    public function lect_edit_info($_id) {
        $lecturerInfo = array();
        $data = $this->dbc->Select("SELECT firstName, lastName, age, email FROM lecturerMap.lecturers where id = $_id;");
        $lecturerInfo["lectInfo"] = $data;
        $data2 = $this->dbc->Select("SELECT * FROM lecturerMap.lecturer_area where lecturer_id = $_id;");
        $lecturerInfo["lectAreas"] = $data2;
        $data3 = $this->dbc->Select("SELECT * FROM lecturerMap.lecturer_tech WHERE lecturer_id = $_id;");
        $lecturerInfo["lectSkills"] = $data3;
        return $lecturerInfo;
    }

    
    public function lect_form_edit_submit($lecId, $_fName, $_lName, $_age, $_email, $_areas, $_skills) {    // I AM HERE
        $updateInfoQuery = "UPDATE lecturers SET firstName = '$_fName' , lastName = '$_lName', age = '$_age', email = '$_email' 
        WHERE id = $lecId ;";
        $stmt = $this->dbc->Prepare($updateInfoQuery);
        $stmt->execute();

        $deleteAreasQuery = "DELETE FROM lecturerMap.lecturer_area 
        WHERE lecturer_id = $lecId;";
        $data = $this->dbc->Prepare($deleteAreasQuery);
        $data->execute();
        foreach ($_areas as $index => $areaId) {
            $insertAreasQuery = "INSERT INTO lecturer_area (lecturer_id, area_id) VALUES (? , ?)";
            $stmt = $this->dbc->Prepare($insertAreasQuery);
            $stmt->bind_param("ii", $lecId, $areaId);
            $stmt->execute();
        }

        if($stmt->insert_id != 0) {
            $deleteSkillsQuery = "DELETE FROM lecturer_tech
            WHERE lecturer_id = $lecId;";
            $data = $this->dbc->Prepare($deleteSkillsQuery);
            $data->execute();

            foreach ($_skills as $index => $skill) {
                $q3 = "INSERT INTO lecturer_tech (lecturer_id, tech_id, grade) VALUES (? , ? , ?)";
                $stmt = $this->dbc->Prepare($q3);
                $stmt->bind_param("iii", $lecId, $skill['skillId'], $skill['skillGrade']);
                $stmt->execute();
            } 

        }
    }
}

?>