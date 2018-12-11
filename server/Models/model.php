<?php
require_once(__DIR__."/../DB/dbc.php");

class Model {

    public $dbc;

    public function __construct(){
        $this->dbc = DatabaseConnection::getSingleTonInstance();
    }
}

?>