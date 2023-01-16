<?php

require_once "./headers.php";
require_once "./database.php";

setHeaders();

try {
    $sql = "SELECT * FROM cities";
    $result = selectRecords($sql);

    echo json_encode($result);

} catch (Exception $err) {
    echo json_encode([
        "ok" => false,
        "error" => $err->getMessage()
    ]);
}