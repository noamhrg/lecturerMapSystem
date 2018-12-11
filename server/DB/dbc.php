<?php

class DatabaseConnection{

    private $connection;
    private static $db_instance;
    private $isConnected = false;

    private $dbServer = "localhost"; 
    private $userName = "root";
    private $password = "root";
    private $dbName = "lecturerMap";

    private function __construct(){
        $this->connection = new mysqli($this->dbServer, $this->userName, $this->password, $this->dbName);

        if($this->connection->connect_errno){
            //the db connection has exception
            //connect_errno = number that represents the issue
        }
        else{
            $this->isConnected =true;
        }

    }

    public static function getSingleTonInstance(){
        if(!DatabaseConnection::$db_instance){
            DatabaseConnection::$db_instance = new DatabaseConnection();
        }
        return DatabaseConnection::$db_instance;
    }

    public function Select($q, $class = "stdClass" , $array ="index"){
        $result = $this->connection->query($q);
       
        if($result->num_rows == 0){
            return [];
        }
        if($array  == "assoc"){ //array indexed with object id
            while($row = $result->fetch_object($class)){
                $arr[$row->id] = $row;
            }
        }
        else{ //array indexed default AI
            while($row = $result->fetch_object($class)){
                $arr[] = $row;
            }

            
        }
        return $arr;    
    }

    public function Insert($q){
        $this->connection->query($q);
        return $this->connection->insert_id;
    }

    public function Prepare($q){
        return $this->connection->prepare($q);
    }
    // public function Delete($q){
    //     $this->connection->query($q);
    //     return $this->connection->affected_rows;
    // }
}

?>