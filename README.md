# project-calas-labti
website dinamis

# Dokumentasi Aplikasi Mahasiswa Informatika
**Project Calas 2025 - Harbangan Panjaitan**

## 1. Overview Aplikasi

Aplikasi web untuk membantu mahasiswa informatika dalam mengelola tugas akademik dan menghitung Indeks Prestasi Kumulatif (IPK). Aplikasi ini terdiri dari dua modul utama: To-Do List untuk manajemen tugas dan Kalkulator IPK untuk perhitungan nilai akademik.

### Fitur Utama
- Manajemen tugas dengan sistem kategorisasi
- Kalkulator IPK dengan visualisasi grafik
- Mode tema gelap/terang
- Sistem backup dan restore data
- Interface responsif untuk berbagai perangkat

## 2. Struktur File

### 2.1 File HTML (index.html)
File utama yang berisi struktur markup aplikasi dengan komponen:
- Header aplikasi dengan toggle mode gelap
- Navigation tabs untuk switching antar modul
- Form input untuk kedua modul
- Area tampilan data dan hasil

### 2.2 File JavaScript (script.js)
Berisi logika aplikasi meliputi:
- Fungsi CRUD untuk data management
- Event handlers untuk interaksi user
- Algoritma perhitungan IPK
- Sistem notifikasi dan validasi

### 2.3 File CSS (styles.css)
Mengatur tampilan visual dengan:
- CSS custom properties untuk theming
- Responsive layout dengan flexbox
- Animations dan transitions
- Dark mode implementation

## 3. Modul To-Do List

### 3.1 Fungsionalitas
- **Create**: Menambah tugas baru dengan judul, deadline, dan kategori
- **Read**: Menampilkan daftar tugas dengan sistem filter
- **Update**: Mengedit informasi tugas existing
- **Delete**: Menghapus tugas dari sistem
- **Status Toggle**: Mengubah status selesai/belum selesai

### 3.2 Kategori Tugas
- Algoritma
- Jaringan
- Basis Data
- Pemrograman
- Sistem Operasi

### 3.3 Sistem Filter dan Pencarian
- Filter berdasarkan kategori tugas
- Filter berdasarkan status penyelesaian
- Pencarian real-time berdasarkan judul tugas

### 3.4 Indikator Visual
- Deadline hari ini: warna kuning (warning)
- Deadline terlewat: warna merah (danger)
- Tugas selesai: warna hijau dengan strikethrough
- Deadline normal: warna biru (primary)

## 4. Modul Kalkulator IPK

### 4.1 Sistem Penilaian
Menggunakan skala 4.0 dengan konversi:
- A = 4.0
- AB = 3.5
- B = 3.0
- BC = 2.5
- C = 2.0
- D = 1.0
- E = 0.0

### 4.2 Perhitungan IPK
- **IPK Semester**: Rata-rata tertimbang per semester
- **IPK Kumulatif**: Rata-rata tertimbang keseluruhan
- Formula: (Σ(SKS × Bobot Nilai)) / Σ(SKS)

### 4.3 Visualisasi Data
- Tabel mata kuliah dengan informasi lengkap
- Grafik line chart IPK per semester menggunakan Chart.js
- Summary IPK kumulatif yang update otomatis

## 5. Implementasi Teknis

### 5.1 Data Storage
Menggunakan localStorage browser untuk persistence:
```javascript
// To-Do List Structure
{
  id: "unique_id",
  judul: "string",
  deadline: "YYYY-MM-DD",
  kategori: "string",
  selesai: boolean
}

// IPK Data Structure
{
  nama: "string",
  sks: number,
  nilai: "string",
  semester: number
}
```

### 5.2 Validasi Input
- **To-Do List**: Deadline tidak boleh masa lalu, judul maksimal 60 karakter
- **IPK**: SKS range 1-6, semester range 1-14, semua field required

### 5.3 Event Handling
- Form submissions untuk input data
- Click events untuk CRUD operations
- Change events untuk filtering
- Input events untuk real-time search

## 6. User Interface

### 6.1 Layout Design
- Container-based layout dengan max-width 620px
- Card-style interface dengan box shadows
- Consistent spacing dan typography
- Button states dengan hover effects

### 6.2 Responsive Design
Breakpoint pada 660px dengan adaptasi:
- Form layout berubah ke column direction
- Font sizes disesuaikan untuk mobile
- Padding dan margin dioptimalkan

### 6.3 Dark Mode
- Toggle menggunakan CSS custom properties
- Persistent setting tersimpan di localStorage
- Smooth transitions antar tema

### 6.4 Animations
- Fade-in untuk item baru
- Pop-up animation untuk notifikasi
- Smooth transitions untuk state changes

## 7. Dependencies

### 7.1 External Library
- **Chart.js**: Library untuk visualisasi grafik IPK
- Loaded via CDN: `https://cdn.jsdelivr.net/npm/chart.js`

### 7.2 Browser APIs
- localStorage untuk data persistence
- Blob API untuk export functionality
- Canvas API untuk chart rendering

## 8. Browser Compatibility

Aplikasi mendukung browser modern dengan fitur:
- ES6+ JavaScript
- CSS Custom Properties
- Flexbox Layout
- localStorage API
- Canvas API

## 9. Instalasi dan Penggunaan

### 9.1 Setup
1. Pastikan ketiga file berada dalam satu direktori
2. Buka file index.html di web browser
3. Tidak memerlukan web server khusus

### 9.2 Penggunaan To-Do List
1. Input data tugas melalui form
2. Gunakan filter untuk menyaring tampilan
3. Klik checkbox untuk toggle status selesai
4. Gunakan tombol edit untuk modifikasi
5. Export data menggunakan tombol backup

### 9.3 Penggunaan Kalkulator IPK
1. Input data mata kuliah dengan lengkap
2. Sistem akan menghitung IPK otomatis
3. Monitor perkembangan melalui grafik
4. Hapus data jika diperlukan

## 10. Keamanan dan Limitasi

### 10.1 Keamanan
- Input sanitization dengan trim function
- Client-side validation
- Confirmation dialog untuk aksi destructive

### 10.2 Limitasi
- Data tersimpan lokal (tidak sync antar device)
- Backup manual diperlukan
- Tidak ada sistem autentikasi
- Dependensi pada browser localStorage

---
**Pengembang**: Harbangan Panjaitan  
**Project**: Calas 2025  
**Teknologi**: HTML5, CSS3, JavaScript ES6, Chart.js
