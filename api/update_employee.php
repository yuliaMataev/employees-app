<?php

require_once "./headers.php";
require_once "./database.php";

setHeaders();

try {

    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
        throw new Exception("bad request");
    }

    if (!isset($_REQUEST['id'])) {
        throw new Exception("bad input");
    }

    $id = filter_input(INPUT_GET, 'id', FILTER_UNSAFE_RAW);

    if (!isset($id) || empty($id)) {
        throw new Exception("bad input");
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
        "UPDATE `workers` SET `firstName`='$firstName', `lastName`='$lastName', `address`='$address', `cityId`='$cityId', `active`='$active' WHERE id=$id";

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