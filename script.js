// =====================================
// Portal Pembagian Kelas VII
// SMP Negeri 1 Slogohimo
// =====================================

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const studentCount = document.getElementById("studentCount");
const currentClass = document.getElementById("currentClass");
const loading = document.getElementById("loading");

let allData = {};


// =========================
// Load JSON
// =========================

async function loadData() {

    loading.classList.add("show");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {

            throw new Error("data.json tidak ditemukan.");

        }

        allData = await response.json();

        renderTable(activeClass);

    } catch (err) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="padding:30px;text-align:center;color:red;">
                ${err.message}
            </td>
        </tr>
        `;

    }

    loading.classList.remove("show");

}

// =========================
// Render Table
// =========================

function renderTable(kelas) {

    activeClass = kelas;

    currentClass.textContent = "Kelas : " + kelas;

    const data = allData[kelas] || [];

    studentCount.textContent =
        "Jumlah Siswa : " + data.length;

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:30px;">
                Belum ada data.
            </td>
        </tr>
        `;

        return;

    }

    data.forEach((siswa, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${siswa.ABSEN}</td>

            <td>${siswa.INDUK}</td>

            <td style="text-align:left">
                ${siswa.NAMA}
            </td>

            <td>${siswa.JK}</td>

        </tr>

        `;

    });

}

// =========================
// Tab Kelas
// =========================

document.querySelectorAll(".tab").forEach(btn => {

    btn.onclick = function () {

        document.querySelectorAll(".tab")
            .forEach(t => t.classList.remove("active"));

        this.classList.add("active");

        renderTable(this.dataset.sheet);

    };

});

// =========================
// Pencarian
// =========================

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const data = (allData[activeClass] || []).filter(siswa =>

        siswa.NAMA.toLowerCase().includes(keyword)

    );

    studentCount.textContent =
        "Jumlah Siswa : " + data.length;

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:30px;">
                Data tidak ditemukan.
            </td>
        </tr>
        `;

        return;

    }

    data.forEach((siswa, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${siswa.absen}</td>

            <td>${siswa.induk}</td>

            <td style="text-align:left">
                ${siswa.nama}
            </td>

            <td>${siswa.jk}</td>

        </tr>

        `;

    });

});

// =========================

loadData();
