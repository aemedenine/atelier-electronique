<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
$API_KEY = "7b51fa7498mshc0f1433aaed4c9fp1d3febjsn9f377995c660"; // 🔑 حط مفتاح RapidAPI هنا
$endpoint = $_GET['endpoint'] ?? '';
$params   = $_GET['params'] ?? '';

if (!$endpoint) {
    echo json_encode(["error" => "Missing endpoint"]);
    exit;
}

$url = "https://v3.football.api-sports.io/$endpoint?$params";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "x-apisports-key: $apiKey"
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}

curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(["error" => "API error", "code" => $httpCode]);
    exit;
}

echo $response;

