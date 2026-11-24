<?php

namespace App;

class LearningCurriculum
{
    public static function stages(): array
    {
        return [
            1 => ['title' => 'Pengenalan Pemrograman dan Dasar Algoritma', 'description' => 'Fondasi pemrograman: algoritma, IDE, variabel, tipe data, dan I/O.', 'sessions' => 'Sesi 1–2', 'xp' => 100],
            2 => ['title' => 'Seleksi dan Perulangan', 'description' => 'Mengatur keputusan dan pengulangan pada alur program.', 'sessions' => 'Sesi 3–4', 'xp' => 100],
            3 => ['title' => 'Pustaka, Array, dan String', 'description' => 'Menggunakan pustaka serta mengolah array satu dimensi dan teks.', 'sessions' => 'Sesi 5–6', 'xp' => 100],
            4 => ['title' => 'Array Multidimensi dan Review UTS', 'description' => 'Matriks, traversal, serta penguatan materi untuk persiapan UTS.', 'sessions' => 'Sesi 7–8', 'xp' => 100],
            5 => ['title' => 'Pemrograman Modular dan Rekursif', 'description' => 'Fungsi, prosedur, scope, rekursi, dan pemecahan masalah.', 'sessions' => 'Sesi 9–10', 'xp' => 100],
            6 => ['title' => 'Struct, Searching, dan Sorting', 'description' => 'Mengelompokkan data dan menerapkan algoritma pencarian serta pengurutan.', 'sessions' => 'Sesi 11–12', 'xp' => 100],
            7 => ['title' => 'File I/O, Clean Code, dan Etika', 'description' => 'Persistensi data, kualitas kode, keamanan dasar, dan tanggung jawab profesi.', 'sessions' => 'Sesi 13–14', 'xp' => 100],
            8 => ['title' => 'Integrasi Proyek dan Review UAS', 'description' => 'Mengintegrasikan konsep, mendokumentasikan proyek, dan meninjau materi UAS.', 'sessions' => 'Sesi 15–16', 'xp' => 120],
        ];
    }

    public static function lessons(): array
    {
        $result = [];
        foreach (LearningContent::modules() as $id => $module) {
            [$stage, $position] = array_map('intval', explode('.', $id));
            $result[$id] = [
                'id' => $id,
                'stage' => $stage,
                'position' => $position,
                'title' => $module['title'],
                'session' => $module['session'],
                'minutes' => $module['minutes'],
                'objective' => $module['objective'],
                'summary' => $module['summary'],
                'tip' => $module['tip'],
                'previousLesson' => $position === 1 ? null : $stage.'.'.($position - 1),
                'nextLesson' => $position === 1 ? $stage.'.2' : null,
                'topicNumber' => $id,
            ];
        }

        return $result;
    }

