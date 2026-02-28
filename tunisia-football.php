<?php
header("Content-Type: application/json; charset=utf-8");

function getHTML($url){
    $opts = [
        "http" => [
            "method" => "GET",
            "header" => "User-Agent: Mozilla/5.0\r\n"
        ]
    ];
    return @file_get_contents($url,false,stream_context_create($opts));
}

$data = [
    "standings" => [],
    "matches" => []
];

// ====== ترتيب الدوري ======
$html = getHTML("https://diwansport.com/competition/ligue-1/");

if($html && preg_match_all('/<td class="club-name">(.+?)<\/td>.*?<td class="points">(\d+)/s',$html,$m)){
    foreach($m[1] as $i=>$team){
        if($i >= 16) break;
        $data["standings"][] = [
            "rank" => $i+1,
            "team" => trim(strip_tags($team)),
            "points" => $m[2][$i]
        ];
    }
}

// ====== مباريات اليوم ======
$html2 = getHTML("https://diwansport.com/direct/");

if($html2 && preg_match_all('/team1">(.+?)<.*?team2">(.+?)</s',$html2,$m2)){
    foreach($m2[1] as $i=>$home){
        $data["matches"][] = [
            "home" => trim(strip_tags($home)),
            "away" => trim(strip_tags($m2[2][$i]))
        ];
    }
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
