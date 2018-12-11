<?php
require_once(__DIR__."/model.php");

class userModel extends Model {
    
    public function get_users(){
        if($_SESSION["role"]=="admin"){
            $data = $this->dbc->Select("SELECT * FROM lecturerMap.users ORDER BY date_deleted ASC ");
            return $data;
        }
    }

    public function add_user(){
      
        if(isset($_POST["UFname"])  && isset($_POST["ULname"]) && isset($_POST["Uemail"]) &&isset($_POST["Upassword"]) && isset($_POST["Urole"])){
            if($_POST["Urole"]=="hr" ||$_POST["Urole"]=="manager" ){
                if($_SESSION["role"]=="admin"){
                    $Upassword = hash("sha256", $_POST["Upassword"]);
                $q = "INSERT INTO lecturerMap.users (first_name, last_name, email, password, role ) VALUES (? , ? , ?, ?, ?)";
                $stmt =  $this->dbc->Prepare($q);
                $stmt->bind_param("sssss",$_POST["UFname"],$_POST["ULname"],$_POST["Uemail"],$Upassword,$_POST["Urole"]);
                $stmt->execute();
                return $stmt->insert_id;
                }
            }
        }
    }

    public function delete_user(){
        if(isset($_POST["Uid"])){
            if($_SESSION["role"]=="admin"){
                $id= $_POST["Uid"];
                $q= "UPDATE lecturermap.users SET date_deleted= CURRENT_TIMESTAMP where id= '$id' ";
                $data= $this->dbc->Prepare($q);
                $data->execute();
                return $data;
            }

        }

    }
    
    public function edit_user(){
        if(isset($_POST["Upassword"]) &&$_POST["Upassword"] !=null && $_POST["Upassword"]!=""){
            if(isset($_POST["UFname"])  && isset($_POST["ULname"]) && isset($_POST["Uemail"]) && isset($_POST["Urole"])){
                if($_POST["Urole"]=="hr" ||$_POST["Urole"]=="manager" ){
                    if($_SESSION["role"]=="admin"){
                        $id= $_POST["Uid"];
                        $name=$_POST["UFname"];
                        $lastName=$_POST["ULname"];
                        $email=$_POST["Uemail"];
                        $role=$_POST["Urole"];
                        $Upassword = hash("sha256", $_POST["Upassword"]);
                        $q= "UPDATE lecturermap.users SET first_name = '$name', last_name = '$lastName', email= '$email', password= '$Upassword', role = '$role'  where id=  '$id' ";
                        $data= $this->dbc->Prepare($q);
                        $data->execute();
                        return $data;
                    }
     
                }
               
            }

        }else{
            if(isset($_POST["UFname"])  && isset($_POST["ULname"]) && isset($_POST["Uemail"]) && isset($_POST["Urole"])){
                if($_POST["Urole"]=="hr" ||$_POST["Urole"]=="manager" ){
                    if($_SESSION["role"]=="admin"){
                        $id= $_POST["Uid"];
                        $name=$_POST["UFname"];
                        $lastName=$_POST["ULname"];
                        $email=$_POST["Uemail"];
                        $role=$_POST["Urole"];
                        $q= "UPDATE lecturermap.users SET first_name = '$name', last_name = '$lastName', email= '$email', role = '$role'  where id=  '$id' ";
                        $data= $this->dbc->Prepare($q);
                        $data->execute();
                        return $data;
                    }
                }

            }

        }

    }    

}


?>