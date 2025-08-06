// TO-DO LIST DAN KALKULATOR IPK MAHASISWA INFORMATIKA

// Notifikasi
function showNotif(teks, warna = "") {
  const notif = document.getElementById("notif");
  notif.textContent = teks;
  notif.style.background = warna || "var(--primary)";
  notif.classList.add("show");
  setTimeout(() => notif.classList.remove("show"), 1700);
}

// TAB NAVIGASI
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.onclick = function () {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".tab-section")
        .forEach((sec) => sec.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    };
  });
});

// TO-DO LIST
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function renderTodos() {
  let todos = getTodos();
  const list = document.getElementById("todo-list");
  const filterKategori = document.getElementById("filter-kategori").value;
  const filterStatus = document.getElementById("filter-status").value;
  const keyword = document.getElementById("search").value.toLowerCase().trim();

  todos = todos.filter((todo) => {
    let kategoriOk =
      filterKategori === "all" || todo.kategori === filterKategori;
    let statusOk =
      filterStatus === "all" ||
      (filterStatus === "selesai" && todo.selesai) ||
      (filterStatus === "belum" && !todo.selesai);
    let searchOk = todo.judul.toLowerCase().includes(keyword);
    return kategoriOk && statusOk && searchOk;
  });

  list.innerHTML = "";
  if (todos.length === 0) {
    list.innerHTML = `<li style="text-align:center;color:var(--text-soft);">Tidak ada tugas.</li>`;
    return;
  }
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.selesai ? " done" : "");
    li.innerHTML = `
      <div class="todo-info">
        <div class="todo-title">${todo.judul}</div>
        <div class="todo-meta">
          Kategori: <b>${
            todo.kategori
          }</b> | Deadline: <span style="color:${deadlineColor(
      todo.deadline,
      todo.selesai
    )}">${todo.deadline}</span>
        </div>
      </div>
      <div class="todo-actions">
        <input type="checkbox" ${
          todo.selesai ? "checked" : ""
        } title="Tandai Selesai" data-id="${todo.id}" class="done-checkbox"/>
        <button class="edit" data-id="${
          todo.id
        }" title="Edit Tugas">&#9998;</button>
        <button class="delete" data-id="${
          todo.id
        }" title="Hapus Tugas">&times;</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function deadlineColor(deadline, selesai) {
  const hariIni = new Date();
  const tgl = new Date(deadline);
  if (selesai) return "var(--success)";
  if (tgl < new Date(hariIni.toISOString().slice(0, 10)))
    return "var(--danger)";
  if (tgl.toDateString() === hariIni.toDateString()) return "var(--warning)";
  return "var(--primary)";
}
function addTodo(judul, deadline, kategori) {
  const todos = getTodos();
  todos.push({
    id: generateId(),
    judul,
    deadline,
    kategori,
    selesai: false,
  });
  saveTodos(todos);
  showNotif("Tugas berhasil ditambahkan!", "var(--primary)");
  renderTodos();
}
function editTodo(id, newJudul, newDeadline, newKategori) {
  const todos = getTodos();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos[idx].judul = newJudul;
    todos[idx].deadline = newDeadline;
    todos[idx].kategori = newKategori;
    saveTodos(todos);
    showNotif("Tugas berhasil diedit!", "var(--warning)");
    renderTodos();
  }
}
function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
  showNotif("Tugas dihapus!", "var(--danger)");
  renderTodos();
}
function toggleSelesai(id) {
  const todos = getTodos();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos[idx].selesai = !todos[idx].selesai;
    saveTodos(todos);
    showNotif(
      todos[idx].selesai ? "Tugas selesai!" : "Tugas dibatalkan selesai!",
      "var(--success)"
    );
    renderTodos();
  }
}
function backupTodos() {
  const todos = getTodos();
  const blob = new Blob([JSON.stringify(todos, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "todo_mahasiswa_backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotif("Backup data berhasil diunduh!", "var(--primary)");
}

// Event Listener To-Do
document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  let editingId = null;
  const form = document.getElementById("todo-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    const judul = document.getElementById("judul").value.trim();
    const deadline = document.getElementById("deadline").value;
    const kategori = document.getElementById("kategori").value;
    if (new Date(deadline) < new Date(new Date().toISOString().slice(0, 10))) {
      showNotif("Deadline tidak boleh sebelum hari ini!", "var(--danger)");
      return;
    }
    if (!judul || !deadline || !kategori) return;
    if (editingId) {
      editTodo(editingId, judul, deadline, kategori);
      editingId = null;
      form.querySelector('button[type="submit"]').textContent = "Tambah Tugas";
    } else {
      addTodo(judul, deadline, kategori);
    }
    form.reset();
    document.getElementById("kategori").selectedIndex = 0;
  };
  document.getElementById("filter-kategori").onchange = renderTodos;
  document.getElementById("filter-status").onchange = renderTodos;
  document.getElementById("search").oninput = renderTodos;
  document.getElementById("todo-list").onclick = function (e) {
    const id = e.target.getAttribute("data-id");
    if (!id) return;
    if (e.target.classList.contains("delete")) {
      if (confirm("Hapus tugas ini?")) deleteTodo(id);
    }
    if (e.target.classList.contains("edit")) {
      const todos = getTodos();
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        document.getElementById("judul").value = todo.judul;
        document.getElementById("deadline").value = todo.deadline;
        document.getElementById("kategori").value = todo.kategori;
        editingId = todo.id;
        form.querySelector('button[type="submit"]').textContent = "Simpan Edit";
      }
    }
    if (e.target.classList.contains("done-checkbox")) {
      toggleSelesai(id);
    }
  };
  document.getElementById("toggle-dark").onclick = function () {
    document.body.classList.toggle("dark");
    showNotif(
      document.body.classList.contains("dark")
        ? "Mode gelap aktif!"
        : "Mode terang aktif!",
      "var(--primary)"
    );
    localStorage.setItem("darkmode", document.body.classList.contains("dark"));
  };
  if (localStorage.getItem("darkmode") === "true")
    document.body.classList.add("dark");
  document.getElementById("backup-btn").onclick = backupTodos;
});

// KALKULATOR IPK
// Mapping nilai ke bobot
const nilaiBobot = {
  A: 4,
  AB: 3.5,
  B: 3,
  BC: 2.5,
  C: 2,
  D: 1,
  E: 0,
};
function getIPKData() {
  return JSON.parse(localStorage.getItem("ipkdata")) || [];
}
function saveIPKData(data) {
  localStorage.setItem("ipkdata", JSON.stringify(data));
}
function renderIPKTable() {
  const data = getIPKData();
  const tbody = document.querySelector("#ipk-table tbody");
  tbody.innerHTML = "";
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="color:var(--text-soft)">Belum ada data mata kuliah.</td></tr>`;
    document.getElementById("ipk-kumulatif").textContent = "0.00";
    updateIPKChart([]);
    return;
  }
  data.forEach((mk, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${mk.nama}</td>
      <td>${mk.semester}</td>
      <td>${mk.sks}</td>
      <td>${mk.nilai}</td>
      <td>${nilaiBobot[mk.nilai]}</td>
      <td><button class="ipk-delete" data-idx="${idx}" title="Hapus">&times;</button></td>
    `;
    tbody.appendChild(tr);
  });
  document.querySelectorAll(".ipk-delete").forEach((btn) => {
    btn.onclick = function () {
      if (confirm("Hapus data mata kuliah ini?")) {
        data.splice(btn.dataset.idx, 1);
        saveIPKData(data);
        renderIPKTable();
        showNotif("Mata kuliah dihapus!", "var(--danger)");
      }
    };
  });
  // Hitung dan menampilkan IPK
  const { ipkKumulatif, ipkPerSemester } = hitungIPK(data);
  document.getElementById("ipk-kumulatif").textContent =
    ipkKumulatif.toFixed(2);
  updateIPKChart(ipkPerSemester);
}
function hitungIPK(data) {
  // Kelompokkan data per semester
  const semesterMap = {};
  data.forEach((mk) => {
    if (!semesterMap[mk.semester]) semesterMap[mk.semester] = [];
    semesterMap[mk.semester].push(mk);
  });
  // IPK per semesternya
  const ipkPerSemester = [];
  Object.keys(semesterMap)
    .sort((a, b) => a - b)
    .forEach((sem) => {
      const list = semesterMap[sem];
      let totalSks = 0,
        totalBobot = 0;
      list.forEach((mk) => {
        totalSks += Number(mk.sks);
        totalBobot += nilaiBobot[mk.nilai] * Number(mk.sks);
      });
      ipkPerSemester.push({
        semester: sem,
        ipk: totalSks ? totalBobot / totalSks : 0,
      });
    });
  // IPK kumulatif
  let totalSks = 0,
    totalBobot = 0;
  data.forEach((mk) => {
    totalSks += Number(mk.sks);
    totalBobot += nilaiBobot[mk.nilai] * Number(mk.sks);
  });
  const ipkKumulatif = totalSks ? totalBobot / totalSks : 0;
  return { ipkKumulatif, ipkPerSemester };
}
let ipkChart = null;
function updateIPKChart(ipkPerSemester) {
  const ctx = document.getElementById("ipk-chart").getContext("2d");
  const labels = ipkPerSemester.map((x) => "Semester " + x.semester);
  const data = ipkPerSemester.map((x) => x.ipk);
  if (ipkChart) ipkChart.destroy();
  ipkChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "IPK Semester",
          data: data,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.14)",
          pointBackgroundColor: "#1d4ed8",
          tension: 0.22,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { min: 0, max: 4, ticks: { stepSize: 0.5 } },
      },
    },
  });
}
// Event Listener IPK
document.addEventListener("DOMContentLoaded", () => {
  renderIPKTable();
  document.getElementById("ipk-form").onsubmit = function (e) {
    e.preventDefault();
    const nama = document.getElementById("mk-nama").value.trim();
    const sks = Number(document.getElementById("mk-sks").value);
    const nilai = document.getElementById("mk-nilai").value;
    const semester = Number(document.getElementById("mk-semester").value);
    if (!nama || !sks || !nilai || !semester) return;
    if (sks < 1 || sks > 6) {
      showNotif("SKS harus 1-6", "var(--danger)");
      return;
    }
    if (semester < 1 || semester > 14) {
      showNotif("Semester tidak valid", "var(--danger)");
      return;
    }
    // Simpan data
    const data = getIPKData();
    data.push({ nama, sks, nilai, semester });
    saveIPKData(data);
    renderIPKTable();
    this.reset();
    document.getElementById("mk-nilai").selectedIndex = 0;
    showNotif("Data mata kuliah ditambahkan!", "var(--primary)");
  };
});
