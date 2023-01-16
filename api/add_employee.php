<?php

require_once "./headers.php";
require_once "./database.php";

setHeaders();

try {

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("bad request");
    }

    $json = file_get_contents(
        "php://input",
        false,
        stream_context_get_default(),
        0,
        $_SERVER["CONTENT_LENGTH"]
    );

    $data = json_decode($json, true);

    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $address = $data["address"];
    $cityId = $data["cityId"];
    $active = $data["active"];

    if (!isset($firstName) || !isset($lastName) || !isset($address) || !isset($cityId)) {
        throw new Exception("bad input");
    }

    if (empty($firstName) || empty($lastName) || empty($address)) {
        throw new Exception("all fields are required");
    }

    $sql =
        "INSERT INTO employees.workers(`firstName`, `lastName`, `address`, `cityId`, `active`) " .
        "VALUES('$firstName', '$lastName', '$address', $cityId, $active)";

    $result = runQuery($sql);

    echo json_encode([
        "ok" => $result
    ]);

} catch (Exception $err) {
    echo json_encode([
        "ok" => false,
        "error" => $err->getMessage()
    ]);
}