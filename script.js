// =======================================
// Portal Pembagian Kelas VII
// SMP Negeri 1 Slogohimo
// =======================================

const tableBody = document.getElementById("tableBody");
const tabsContainer = document.getElementById("tabs");
const searchInput = document.getElementById("searchInput");
const jumlahSiswa = document.getElementById("jumlahSiswa");
const loading = document.getElementById("loading");

let workbook = null;
let currentSheet = "";
let currentData = [];

// =============================
// Loading
// =============================

function showLoading() {
    loading.classList.add("show");
}

function hideLoading() {
    loading.classList.remove("show");
}

// =============================
// Membaca Excel
// =============================

async function loadExcel() {

    try {

        showLoading();

        const response = await fetch("data.xlsx");

        if (!response.ok) {
            throw new Error("File data.xlsx tidak ditemukan.");
        }

        const buffer = await response.arrayBuffer();

        workbook = XLSX.read(buffer, {
            type: "array"
        });
        console.log(workbook.SheetNames);

        createTabs();

    } catch(err){

    loading.classList.remove("show");

    tableBody.innerHTML=`
    <tr>
        <td colspan="5" style="
            padding:40px;
            text-align:center;
            color:red;
            font-weight:600;
        ">
            ❌ ${err.message}
        </td>
    </tr>
    `;

};

    }

}
console.log(workbook.SheetNames);

// =============================
// Membuat Tab
// =============================

function createTabs() {

    tabsContainer.innerHTML = "";

    workbook.SheetNames.forEach((sheet, index) => {

        const btn = document.createElement("button");

        btn.className = "tab";

        if (index === 0) btn.classList.add("active");

        btn.textContent = sheet.replace("KELAS ", "");

        btn.dataset.sheet = sheet;

        btn.onclick = () => {

            document.querySelectorAll(".tab")
                .forEach(t => t.classList.remove("active"));

            btn.classList.add("active");

            renderSheet(sheet);

        };

        tabsContainer.appendChild(btn);

    });

    renderSheet(workbook.SheetNames[0]);

}

// =============================
// Membaca Sheet
// =============================

function renderSheet(sheetName) {

    currentSheet = sheetName;

    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1
    });

    // Header ada di baris ke-5
    // Data mulai baris ke-6
    currentData = rows
        .slice(5)
        .filter(r => r.length > 0 && r[3]);

    renderTable(currentData);

}

// =============================
// Menampilkan Tabel
// =============================

function renderTable(data) {

    tableBody.innerHTML = "";

    jumlahSiswa.textContent =
        `Jumlah Siswa : ${data.length}`;
        const laki = data.filter(r => String(r[4]).trim() === "L").length;
const perempuan = data.filter(r => String(r[4]).trim() === "P").length;

document.getElementById("genderInfo").textContent =
`👦 ${laki} | 👧 ${perempuan}`;

    if (data.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="padding:25px;text-align:center;">
                Tidak ada data.
            </td>
        </tr>
        `;

        return;

    }

    data.forEach((row, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row[1] ?? ""}</td>
            <td>${row[2] ?? ""}</td>
            <td style="text-align:left">${row[3] ?? ""}</td>
            <td>${row[4] ?? ""}</td>
        `;

        tableBody.appendChild(tr);

    });

}

// =============================
// Pencarian
// =============================

searchInput.addEventListener("keyup", function () {

    const keyword = this.value
        .trim()
        .toLowerCase();

    if (keyword === "") {

        document.getElementById("currentClass").textContent = sheetName;

document.getElementById("lastUpdate").textContent =
    "Data dimuat : " +
    new Date().toLocaleString("id-ID");

        renderTable(currentData);

        return;

    }

    const hasil = currentData.filter(row => {

        return String(row[3] ?? "")
            .toLowerCase()
            .includes(keyword);

    });

    renderTable(hasil);

});

// =============================

loadExcel();

// =============================
// Refresh
// =============================

document
.getElementById("refreshBtn")
.addEventListener("click", loadExcel);

// =============================
// Cetak
// =============================

document
.getElementById("printBtn")
.addEventListener("click", () => {

    window.print();

});
