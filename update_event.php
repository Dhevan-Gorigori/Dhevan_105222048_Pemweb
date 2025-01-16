<?php
include_once('../db/connection.php');

$id = $_POST['event_id'];
$name = $_POST['event_name'];
$start = $_POST['start_date'];
$end = $_POST['end_date'];

$query = "UPDATE events SET name = '$name', start_date = '$start', end_date = '$end' WHERE id = $id";
mysqli_query($conn, $query);

header("Location: ../index.html");
?>
