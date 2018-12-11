<?php

session_start();

unset($_SESSION["current-user"]);
session_unset();

session_destroy();

?>