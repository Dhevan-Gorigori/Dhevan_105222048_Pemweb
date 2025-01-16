document.addEventListener("DOMContentLoaded", function () {
    fetch("api/get_events.php")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#scheduleTable tbody");
            data.forEach((event) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${event.name}</td>
                    <td>${event.start_date}</td>
                    <td>${event.end_date}</td>
                    <td>
                        <button onclick="editEvent(${event.id})">Edit</button>
                        <button onclick="deleteEvent(${event.id})">Hapus</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
});

function editEvent(id) {
    window.location.href = `edit_schedule.html?id=${id}`;
}

function deleteEvent(id) {
    fetch(`api/delete_event.php?id=${id}`, { method: "DELETE" })
        .then(() => {
            alert("Jadwal berhasil dihapus");
            window.location.reload();
        });
}
