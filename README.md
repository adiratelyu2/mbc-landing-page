# **MBC Laboratory Landing Page**

## **🛠️ Instalasi**

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek secara lokal.

### **Prasyarat**

Pastikan Anda memiliki perangkat lunak berikut terinstal di sistem Anda:

- **Git:** Untuk mengkloning repositori.
- **Browser Web Modern:** Untuk melihat halaman HTML.
- **Node.js dan npm/yarn:** Diperlukan untuk menjalankan backend Node.js.
- **Akses ke akun email (misal: Gmail):** Untuk mengkonfigurasi Nodemailer di backend. Anda mungkin perlu mengaktifkan "Less secure app access" atau menggunakan "App Passwords" di pengaturan keamanan akun Google Anda jika menggunakan Gmail.

### **Struktur Proyek**

Proyek ini terdiri dari file-file HTML statis, CSS (Tailwind CSS), JavaScript frontend, dan backend Node.js:

mbc-laboratory-landing-page/  
├── index.html # Halaman utama (Home)  
├── divisions.html # Halaman divisi dan layanan  
├── contact.html # Halaman kontak dengan formulir  
├── developer.html # Halaman developer (saat ini placeholder)  
├── main.js # Skrip JavaScript untuk fungsionalitas frontend (menu mobile, form kontak submission)  
├── server.js # Skrip backend Node.js untuk memproses pengiriman email  
├── .env.example # Contoh file konfigurasi lingkungan untuk backend  
├── package.json # Definisi proyek Node.js dan dependensi  
├── package-lock.json # Lock file dependensi Node.js  
├── mbc-logo.png # Aset gambar logo MBC Laboratory  
├── hero-bg-unsplash.jpg # Aset gambar latar belakang hero  
├── hero-innovation-unsplash.jpg # Aset gambar untuk bagian "About"  
├── dev.png # Aset gambar untuk halaman developer (misal: foto profil, ikon)  
└── README.md # Dokumentasi ini  
<br/>

### **Langkah-langkah Instalasi Lokal**

1. **Kloning repositori:**  
    git clone <https://github.com/your-username/mbc-laboratory-landing-page.git>  
    cd mbc-laboratory-landing-page  

2. **Siapkan Backend Node.js:**
    - Masuk ke direktori proyek (tempat server.js berada).
    - Instal dependensi Node.js (Express, CORS, Nodemailer, Dotenv):  
        npm install express cors nodemailer dotenv  

    - Buat file konfigurasi lingkungan .env di root proyek Anda. Salin konten dari .env.example dan isi detail email Anda:  
        \# .env  
        EMAIL_USER=<your_email@gmail.com> # Email yang akan digunakan untuk mengirim pesan  
        EMAIL_PASS=your_email_password # Kata sandi email Anda atau app-specific password  
        RECIPIENT_EMAIL=<your_recipient_email@example.com> # Email tujuan penerima pesan  
        <br/>**Penting:** JANGAN masukkan file .env ke kontrol versi Git Anda karena berisi informasi sensitif. Pastikan .env ditambahkan ke .gitignore.

## **🚀 Penggunaan (Instruksi Instalasi Lokal)**

Setelah instalasi, Anda dapat menjalankan aplikasi sebagai berikut:

### **Menjalankan Frontend**

- **Untuk melihat halaman:** Cukup buka file index.html di browser web Anda. Anda juga dapat menggunakan ekstensi "Live Server" di VS Code atau menjalankan server HTTP sederhana (misal: npx live-server jika Node.js terinstal) untuk pengalaman pengembangan yang lebih baik.
- Navigasi antar halaman (index.html, divisions.html, contact.html, developer.html) dapat dilakukan melalui bilah navigasi.

### **Menjalankan Backend (untuk Formulir Kontak)**

Formulir kontak di contact.html mengirimkan data ke backend Node.js yang berjalan di <http://localhost:3000/send-email>.

- **Mulai server backend:**  
    node server.js  
    <br/>Anda akan melihat pesan di konsol seperti: Server is running on port 3000.
- Setelah backend berjalan, Anda dapat mengisi dan mengirim formulir di halaman contact.html. Status pengiriman akan ditampilkan di bawah formulir.

### **Alur Kerja Formulir Kontak (Konfigurasi Backend)**

1. Pengunjung mengisi formulir di contact.html dan menekan tombol "Send Message".
2. Skrip main.js mengambil data formulir dan mengirimkannya sebagai permintaan POST ke <http://localhost:3000/send-email>.
3. Server Node.js (server.js) menerima permintaan, memvalidasi data, dan menggunakan Nodemailer untuk mengirim email ke RECIPIENT_EMAIL yang dikonfigurasi di file .env.
4. Server mengirimkan respons kembali ke frontend (sukses atau gagal), yang kemudian diperbarui di elemen &lt;div id="form-status"&gt;.

## **☁️ Deployment (Instruksi Deployment & Konfigurasi SSL)**

Proyek ini wajib di-deploy menggunakan platform cloud. Karena ada frontend statis dan backend Node.js, pertimbangkan opsi berikut:

- **Platform yang Disarankan:**
  - **Frontend (HTML/CSS/JS):** Vercel, Netlify, GitHub Pages.
  - **Backend (Node.js):** Render, Heroku, Google Cloud Run, AWS Lambda, Azure App Service, atau VPS (Virtual Private Server) dengan Nginx/Apache.
- **SSL (HTTPS):** Sertifikasi keamanan HTTPS wajib tersedia. Ini dapat otomatis disediakan oleh platform hosting frontend (misal: Vercel/Netlify) dan juga oleh platform backend (misal: Render, Heroku) atau dikonfigurasi secara manual menggunakan alat seperti Certbot untuk server kustom.
  - **Konfigurasi Otomatis (Disarankan untuk Platform PaaS seperti Vercel/Netlify):** Sebagian besar platform PaaS (Platform as a Service) seperti Vercel dan Netlify secara otomatis menyediakan sertifikat SSL/TLS dan mengkonfigurasi HTTPS untuk domain Anda. Anda hanya perlu memastikan domain kustom Anda diarahkan dengan benar ke platform tersebut.
  - **Konfigurasi Manual (Untuk VPS/Server Kustom):** Jika Anda menggunakan VPS atau server kustom, Anda perlu menginstal dan mengkonfigurasi sertifikat SSL secara manual. Let's Encrypt dengan Certbot adalah pilihan populer dan gratis:
        1. Instal Certbot di server Anda.
        2. Jalankan sudo certbot --nginx (untuk Nginx) atau sudo certbot --apache (untuk Apache) untuk mendapatkan dan menginstal sertifikat.
        3. Konfigurasi server web Anda (Nginx/Apache) untuk menggunakan sertifikat dan mengarahkan semua lalu lintas HTTP ke HTTPS.
- **Domain Kustom:** Penggunaan domain kustom sangat disarankan untuk peningkatan profesionalisme dan branding.
- **Penyesuaian URL Backend:** Setelah deployment, pastikan untuk memperbarui URL fetch di main.js dari <http://localhost:3000/send-email> ke URL backend yang telah di-deploy (misal: <https://your-backend-api.com/send-email>).
