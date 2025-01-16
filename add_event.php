<?php
include_once('../db/connection.php');
$name = $_POST['event_name'];
$start = $_POST['start_date'];
$end = $_POST['end_date'];
$query = "INSERT INTO events (name, start_date, end_date) VALUES ('$name', '$start', '$end')";
mysqli_query($conn, $query);
header("Location: ../index.html");
?>
