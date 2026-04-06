<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Content-Type: application/json; charset=UTF-8");

require_once("../config/database.php");

$sql = "SELECT * FROM watches ORDER BY brand ASC, model ASC";
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur lors de la récupération des montres."
    ]);
    exit;
}

$watches = [];

while ($row = mysqli_fetch_assoc($result)) {
    $watches[] = $row;
}

echo json_encode($watches, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);