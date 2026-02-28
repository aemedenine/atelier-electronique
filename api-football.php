<?php
// api-football.php
header('Content-Type: application/json');

// هنا تحط مفتاحك و host من RapidAPI
$apiKey = '7b51fa7498mshc0f1433aaed4c9fp1d3febjsn9f377995c660';
$host   = 'v3.football.api-sports.io';

// Endpoint من URL: ?endpoint=standings أو fixtures&params=...
$endpoint = $_GET['endpoint'] ?? '';
$params   = $_GET['params'] ?? '';

$url = "https://$host/$endpoint?$params";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-RapidAPI-Key: $apiKey",
    "X-RapidAPI-Host: $host"
]);

$response = curl_exec($ch);
if(curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}

curl_close($ch);
echo $response;
