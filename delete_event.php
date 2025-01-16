<?php
include_once('../db/connection.php');

// Ambil ID jadwal dari URL (parameter GET)
$id = $_GET['id'];

// Pastikan ID valid
if (isset($id) && is_numeric($id)) {
    // Query untuk menghapus data berdasarkan ID
    $query = "DELETE FROM events WHERE id = $id";
    
    if (mysqli_query($conn, $query)) {
        // Redirect ke halaman utama setelah sukses
        header("Location: ../index.html");
    } else {
        // Menampilkan pesan error jika gagal
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "Invalid ID.";
}
?>
