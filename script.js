// ==============================
// Portal Pembagian Kelas
// SMP Negeri 1 Slogohimo
// ==============================

const tableBody = document.getElementById("tableBody");
const tabs = document.querySelectorAll(".tab");

// ==============================
// Menampilkan Data
// ==============================

function renderTable(kelas) {

    tableBody.innerHTML = "";

    // mengambil data sesuai nama kelas
    const data = studentData[kelas];

    if (!data || data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:30px;">
                    Data kelas ${kelas} belum tersedia.
                </td>
            </tr>
        `;

        return;
    }

    data.forEach((siswa, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${siswa.absen}</td>
            <td>${siswa.induk}</td>
            <td style="text-align:left;font-weight:500;">
                ${siswa.nama}
            </td>
            <td>${siswa.jk}</td>
        `;

        tableBody.appendChild(row);

    });

}

// ==============================
// Event Tab
// ==============================

tabs.forEach(tab => {

    tab.addEventListener("click", function(){

        tabs.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        renderTable(this.dataset.class);

    });

});

// ==============================
// Pertama kali dibuka
// ==============================

renderTable("7A");