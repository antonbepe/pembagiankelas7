const tableBody = document.getElementById("tableBody");

let workbook;

// Membaca file Excel
async function loadExcel() {

    const response = await fetch("data.xlsx");
    const arrayBuffer = await response.arrayBuffer();

    workbook = XLSX.read(arrayBuffer, {
        type: "array"
    });

    renderTable("7A");
}

// Menampilkan data
function renderTable(kelas) {

    tableBody.innerHTML = "";

    const sheetName = "KELAS " + kelas;

    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row[1] ?? ""}</td>
        <td>${row[2] ?? ""}</td>
        <td style="text-align:left">${row[3] ?? ""}</td>
        <td>${row[4] ?? ""}</td>
        `;
        
        tableBody.appendChild(tr);
    }

    // baca seluruh sheet
    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1
    });

    // data mulai baris ke-6
    const data = rows.slice(5);

    data.forEach((row, index) => {

        if (!row[3]) return;

        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td style="text-align:left">${row[3]}</td>
            <td>${row[4]}</td>
        </tr>
        `;

    });

}

// Event Tab
tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));

        tab.classList.add("active");

        renderTable(tab.dataset.class);

    });

});

loadExcel();
