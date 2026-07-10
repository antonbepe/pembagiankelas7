// ==============================
// Portal Pembagian Kelas
// SMP Negeri 1 Slogohimo
// ==============================

const tableBody = document.getElementById("tableBody");
const tabs = document.querySelectorAll(".tab");

function renderTable(kelas) {

    tableBody.innerHTML = "";

    if (typeof studentData === "undefined") {
        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="padding:30px;text-align:center;color:red">
                File data.js belum dimuat.
            </td>
        </tr>`;
        return;
    }

    const data = studentData[kelas];

    if (!data || data.length === 0) {
        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="padding:30px;text-align:center">
                Data kelas ${kelas} belum tersedia.
            </td>
        </tr>`;
        return;
    }

    data.forEach((siswa, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${siswa.absen}</td>
            <td>${siswa.induk}</td>
            <td style="text-align:left">${siswa.nama}</td>
            <td>${siswa.jk}</td>
        `;

        tableBody.appendChild(row);
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));
        tab.classList.add("active");

        renderTable(tab.dataset.class);
    });
});

renderTable("7A");
