<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");

require_once("../config/database.php");

$host = "localhost";
$user = "el0uu";
$password = "PHP_Beit456!:;";
$database = "vintage_watches";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Erreur de connexion : " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");