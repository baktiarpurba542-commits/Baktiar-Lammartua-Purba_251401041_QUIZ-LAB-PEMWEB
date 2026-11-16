# Aplikasi Frontend To-Do List (React.js)

Aplikasi web manajemen daftar tugas sehari-hari (*To-Do List*) berbasis **React.js** dan **Tailwind CSS** yang dibuat untuk memenuhi Kuis Praktikum Pengembangan Frontend.

## Fitur Utama
- **Menampilkan Daftar Tugas**: Menampilkan seluruh daftar tugas beserta informasi judul, status, prioritas, dan deadline.
- **Melihat Detail Tugas**: Menampilkan informasi lengkap dari tugas yang dipilih.
- **Menambahkan Tugas**: Menambahkan tugas baru melalui formulir modal pop-up.
- **Memperbarui Tugas**: Mengubah informasi tugas yang sudah ada secara langsung.
- **Menghapus Tugas**: Menghapus tugas dengan dialog konfirmasi dan umpan balik pengguna.
- **Manajemen State Reaktif**: Menggunakan React `useState` sehingga perubahan data langsung tampil tanpa memuat ulang halaman (*reload*).

## Struktur Atribut Data
Setiap objek tugas mengikuti struktur atribut standar:
- `id`: Identitas unik tugas
- `title`: Judul tugas
- `description`: Deskripsi tugas
- `priority`: Tingkat prioritas (`low`, `high`)
- `deadline`: Batas waktu penyelesaian tugas
- `status`: Status pengerjaan (`to-do`, `in-progress`, `completed`)

## Cara Menjalankan Aplikasi di Lokal
1. Clone repositori ini:
   ```bash
   git clone <URL_REPOSITORI_GITHUB_ANDA>
