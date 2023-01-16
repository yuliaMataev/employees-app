<?php

require_once "./headers.php";
require_once "./database.php";

setHeaders();

try {

    if (!isset($_REQUEST['id'])) {
        throw new Exception("bad input");
    }

    $id = filter_input(INPUT_GET, 'id', FILTER_UNSAFE_RAW);

    if (!isset($id) || empty($id)) {
        throw new Exception("bad input");
    }

    $sql = "DELETE FROM workers WHERE `workers`.`id`=$id";
    $result = runQuery($sql);

    echo json_encode([
        "ok" => true
    ]);

} catch (Exception $err) {
    echo json_encode([
        "ok" => false,
        "error" => $err->getMessage()
    ]);
}