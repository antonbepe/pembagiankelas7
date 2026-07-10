const tableBody = document.getElementById("tableBody");
const tabs = document.querySelectorAll(".tab");

let studentData = {};

// ==========================
// Membaca Excel
// ==========================
async function loadExcel() {

    const response = await fetch("data.xlsx");

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
        type: "array"
    });

    studentData = {};

    workbook.SheetNames.forEach(sheetName => {

        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet);

        studentData[sheetName] = json.map(item => ({
            absen: item.Absen,
            induk: item["No. Induk"] || item["No Induk"] || item.Induk,
            nama: item["Nama Peserta Didik"] || item.Nama,
            jk: item["Jenis Kelamin"] || item.JK
        }));

    });

    renderTable("7A");

}

// ==========================
// Menampilkan Data
// ==========================
function renderTable(kelas) {

    tableBody.innerHTML = "";

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
        <td style="text-align:left">${siswa.nama}</td>
        <td>${siswa.jk}</td>
        `;

        tableBody.appendChild(row);

    });

}

// ==========================
// Event Tab
// ==========================
tabs.forEach(tab => {

    tab.addEventListener("click", function () {

        tabs.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        renderTable(this.dataset.class);

    });

});

// ==========================
loadExcel();