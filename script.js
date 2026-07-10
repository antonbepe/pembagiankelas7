// ======================================
// Portal Pembagian Kelas VII
// SMP Negeri 1 Slogohimo
// ======================================

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const studentCount = document.getElementById("studentCount");
const currentClass = document.getElementById("currentClass");
const loading = document.getElementById("loading");

let allData = {};
let activeClass = "7A";

// =============================
// Load JSON
// =============================

async function loadData() {

    loading.classList.add("show");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("data.json tidak ditemukan");
        }

        allData = await response.json();

        showClass(activeClass);

    } catch (err) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="padding:30px;text-align:center;color:red">
                ${err.message}
            </td>
        </tr>`;

    }

    loading.classList.remove("show");

}

// =============================
// Ambil Data Kelas
// =============================

function getStudents(kelas){

    if(!allData[kelas]) return [];

    return allData[kelas].filter(siswa => siswa.ABSEN !== undefined);

}

// =============================
// Render Table
// =============================

function renderTable(data){

    tableBody.innerHTML = "";

    if(data.length===0){

        tableBody.innerHTML=`
        <tr>
            <td colspan="5" style="padding:30px;text-align:center">
                Data tidak ditemukan.
            </td>
        </tr>`;

        return;

    }

    data.forEach((siswa,index)=>{

        tableBody.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${siswa.ABSEN}</td>
            <td>${siswa.INDUK}</td>
            <td style="text-align:left">${siswa.NAMA}</td>
            <td>${siswa.JK}</td>
        </tr>`;

    });

}

// =============================
// Tampilkan Kelas
// =============================

function showClass(kelas){

    activeClass = kelas;

    currentClass.textContent = "Kelas : " + kelas;

    searchInput.value="";

    const data = getStudents(kelas);

    studentCount.textContent =
        "Jumlah Siswa : " + data.length;

    renderTable(data);

}

// =============================
// Tab
// =============================

document.querySelectorAll(".tab").forEach(tab=>{

    tab.addEventListener("click",()=>{

        document.querySelectorAll(".tab")
            .forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

        showClass(tab.dataset.sheet);

    });

});

// =============================
// Pencarian
// =============================

searchInput.addEventListener("input",()=>{

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    let data = getStudents(activeClass);

    if(keyword!==""){

        data = data.filter(siswa=>

            siswa.NAMA
                .toLowerCase()
                .includes(keyword)

        );

    }

    studentCount.textContent =
        "Jumlah Siswa : " + data.length;

    renderTable(data);

});

// =============================

loadData();
