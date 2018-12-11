<?php

require_once(__DIR__."/model.php");

class areaAndSkillModel extends Model {


    public function get_areaAndSkill() {
        $data = $this->dbc->Select("SELECT * FROM lecturerMap.list_values ORDER BY value");
        return $data;
    }

   

    public function  add_area(){
      
        if(isset($_POST["Area"])){
            $a=1;
        
            if($_SESSION["role"]=="admin"){
            $q = "INSERT INTO lecturerMap.list_values (list_id, value) VALUES (? , ?)";
            $stmt =  $this->dbc->Prepare($q);
            $stmt->bind_param("is",$a,$_POST["Area"]); 
            $stmt->execute();
            return $stmt->insert_id;
            }
        }
        
    }

    

    public function  del_area(){



        if(isset($_POST["areaId"])){
        
            if($_SESSION["role"]=="admin"){
                $areaId = $_POST["areaId"];
                $q = "DELETE FROM lecturerMap.list_values
                WHERE id = $areaId";
                $data = $this->dbc->Prepare($q);
                $data->execute();
                return $data;

            }
        }
    }

    public function  edit_area(){



        if(isset($_POST["editareaId"])&&isset($_POST["editedArea"])){
        
            if($_SESSION["role"]=="admin"){
                $editareaId = $_POST["editareaId"];
                $editedArea= $_POST["editedArea"];
                $q ="UPDATE list_values SET value = '$editedArea' WHERE id = $editareaId ";
                $stmt = $this->dbc->Prepare($q);
                $stmt->execute();
                return $stmt;
            }
            
        }
        


    }

    public function  add_skill(){
      
        if(isset($_POST["Skill"])){
            $a=2;
        
            if($_SESSION["role"]=="admin"){
            $q = "INSERT INTO lecturerMap.list_values (list_id, value) VALUES (? , ?)";
            $stmt =  $this->dbc->Prepare($q);
            $stmt->bind_param("is",$a,$_POST["Skill"]); 
            $stmt->execute();
            return $stmt->insert_id;
            }
        }
        
    }
    public function   del_skill(){



        if(isset($_POST["skillId"])){
        
            if($_SESSION["role"]=="admin"){
                $skillId = $_POST["skillId"];
                $q = "DELETE FROM lecturerMap.list_values
                WHERE id = $skillId";
                $data = $this->dbc->Prepare($q);
                $data->execute();
                return $data;

            }
        }
    }

    public function  edit_skill(){



        if(isset($_POST["editedSkillId"])&&isset($_POST["editedSkill"])){
        
            if($_SESSION["role"]=="admin"){
                $editedSkillId = $_POST["editedSkillId"];
                $editedSkill= $_POST["editedSkill"];
                $q ="UPDATE list_values SET value = '$editedSkill' WHERE id = $editedSkillId ";
                $stmt = $this->dbc->Prepare($q);
                $stmt->execute();
                return $stmt;
            }
            
        }
        


    }
    
   



   
    
}


