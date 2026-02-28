<?php
header('Content-Type: application/json');

$apiKey = '7b51fa7498mshc0f1433aaed4c9fp1d3febjsn9f377995c660';
$host   = 'sofascore.p.rapidapi.com';

// endpoint: ?tournamentId=17&seasonId=29415&pageIndex=0
$tournamentId = $_GET['tournamentId'] ?? 17;
$seasonId     = $_GET['seasonId'] ?? 29415;
$pageIndex    = $_GET['pageIndex'] ?? 0;

$url = "https://$host/tournaments/get-next-matches?tournamentId=$tournamentId&seasonId=$seasonId&pageIndex=$pageIndex";

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
