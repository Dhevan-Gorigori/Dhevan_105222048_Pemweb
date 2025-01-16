<?php
include_once('../db/connection.php');
$id = $_GET['id'];
$query = "SELECT * FROM events WHERE id = $id";
$result = mysqli_query($conn, $query);
$data = mysqli_fetch_assoc($result);

if ($data) {
    echo json_encode($data);
} else {
    echo json_encode(null);
}
?>
