<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$endpoint = $_GET['endpoint'] ?? '';
$params   = $_GET['params'] ?? '';

$API_KEY = "7b51fa7498mshc0f1433aaed4c9fp1d3febjsn9f377995c660"; // 🔑 حط مفتاح RapidAPI هنا

$url = "https://api-football-v1.p.rapidapi.com/v3/$endpoint?$params";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-RapidAPI-Key: $API_KEY",
        "X-RapidAPI-Host: api-football-v1.p.rapidapi.com"
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