    public static function quiz(int $stage): ?array
    {
        $quizzes = [
            1 => [
                ['question_id' => 'Q-ST01-01', 'question' => 'Apa yang dimaksud dengan algoritma?', 'options' => ['A' => 'Bahasa khusus untuk membuat tampilan aplikasi', 'B' => 'Urutan langkah sistematis untuk menyelesaikan masalah', 'C' => 'Perangkat keras untuk memproses data', 'D' => 'Tempat menyimpan file program'], 'correct_option' => 'B', 'explanation' => 'Algoritma adalah urutan langkah yang logis dan sistematis untuk mencapai penyelesaian masalah.', 'points' => 20],
                ['question_id' => 'Q-ST01-02', 'question' => 'Simbol flowchart berbentuk belah ketupat digunakan untuk menunjukkan ...', 'options' => ['A' => 'Awal dan akhir proses', 'B' => 'Input dan output', 'C' => 'Keputusan atau kondisi', 'D' => 'Proses pengolahan'], 'correct_option' => 'C', 'explanation' => 'Belah ketupat menunjukkan decision, yaitu titik alur ditentukan berdasarkan kondisi.', 'points' => 20],
                ['question_id' => 'Q-ST01-03', 'question' => 'Apa fungsi utama pseudocode?', 'options' => ['A' => 'Menggantikan seluruh bahasa pemrograman', 'B' => 'Menggambarkan langkah algoritma dengan bahasa sederhana dan terstruktur', 'C' => 'Menjalankan program secara otomatis', 'D' => 'Menyimpan data ke database'], 'correct_option' => 'B', 'explanation' => 'Pseudocode menjelaskan logika tanpa terikat sintaks bahasa tertentu.', 'points' => 20],
                ['question_id' => 'Q-ST01-04', 'question' => 'Tipe data yang paling sesuai untuk menyimpan nama mahasiswa adalah ...', 'options' => ['A' => 'Integer', 'B' => 'Boolean', 'C' => 'String', 'D' => 'Float'], 'correct_option' => 'C', 'explanation' => 'Nama mahasiswa berupa teks sehingga direpresentasikan sebagai string.', 'points' => 20],
                ['question_id' => 'Q-ST01-05', 'question' => 'Dalam konsep IPO, nilai yang dimasukkan pengguna termasuk bagian ...', 'options' => ['A' => 'Input', 'B' => 'Process', 'C' => 'Output', 'D' => 'Storage'], 'correct_option' => 'A', 'explanation' => 'Input adalah data yang diterima sistem sebelum diproses.', 'points' => 20],
            ],
            2 => [
                ['question_id' => 'Q-ST02-01', 'question' => 'Struktur kontrol yang digunakan untuk memilih tindakan berdasarkan kondisi adalah ...', 'options' => ['A' => 'Perulangan', 'B' => 'Percabangan', 'C' => 'Deklarasi variabel', 'D' => 'Penyimpanan data'], 'correct_option' => 'B', 'explanation' => 'Percabangan memilih tindakan berdasarkan hasil pemeriksaan kondisi.', 'points' => 20],
                ['question_id' => 'Q-ST02-02', 'question' => 'Nested if merupakan ...', 'options' => ['A' => 'Perulangan di dalam perulangan', 'B' => 'Percabangan di dalam percabangan', 'C' => 'Penggunaan banyak variabel', 'D' => 'Pengulangan tanpa kondisi'], 'correct_option' => 'B', 'explanation' => 'Nested if adalah struktur seleksi yang ditempatkan di dalam seleksi lain.', 'points' => 20],
                ['question_id' => 'Q-ST02-03', 'question' => 'Perulangan yang cocok saat jumlah pengulangan telah diketahui adalah ...', 'options' => ['A' => 'for', 'B' => 'if-else', 'C' => 'switch-case', 'D' => 'nested if'], 'correct_option' => 'A', 'explanation' => 'For umumnya digunakan ketika jumlah iterasi sudah ditentukan.', 'points' => 20],
                ['question_id' => 'Q-ST02-04', 'question' => 'Apa karakteristik utama do-while?', 'options' => ['A' => 'Kondisi diperiksa sebelum proses', 'B' => 'Proses dijalankan minimal satu kali sebelum kondisi diperiksa', 'C' => 'Tidak membutuhkan kondisi', 'D' => 'Hanya untuk dua pengulangan'], 'correct_option' => 'B', 'explanation' => 'Do-while menjalankan isi perulangan sebelum memeriksa kondisi.', 'points' => 20],
                ['question_id' => 'Q-ST02-05', 'question' => 'Apa yang dapat menyebabkan perulangan berjalan tanpa akhir?', 'options' => ['A' => 'Variabel diperbarui dengan benar', 'B' => 'Kondisi berhenti tercapai', 'C' => 'Kondisi selalu benar dan tidak ada perubahan penghenti', 'D' => 'Jumlah iterasi dibatasi'], 'correct_option' => 'C', 'explanation' => 'Infinite loop terjadi saat kondisi tetap benar atau pengendali tidak diperbarui.', 'points' => 20],
            ],
            3 => [
                ['question_id' => 'Q-ST03-01', 'question' => 'Apa fungsi utama library?', 'options' => ['A' => 'Menggantikan seluruh algoritma', 'B' => 'Menyediakan fungsi atau komponen yang dapat digunakan kembali', 'C' => 'Menyimpan semua file pengguna', 'D' => 'Mengubah perangkat keras'], 'correct_option' => 'B', 'explanation' => 'Library menyediakan fungsi dan komponen untuk membantu pengembangan.', 'points' => 20],
                ['question_id' => 'Q-ST03-02', 'question' => 'Array satu dimensi digunakan untuk ...', 'options' => ['A' => 'Menimpan sekumpulan elemen dalam satu urutan', 'B' => 'Menimpan hanya satu karakter', 'C' => 'Mengelola jaringan', 'D' => 'Menggambarkan alur'], 'correct_option' => 'A', 'explanation' => 'Array satu dimensi menyimpan elemen berurutan yang diakses melalui indeks.', 'points' => 20],
                ['question_id' => 'Q-ST03-03', 'question' => 'Jika indeks array dimulai dari 0, elemen ketiga memiliki indeks ...', 'options' => ['A' => '0', 'B' => '1', 'C' => '2', 'D' => '3'], 'correct_option' => 'C', 'explanation' => 'Elemen ketiga memiliki indeks 2 pada sistem indeks berbasis nol.', 'points' => 20],
                ['question_id' => 'Q-ST03-04', 'question' => 'Operasi yang digunakan untuk menggabungkan dua teks disebut ...', 'options' => ['A' => 'Sorting', 'B' => 'Concatenation', 'C' => 'Iteration', 'D' => 'Selection'], 'correct_option' => 'B', 'explanation' => 'Concatenation menggabungkan dua atau lebih string.', 'points' => 20],
                ['question_id' => 'Q-ST03-05', 'question' => 'Operasi untuk mengetahui jumlah karakter pada string disebut ...', 'options' => ['A' => 'Length', 'B' => 'Search', 'C' => 'Append', 'D' => 'Decision'], 'correct_option' => 'A', 'explanation' => 'Length mengembalikan jumlah karakter pada string.', 'points' => 20],
            ],
            4 => [
                ['question_id' => 'Q-ST04-01', 'question' => 'Array dua dimensi paling mudah direpresentasikan sebagai ...', 'options' => ['A' => 'Satu variabel', 'B' => 'Tabel dengan baris dan kolom', 'C' => 'Satu teks panjang', 'D' => 'Daftar tanpa indeks'], 'correct_option' => 'B', 'explanation' => 'Array dua dimensi direpresentasikan sebagai baris dan kolom.', 'points' => 20],
                ['question_id' => 'Q-ST04-02', 'question' => 'Untuk mengakses elemen array dua dimensi diperlukan ...', 'options' => ['A' => 'Satu indeks', 'B' => 'Indeks baris dan indeks kolom', 'C' => 'Nama file dan ekstensi', 'D' => 'Nilai boolean'], 'correct_option' => 'B', 'explanation' => 'Elemen diakses melalui posisi baris dan kolom.', 'points' => 20],
                ['question_id' => 'Q-ST04-03', 'question' => 'Apa yang dimaksud traversal pada array?', 'options' => ['A' => 'Menghapus seluruh elemen', 'B' => 'Mengunjungi elemen array secara teratur', 'C' => 'Mengubah tipe data', 'D' => 'Membuat array menjadi string'], 'correct_option' => 'B', 'explanation' => 'Traversal adalah proses mengunjungi elemen untuk dibaca atau diproses.', 'points' => 20],
                ['question_id' => 'Q-ST04-04', 'question' => 'Syarat penjumlahan dua matriks adalah ...', 'options' => ['A' => 'Jumlah baris dan kolom sama', 'B' => 'Nilai matriks harus sama', 'C' => 'Berisi bilangan negatif', 'D' => 'Memiliki nama yang sama'], 'correct_option' => 'A', 'explanation' => 'Penjumlahan dilakukan pada posisi elemen yang sama sehingga dimensinya harus cocok.', 'points' => 20],
                ['question_id' => 'Q-ST04-05', 'question' => 'Dalam array dua dimensi, perulangan bersarang digunakan untuk ...', 'options' => ['A' => 'Mengganti nama variabel', 'B' => 'Mengunjungi elemen berdasarkan baris dan kolom', 'C' => 'Menghapus indeks', 'D' => 'Menghentikan input'], 'correct_option' => 'B', 'explanation' => 'Satu loop mengatur baris dan loop lain mengatur kolom.', 'points' => 20],
            ],
            5 => [
                ['question_id' => 'Q-ST05-01', 'question' => 'Apa tujuan utama pemrograman modular?', 'options' => ['A' => 'Memperbesar program', 'B' => 'Membagi program menjadi bagian terstruktur', 'C' => 'Menghapus fungsi', 'D' => 'Menghilangkan parameter'], 'correct_option' => 'B', 'explanation' => 'Modularitas membagi program menjadi bagian dengan tanggung jawab tertentu.', 'points' => 20],
                ['question_id' => 'Q-ST05-02', 'question' => 'Apa yang dimaksud return value?', 'options' => ['A' => 'Nilai yang dikembalikan oleh fungsi', 'B' => 'Nama variabel global', 'C' => 'Kondisi perulangan', 'D' => 'Data yang dihapus'], 'correct_option' => 'A', 'explanation' => 'Return value adalah hasil yang dikembalikan fungsi.', 'points' => 20],
                ['question_id' => 'Q-ST05-03', 'question' => 'Variabel lokal umumnya dapat diakses ...', 'options' => ['A' => 'Dari semua program', 'B' => 'Hanya dalam scope tempat didefinisikan', 'C' => 'Dari seluruh komputer', 'D' => 'Tanpa batas'], 'correct_option' => 'B', 'explanation' => 'Scope membatasi area akses variabel lokal.', 'points' => 20],
                ['question_id' => 'Q-ST05-04', 'question' => 'Apa fungsi base case dalam rekursi?', 'options' => ['A' => 'Memulai loop tanpa akhir', 'B' => 'Menghentikan pemanggilan rekursif', 'C' => 'Menghapus parameter', 'D' => 'Mengubah tipe data'], 'correct_option' => 'B', 'explanation' => 'Base case adalah kondisi penghentian rekursi.', 'points' => 20],
                ['question_id' => 'Q-ST05-05', 'question' => 'Struktur data yang mengelola urutan pemanggilan fungsi rekursif adalah ...', 'options' => ['A' => 'Queue', 'B' => 'Array', 'C' => 'Call stack', 'D' => 'Database'], 'correct_option' => 'C', 'explanation' => 'Call stack menyimpan pemanggilan fungsi yang belum selesai.', 'points' => 20],
            ],
            6 => [
                ['question_id' => 'Q-ST06-01', 'question' => 'Struct/record digunakan untuk ...', 'options' => ['A' => 'Mengelompokkan data yang dapat memiliki tipe berbeda', 'B' => 'Menghapus seluruh data', 'C' => 'Mengatur tampilan halaman', 'D' => 'Menghentikan program'], 'correct_option' => 'A', 'explanation' => 'Struct menyatukan beberapa atribut yang dapat memiliki tipe berbeda.', 'points' => 20],
                ['question_id' => 'Q-ST06-02', 'question' => 'Bagian informasi dalam struct disebut ...', 'options' => ['A' => 'Iterasi', 'B' => 'Member atau field', 'C' => 'Loop', 'D' => 'Operator'], 'correct_option' => 'B', 'explanation' => 'Member atau field adalah bagian data pada struct.', 'points' => 20],
                ['question_id' => 'Q-ST06-03', 'question' => 'Algoritma pencarian yang memeriksa data satu per satu adalah ...', 'options' => ['A' => 'Binary Search', 'B' => 'Bubble Sort', 'C' => 'Linear Search', 'D' => 'Selection Sort'], 'correct_option' => 'C', 'explanation' => 'Linear Search memeriksa elemen secara berurutan.', 'points' => 20],
                ['question_id' => 'Q-ST06-04', 'question' => 'Syarat penting penggunaan Binary Search adalah ...', 'options' => ['A' => 'Data harus teks', 'B' => 'Data harus sudah terurut', 'C' => 'Data harus berjumlah ganjil', 'D' => 'Data harus bernilai sama'], 'correct_option' => 'B', 'explanation' => 'Binary Search membutuhkan data yang sudah terurut.', 'points' => 20],
                ['question_id' => 'Q-ST06-05', 'question' => 'Prinsip utama Selection Sort adalah ...', 'options' => ['A' => 'Membandingkan elemen berdekatan', 'B' => 'Memilih elemen terkecil/terbesar untuk posisi tepat', 'C' => 'Menghapus elemen sama', 'D' => 'Mengacak urutan'], 'correct_option' => 'B', 'explanation' => 'Selection Sort memilih elemen yang sesuai untuk posisi berikutnya.', 'points' => 20],
            ],
            7 => [
                ['question_id' => 'Q-ST07-01', 'question' => 'Operasi untuk membaca isi suatu berkas adalah ...', 'options' => ['A' => 'Write', 'B' => 'Read', 'C' => 'Append', 'D' => 'Delete'], 'correct_option' => 'B', 'explanation' => 'Read digunakan untuk membaca isi berkas.', 'points' => 20],
                ['question_id' => 'Q-ST07-02', 'question' => 'Apa fungsi append?', 'options' => ['A' => 'Menghapus semua isi berkas', 'B' => 'Membaca berkas', 'C' => 'Menambahkan data ke bagian akhir berkas', 'D' => 'Mengganti nama berkas'], 'correct_option' => 'C', 'explanation' => 'Append menambahkan data tanpa menggantikan isi sebelumnya.', 'points' => 20],
                ['question_id' => 'Q-ST07-03', 'question' => 'Tujuan utama Clean Code adalah ...', 'options' => ['A' => 'Membuat kode semakin panjang', 'B' => 'Meningkatkan keterbacaan dan pemeliharaan', 'C' => 'Menghilangkan dokumentasi', 'D' => 'Menghindari fungsi'], 'correct_option' => 'B', 'explanation' => 'Clean Code meningkatkan keterbacaan dan kemudahan pemeliharaan.', 'points' => 20],
                ['question_id' => 'Q-ST07-04', 'question' => 'Validasi input dilakukan untuk ...', 'options' => ['A' => 'Memastikan data sesuai aturan', 'B' => 'Menghapus semua data', 'C' => 'Mengganti tipe perangkat', 'D' => 'Mempercepat internet'], 'correct_option' => 'A', 'explanation' => 'Validasi memastikan data memenuhi aturan yang ditetapkan.', 'points' => 20],
                ['question_id' => 'Q-ST07-05', 'question' => 'Menggunakan karya orang lain tanpa atribusi merupakan pelanggaran terhadap ...', 'options' => ['A' => 'Efisiensi algoritma', 'B' => 'Etika akademik dan hak kekayaan intelektual', 'C' => 'Struktur perulangan', 'D' => 'Pengelolaan array'], 'correct_option' => 'B', 'explanation' => 'Pengakuan karya orang lain tanpa atribusi melanggar etika akademik dan HAKI.', 'points' => 20],
            ],
            8 => [
                ['question_id' => 'Q-ST08-01', 'question' => 'Tahap awal perancangan proyek mini adalah ...', 'options' => ['A' => 'Membuat tampilan akhir', 'B' => 'Mengidentifikasi masalah', 'C' => 'Menyusun laporan akhir', 'D' => 'Melakukan presentasi'], 'correct_option' => 'B', 'explanation' => 'Pengembangan proyek dimulai dengan memahami masalah yang ingin diselesaikan.', 'points' => 20],
                ['question_id' => 'Q-ST08-02', 'question' => 'Kebutuhan fungsional menjelaskan ...', 'options' => ['A' => 'Fitur atau layanan yang harus disediakan sistem', 'B' => 'Warna layar', 'C' => 'Jenis keyboard', 'D' => 'Ukuran ruangan'], 'correct_option' => 'A', 'explanation' => 'Kebutuhan fungsional menjelaskan fitur yang harus disediakan sistem.', 'points' => 20],
                ['question_id' => 'Q-ST08-03', 'question' => 'Apa tujuan utama pengujian perangkat lunak?', 'options' => ['A' => 'Memperpanjang pengembangan', 'B' => 'Memastikan sistem bekerja sesuai kebutuhan', 'C' => 'Menghapus dokumentasi', 'D' => 'Mengganti struktur data'], 'correct_option' => 'B', 'explanation' => 'Pengujian memeriksa kesesuaian sistem dengan kebutuhan.', 'points' => 20],
                ['question_id' => 'Q-ST08-04', 'question' => 'Debugging merupakan proses ...', 'options' => ['A' => 'Menambah tampilan', 'B' => 'Menemukan, menganalisis, dan memperbaiki kesalahan', 'C' => 'Menghapus kebutuhan', 'D' => 'Mengubah nama proyek'], 'correct_option' => 'B', 'explanation' => 'Debugging bertujuan menemukan dan memperbaiki kesalahan.', 'points' => 20],
                ['question_id' => 'Q-ST08-05', 'question' => 'Dokumentasi proyek penting karena ...', 'options' => ['A' => 'Menggantikan pengujian', 'B' => 'Menjelaskan sistem dan memudahkan pemeliharaan', 'C' => 'Menghilangkan kebutuhan pengguna', 'D' => 'Menghapus riwayat proyek'], 'correct_option' => 'B', 'explanation' => 'Dokumentasi membantu memahami sistem dan memeliharanya.', 'points' => 20],
            ],
        ];

        return $quizzes[$stage] ?? null;
    }
}
