document.addEventListener("DOMContentLoaded", function () {
    // Buat kalender pada halaman
    createCalendar();

    // Ambil jadwal dari API dan tampilkan di kalender
    fetchEvents();
});

// Fungsi untuk membuat tampilan kalender
function createCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const header = document.createElement("div");
    header.classList.add("calendar-header");
    header.innerHTML = `<h2>${monthNames[month]} ${year}</h2>`;
    calendarContainer.appendChild(header);

    const calendarGrid = document.createElement("div");
    calendarGrid.classList.add("calendar-grid");
    
    // Menambahkan hari dalam minggu
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysRow = document.createElement("div");
    daysRow.classList.add("days-row");
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;
        daysRow.appendChild(dayElement);
    });
    calendarGrid.appendChild(daysRow);

    // Menampilkan tanggal dalam grid
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const totalDays = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    let dateNumber = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("div");
        row.classList.add("calendar-row");

        for (let j = 0; j < 7; j++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");

            if (i === 0 && j < startDay) {
                // Kosongkan hari sebelum tanggal pertama
                row.appendChild(dayElement);
            } else if (dateNumber <= totalDays) {
                dayElement.textContent = dateNumber;
                dayElement.setAttribute('data-date', `${year}-${month + 1}-${dateNumber}`);
                row.appendChild(dayElement);
                dateNumber++;
            }
        }

        calendarGrid.appendChild(row);
    }

    calendarContainer.appendChild(calendarGrid);
}

// Fungsi untuk mengambil data jadwal dan menambahkannya ke kalender
function fetchEvents() {
    fetch("api/get_events.php")
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                addEventToCalendar(event);
            });
        });
}

// Fungsi untuk menambah jadwal ke kalender
function addEventToCalendar(event) {
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);

    const eventElements = document.querySelectorAll(`[data-date="${eventStartDate.getFullYear()}-${eventStartDate.getMonth() + 1}-${eventStartDate.getDate()}"]`);
    eventElements.forEach(element => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.textContent = event.name;
        eventDiv.style.backgroundColor = event.color;  // Warna event (misal: biru atau abu-abu)

        element.appendChild(eventDiv);
    });
}
