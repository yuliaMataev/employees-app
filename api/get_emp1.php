<?php

require_once "./headers.php";
require_once "./database.php";

setHeaders();

try {
    if (!isset($_GET['id'])) {
        throw new Exception("bad input");
    }

    $id = filter_input(INPUT_GET, 'id', FILTER_UNSAFE_RAW);

    $sql = "SELECT * FROM workers WHERE id=$id";
    $result = selectRecords($sql);

    echo json_encode($result);

} catch (Exception $err) {
    echo json_encode([
        "ok" => false,
        "error" => $err->getMessage()
    ]);
}