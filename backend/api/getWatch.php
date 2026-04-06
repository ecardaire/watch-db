<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once("../config/database.php");

if (!isset($_GET["id"]) || empty($_GET["id"])) {
    http_response_code(400);
    echo json_encode([
        "error" => "ID manquant."
    ]);
    exit;
}

$id = (int) $_GET["id"];

$sql = "SELECT * FROM watches WHERE id = $id";
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur lors de la récupération de la montre."
    ]);
    exit;
}

$watch = mysqli_fetch_assoc($result);

if (!$watch) {
    http_response_code(404);
    echo json_encode([
        "error" => "Montre introuvable."
    ]);
    exit;
}

echo json_encode($watch, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);