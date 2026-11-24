<?php

namespace App;

class LearningContent
{
    /**
     * Full lesson content for the 16 RPS sessions grouped into 8 stages.
     *
     * Each module exposes: title, session, minutes, objective, objectives[],
     * content[] (typed blocks), key_points[], summary, tip.
     *
     * @return array<string, array{
     *     title: string,
     *     session: int,
     *     minutes: int,
     *     objective: string,
     *     objectives: string[],
     *     content: array<int, array<string, mixed>>,
     *     key_points: string[],
     *     summary: string,
     *     tip: string
     * }>
     */
    public static function modules(): array
    {
        return [
            '1.1' => [
                'title' => 'Pengantar Pemrograman dan Algoritma',
                'session' => 1,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan pemrograman, algoritma, karakteristik algoritma, flowchart, pseudocode, dan gambaran proses eksekusi program.',
                'objectives' => [
                    'Menjelaskan pengertian pemrograman dan algoritma.',
                    'Mengenali karakteristik algoritma serta simbol flowchart standar.',
                    'Menuliskan pseudocode terstruktur untuk kasus sederhana.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Pengenalan Algoritma'],
                    ['type' => 'paragraph', 'text' => 'Algoritma adalah serangkaian instruksi atau langkah logis yang disusun berurutan untuk menyelesaikan masalah tertentu secara terstruktur.'],
                    ['type' => 'paragraph', 'text' => 'Pemrograman adalah proses menyusun instruksi agar komputer melakukan tugas tertentu. Penyelesaian masalah dimulai dengan memahami masalah, menentukan data yang diperlukan, menyusun langkah, lalu merepresentasikan langkah tersebut dalam bentuk yang dapat dipahami komputer.'],
                    ['type' => 'callout', 'variant' => 'tip', 'title' => 'Contoh Sehari-hari', 'text' => 'Membuat secangkir teh hangat adalah contoh algoritma sederhana. Ikuti langkah berikut secara berurutan.'],
                    ['type' => 'steps', 'items' => ['Masak air hingga mendidih.', 'Celupkan teh ke dalam air panas.', 'Tambahkan gula secukupnya.', 'Aduk rata lalu sajikan.']],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Karakteristik Esensial (Donald E. Knuth)'],
                    ['type' => 'cards', 'columns' => 3, 'items' => [
                        ['title' => 'Finiteness', 'meta' => 'Berujung', 'text' => 'Pasti berhenti setelah langkah terhingga selesai.'],
                        ['title' => 'Definiteness', 'meta' => 'Pasti', 'text' => 'Setiap instruksi jelas tanpa tafsir ambigu.'],
                        ['title' => 'Input', 'meta' => 'Masukan', 'text' => 'Menerima nol atau lebih data dari luar.'],
                        ['title' => 'Output', 'meta' => 'Keluaran', 'text' => 'Menghasilkan minimal satu solusi hasil nyata.'],
                        ['title' => 'Effectiveness', 'meta' => 'Efektif', 'text' => 'Langkah sederhana dan realistis dikerjakan.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Diagram Alir (Flowchart)'],
                    ['type' => 'paragraph', 'text' => 'Flowchart memvisualisasikan urutan instruksi dan alur pengambilan keputusan menggunakan simbol geometri baku berikut.'],
                    ['type' => 'cards', 'columns' => 4, 'items' => [
                        ['symbol' => '1', 'title' => 'Terminator', 'meta' => 'Oval', 'text' => 'Menandai titik awal dan akhir alur program.'],
                        ['symbol' => '2', 'title' => 'Proses', 'meta' => 'Persegi panjang', 'text' => 'Pengolahan data atau perhitungan nilai variabel.'],
                        ['symbol' => '3', 'title' => 'Keputusan', 'meta' => 'Belah ketupat', 'text' => 'Pengujian kondisi logika berkeputusan ganda (Ya/Tidak).'],
                        ['symbol' => '4', 'title' => 'Input / Output', 'meta' => 'Jajar genjang', 'text' => 'Masukan data pengguna atau pencetakan hasil.'],
                    ]],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Simbol Pendukung', 'text' => 'Garis alir (flowline) menunjukkan arah langkah, sedangkan konektor berupa simbol bulat untuk menyambung percabangan.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Notasi Pseudocode & Studi Kasus Kelulusan'],
                    ['type' => 'paragraph', 'text' => 'Bandingkan tiga representasi algoritma memakai studi kasus yang sama: jika nilai lebih besar atau sama dengan 75 dinyatakan "Lulus", jika tidak maka "Remedial".'],
                    ['type' => 'compare', 'columns' => [
                        ['title' => 'Bahasa Alami', 'badge' => 'Mudah dipahami pemula', 'lines' => ['Masukkan nilai ujian mahasiswa.', 'Evaluasi apakah nilai >= 75.', 'Jika Ya, tetapkan status "Lulus".', 'Jika Tidak, tetapkan status "Remedial".', 'Tampilkan status lalu selesai.']],
                        ['title' => 'Pseudocode', 'badge' => 'Presisi menuju coding', 'code' => <<<'TXT'
READ nilai
IF nilai >= 75 THEN
    PRINT "Lulus"
ELSE
    PRINT "Remedial"
ENDIF
TXT],
                        ['title' => 'Diagram Alir', 'badge' => 'Visual cabang logika', 'lines' => ['Mulai', 'Input nilai', 'nilai >= 75 ?', 'Output "Lulus" / "Remedial"', 'Selesai']],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Arsitektur Eksekusi Program'],
                    ['type' => 'paragraph', 'text' => 'Program ditulis dalam bahasa pemrograman, lalu diproses oleh compiler atau interpreter sesuai bahasa dan lingkungannya. Compiler umumnya menerjemahkan program sebelum dijalankan, sementara interpreter memproses instruksi melalui mekanisme interpretasi. Detail dapat berbeda antarbahasa.'],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
MULAI
   INPUT nilai
   JIKA nilai >= 60 MAKA
      TAMPILKAN "Lulus"
   JIKA TIDAK
      TAMPILKAN "Belum Lulus"
   AKHIR JIKA
SELESAI
TXT],
                ],
                'key_points' => [
                    'Algoritma harus berurutan, jelas tanpa ambiguitas, dan memiliki titik akhir (berujung).',
                    'Flowchart memvisualisasikan logika dan alur keputusan dengan simbol geometri standar.',
                    'Pseudocode adalah teks informal terstruktur sebelum diimplementasikan ke kode program asli.',
                ],
                'summary' => 'Algoritma menjadi dasar penyelesaian masalah. Flowchart dan pseudocode membantu menggambarkan logika sebelum diterjemahkan menjadi program.',
                'tip' => 'Pahami urutan langkah dan kondisi berhenti sebelum menulis sintaks.',
            ],

            '1.2' => [
                'title' => 'IDE, Variabel, Tipe Data, dan I/O',
                'session' => 2,
                'minutes' => 20,
                'objective' => 'Mahasiswa mampu menjelaskan fungsi IDE, variabel, tipe data dasar, serta hubungan input, process, dan output.',
                'objectives' => [
                    'Menjelaskan tiga komponen inti ekosistem IDE.',
                    'Membedakan variabel dan konstanta serta tipe data dasar.',
                    'Menguraikan alur input, proses, dan output.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Pengertian & Tiga Komponen Inti IDE'],
                    ['type' => 'paragraph', 'text' => 'Integrated Development Environment (IDE) adalah lingkungan kerja terpadu bagi programmer untuk menulis, menerjemahkan, dan menguji kode program dalam satu tampilan aplikasi yang saling terintegrasi.'],
                    ['type' => 'cards', 'columns' => 3, 'items' => [
                        ['title' => 'Code Editor', 'meta' => 'Menulis kode', 'text' => 'Tempat menulis kode dengan pewarnaan sintaks, penomoran baris, dan pelengkapan otomatis.'],
                        ['title' => 'Compiler / Interpreter', 'meta' => 'Menerjemahkan', 'text' => 'Menerjemahkan atau menjalankan kode sumber sesuai mekanisme bahasa pemrograman.'],
                        ['title' => 'Debugger', 'meta' => 'Memeriksa kesalahan', 'text' => 'Mendeteksi, melacak, dan memperbaiki kesalahan (bug) pada alur logika baris demi baris.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Variabel, Konstanta & Tipe Data Primitif'],
                    ['type' => 'paragraph', 'text' => 'Variabel dan konstanta bertindak sebagai wadah berlabel untuk menyimpan nilai di memori komputer selama program berjalan.'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'Variabel', 'meta' => 'Nilai dinamis', 'text' => 'Wadah penyimpanan data yang nilainya dapat berubah sewaktu-waktu selama program berjalan.', 'tone' => 'mint'],
                        ['title' => 'Konstanta', 'meta' => 'Nilai tetap', 'text' => 'Wadah nilai tetap. Pada banyak bahasa, nilai tidak dikunci otomatis melainkan memakai konvensi huruf kapital sebagai kesepakatan.', 'tone' => 'accent'],
                    ]],
                    ['type' => 'cards', 'columns' => 4, 'items' => [
                        ['symbol' => 'int', 'title' => 'Integer', 'text' => 'Bilangan bulat, contoh: 85.'],
                        ['symbol' => 'float', 'title' => 'Float', 'text' => 'Bilangan desimal, contoh: 3.14.'],
                        ['symbol' => 'str', 'title' => 'String', 'text' => 'Teks, contoh: "Andi".'],
                        ['symbol' => 'bool', 'title' => 'Boolean', 'text' => 'Nilai logika, contoh: True.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Alur Input, Proses, dan Output (I/O)'],
                    ['type' => 'paragraph', 'text' => 'Setiap program beroperasi melalui siklus masukan, pengolahan di memori, dan penyajian hasil.'],
                    ['type' => 'steps', 'items' => [
                        'Input (Masukan): data mentah diterima dari pengguna atau sensor luar.',
                        'Proses (Olah): operasi kalkulasi logika, mutasi variabel, atau perhitungan aljabar.',
                        'Output (Keluaran): informasi hasil akhir disajikan kepada pengguna melalui layar.',
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Contoh Alur I/O dalam Kode Python'],
                    ['type' => 'code', 'label' => 'Python', 'caption' => 'Contoh bacaan statis, bukan program yang dijalankan.', 'code' => <<<'TXT'
# 1. Tahap Input (menerima masukan dari pengguna)
nama = input("Nama: ")
kota = input("Kota: ")

# 2. Tahap Proses (penggabungan teks dalam memori)
pesan = "Halo " + nama + " dari " + kota

# 3. Tahap Output (menampilkan hasil ke layar)
print(pesan)
TXT],
                    ['type' => 'callout', 'variant' => 'tip', 'title' => 'Catatan Mentor Owl', 'text' => 'Kode hanya ditampilkan sebagai bacaan statis. LearnHub tidak menyediakan editor, terminal, atau tombol untuk menjalankan program.'],
                ],
                'key_points' => [
                    'IDE memadukan code editor, penerjemah (compiler/interpreter), dan debugger dalam satu ekosistem.',
                    'Variabel menyimpan data dinamis sedangkan konstanta memakai konvensi huruf kapital.',
                    'Program bekerja mengikuti pola berulang: Input, Proses, lalu Output.',
                ],
                'summary' => 'Variabel dan tipe data merepresentasikan informasi. Input, process, dan output menjelaskan bagaimana data diterima, diolah, dan ditampilkan.',
                'tip' => 'Gunakan nama variabel yang menggambarkan makna datanya.',
            ],

            '2.1' => [
                'title' => 'Struktur Kontrol Seleksi',
                'session' => 3,
                'minutes' => 12,
                'objective' => 'Mahasiswa mampu menganalisis kondisi dan menjelaskan penggunaan if-else, nested if, switch-case, serta operator perbandingan dan logika.',
                'objectives' => [
                    'Menjelaskan konsep seleksi dan kondisi logika.',
                    'Membedakan if-else, nested if, dan switch-case.',
                    'Menerapkan operator perbandingan dan logika.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Konsep Seleksi'],
                    ['type' => 'paragraph', 'text' => 'Struktur seleksi memungkinkan algoritma memilih tindakan berdasarkan kondisi. Kondisi menghasilkan nilai logika benar atau salah.'],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Operator Perbandingan'],
                    ['type' => 'table', 'columns' => ['Operator', 'Arti'], 'rows' => [
                        ['==', 'Sama dengan'],
                        ['!=', 'Tidak sama dengan'],
                        ['>', 'Lebih besar'],
                        ['<', 'Lebih kecil'],
                        ['>=', 'Lebih besar atau sama dengan'],
                        ['<=', 'Lebih kecil atau sama dengan'],
                    ], 'caption' => 'Sintaks dapat berbeda menurut bahasa pemrograman.'],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Operator Logika'],
                    ['type' => 'cards', 'columns' => 3, 'items' => [
                        ['title' => 'AND', 'text' => 'Bernilai benar apabila seluruh kondisi yang digabungkan benar.'],
                        ['title' => 'OR', 'text' => 'Bernilai benar apabila minimal satu kondisi benar.'],
                        ['title' => 'NOT', 'text' => 'Membalik nilai logika.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Bentuk Percabangan'],
                    ['type' => 'cards', 'columns' => 3, 'items' => [
                        ['title' => 'If-else', 'text' => 'Memilih satu dari dua alur. Contoh: jika saldo cukup, transaksi diteruskan; jika tidak, transaksi ditolak.'],
                        ['title' => 'Nested if', 'text' => 'Percabangan di dalam percabangan. Contoh: memeriksa status aktif, lalu memeriksa IPK untuk beasiswa.'],
                        ['title' => 'Switch-case', 'text' => 'Memilih tindakan berdasarkan nilai suatu ekspresi. Contoh: pemilihan menu Dashboard, Materi, Progress, atau Keluar.'],
                    ]],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
MULAI
   INPUT saldo, harga
   JIKA saldo >= harga MAKA
      TAMPILKAN "Transaksi diteruskan"
   JIKA TIDAK
      TAMPILKAN "Transaksi ditolak"
   AKHIR JIKA
SELESAI
TXT],
                ],
                'key_points' => [
                    'Seleksi memungkinkan algoritma mengambil keputusan berdasarkan kondisi.',
                    'Operator perbandingan menghasilkan nilai benar atau salah.',
                    'Pemilihan struktur bergantung pada jumlah dan bentuk kondisi yang diperiksa.',
                ],
                'summary' => 'Seleksi memungkinkan algoritma mengambil keputusan. Pemilihan struktur bergantung pada jumlah dan bentuk kondisi yang perlu diperiksa.',
                'tip' => 'Tulis kondisi dalam bentuk yang mudah dibaca dan uji setiap cabang.',
            ],

            '2.2' => [
                'title' => 'Struktur Kontrol Perulangan',
                'session' => 4,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan for, while, do-while, nested loop, pencacah, akumulator, dan kondisi berhenti.',
                'objectives' => [
                    'Menjelaskan konsep perulangan dan jenis-jenisnya.',
                    'Membedakan kapan memakai for, while, dan do-while.',
                    'Merancang kondisi berhenti agar tidak terjadi infinite loop.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Konsep Perulangan'],
                    ['type' => 'paragraph', 'text' => 'Perulangan menjalankan instruksi secara berulang selama kondisi atau batas iterasi terpenuhi. Perulangan menghindari penulisan instruksi yang sama berkali-kali.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Jenis Perulangan'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'For', 'text' => 'Sesuai ketika jumlah iterasi diketahui. Contoh: menampilkan nomor urut 1 sampai 5.'],
                        ['title' => 'While', 'text' => 'Memeriksa kondisi sebelum menjalankan isi perulangan.'],
                        ['title' => 'Do-while', 'text' => 'Menjalankan isi terlebih dahulu, kemudian memeriksa kondisi. Isi dijalankan minimal satu kali.'],
                        ['title' => 'Nested loop', 'text' => 'Perulangan di dalam perulangan. Contoh konseptual: membaca tabel berdasarkan baris dan kolom.'],
                    ]],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Pencacah dan Akumulator'],
                    ['type' => 'bullets', 'items' => [
                        'Pencacah melacak jumlah iterasi atau kejadian.',
                        'Akumulator mengumpulkan nilai, misalnya total nilai mahasiswa.',
                    ]],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Infinite Loop', 'text' => 'Perulangan tanpa akhir dapat terjadi apabila kondisi selalu benar atau variabel pengendali tidak diperbarui sehingga kondisi berhenti tidak pernah tercapai.'],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
total = 0
untuk i dari 1 sampai 5:
    INPUT nilai
    total = total + nilai
TAMPILKAN total
TXT],
                    ['type' => 'table', 'columns' => ['Iterasi', 'Nilai', 'Total Sementara'], 'rows' => [
                        ['1', '80', '80'],
                        ['2', '75', '155'],
                        ['3', '90', '245'],
                    ], 'caption' => 'Contoh penelusuran (tracing) akumulator.'],
                ],
                'key_points' => [
                    'Perulangan mengulang instruksi; jenisnya dipilih berdasarkan kondisi dan jumlah iterasi.',
                    'For cocok untuk jumlah iterasi yang pasti; while dan do-while untuk kondisi.',
                    'Kondisi berhenti harus dirancang benar agar tidak terjadi infinite loop.',
                ],
                'summary' => 'Perulangan mengulang instruksi. Jenis perulangan dipilih berdasarkan kondisi dan jumlah iterasi; kondisi berhenti harus dirancang dengan benar.',
                'tip' => 'Pastikan variabel pengendali diperbarui agar loop tidak menjadi tak berhingga.',
            ],

            '3.1' => [
                'title' => 'Pustaka dan Perkembangan Pemrograman',
                'session' => 5,
                'minutes' => 12,
                'objective' => 'Mahasiswa mampu menjelaskan library, package, pustaka standar, dan alasan menggunakan fungsi pustaka secara adaptif.',
                'objectives' => [
                    'Menjelaskan pengertian library dan package.',
                    'Mengenali kategori pustaka standar.',
                    'Memeriksa dokumentasi sebelum memakai pustaka.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Library dan Package'],
                    ['type' => 'paragraph', 'text' => 'Library adalah kumpulan fungsi, prosedur, atau komponen yang dapat digunakan kembali. Package mengelompokkan modul atau komponen agar lebih mudah dikelola dan digunakan.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Pustaka Standar'],
                    ['type' => 'paragraph', 'text' => 'Pustaka standar tersedia sebagai bagian dari distribusi atau lingkungan bahasa pemrograman. Ketersediaan dan nama pustaka bergantung pada bahasa yang digunakan.'],
                    ['type' => 'cards', 'columns' => 4, 'items' => [
                        ['title' => 'Matematika', 'text' => 'Operasi kalkulasi dan fungsi numerik.'],
                        ['title' => 'Manipulasi String', 'text' => 'Pengolahan dan pemformatan teks.'],
                        ['title' => 'Tanggal / Waktu', 'text' => 'Pengelolaan tanggal dan waktu.'],
                        ['title' => 'Tipe Data Kompleks', 'text' => 'Struktur data siap pakai.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Manfaat dan Adaptasi'],
                    ['type' => 'bullets', 'items' => [
                        'Library mengurangi kebutuhan membuat fungsi umum dari awal.',
                        'Library mempercepat pengembangan dan membantu konsistensi.',
                        'Pengguna tetap perlu memahami dokumentasi dan perilaku fungsi.',
                        'Sebelum memakai pustaka, periksa tujuan, parameter, hasil, batasan, lisensi, kompatibilitas, dan keamanan.',
                    ]],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Alur Pemakaian Pustaka', 'text' => 'Aplikasi memanggil fungsi pustaka, menerima hasil, lalu memakai hasil tersebut pada proses berikutnya. LearnHub tidak menyediakan instalasi package atau praktik coding.'],
                ],
                'key_points' => [
                    'Library menyediakan fungsi atau komponen yang dapat digunakan kembali.',
                    'Package mengelompokkan modul agar lebih mudah dikelola.',
                    'Pemilihan pustaka harus sesuai kebutuhan dan didukung pemahaman dokumentasi.',
                ],
                'summary' => 'Library dan package menyediakan komponen yang dapat digunakan kembali. Pemilihan pustaka harus sesuai kebutuhan dan didukung pemahaman dokumentasi.',
                'tip' => 'Pahami perilaku fungsi sebelum menggunakannya dalam alur aplikasi.',
            ],

            '3.2' => [
                'title' => 'Array 1 Dimensi dan Manipulasi String',
                'session' => 6,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan deklarasi, inisialisasi, indeks, pemrosesan elemen array, dan operasi manipulasi string.',
                'objectives' => [
                    'Menjelaskan array satu dimensi dan indeksnya.',
                    'Melakukan operasi umum pada elemen array.',
                    'Mengenali operasi manipulasi string.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Array Satu Dimensi'],
                    ['type' => 'paragraph', 'text' => 'Array menyimpan sekumpulan elemen dalam satu urutan. Elemen diakses menggunakan indeks. Pada banyak bahasa, indeks dimulai dari nol, tetapi aturan perlu disesuaikan dengan bahasa yang dipakai.'],
                    ['type' => 'table', 'columns' => ['Indeks', 'Nilai'], 'rows' => [
                        ['0', '80'],
                        ['1', '75'],
                        ['2', '90'],
                        ['3', '68'],
                        ['4', '88'],
                    ], 'caption' => 'Contoh tabel nilai lima mahasiswa.'],
                    ['type' => 'callout', 'variant' => 'tip', 'title' => 'Anologi Loker', 'text' => 'Bayangkan array seperti deretan loker bernomor. Nomor loker adalah indeks dan isi loker adalah nilai elemen.'],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Pemrosesan Array'],
                    ['type' => 'bullets', 'items' => [
                        'Menampilkan elemen.',
                        'Menghitung total dan rata-rata.',
                        'Mencari nilai terbesar atau terkecil.',
                        'Mencari nilai tertentu.',
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Manipulasi String'],
                    ['type' => 'paragraph', 'text' => 'String merupakan data teks atau kumpulan karakter. Contohnya nama mahasiswa, nama mata kuliah, dan kode kelas.'],
                    ['type' => 'table', 'columns' => ['Operasi', 'Kegunaan'], 'rows' => [
                        ['length', 'Mengetahui panjang teks'],
                        ['concatenation', 'Menggabungkan dua atau lebih teks'],
                        ['substring', 'Mengambil bagian teks'],
                        ['search', 'Mencari karakter atau kata'],
                        ['case conversion', 'Mengubah kapitalisasi'],
                    ]],
                ],
                'key_points' => [
                    'Array satu dimensi mengelompokkan data berdasarkan indeks.',
                    'Elemen ketiga memiliki indeks 2 jika indeks dimulai dari nol.',
                    'String digunakan untuk menyimpan dan memanipulasi informasi teks.',
                ],
                'summary' => 'Array satu dimensi mengelompokkan data berdasarkan indeks. String digunakan untuk menyimpan dan memanipulasi informasi teks.',
                'tip' => 'Perhatikan aturan indeks pada bahasa yang digunakan.',
            ],

            '4.1' => [
                'title' => 'Array Multidimensi dan Operasi Matriks',
                'session' => 7,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan array dua dimensi, indeks baris/kolom, traversal, dan operasi aritmatika dasar matriks.',
                'objectives' => [
                    'Menjelaskan array dua dimensi dan indeks baris/kolom.',
                    'Melakukan traversal elemen dengan perulangan bersarang.',
                    'Menerapkan penjumlahan dan perkalian skalar matriks.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Array Multidimensi'],
                    ['type' => 'paragraph', 'text' => 'Array multidimensi mempunyai lebih dari satu dimensi. Bentuk dasar yang dibahas adalah array dua dimensi yang dapat ditampilkan sebagai tabel.'],
                    ['type' => 'table', 'columns' => ['Kolom 0', 'Kolom 1'], 'rows' => [
                        ['(0,0) = 1', '(0,1) = 2'],
                        ['(1,0) = 3', '(1,1) = 4'],
                    ], 'caption' => 'Array 2x2 dengan indeks baris dan kolom.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Traversal dan Perulangan Bersarang'],
                    ['type' => 'paragraph', 'text' => 'Traversal adalah proses mengunjungi elemen secara teratur. Pada array 2D, proses dapat dilakukan baris demi baris dan kolom demi kolom, biasanya memakai dua tingkat perulangan.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Operasi Matriks'],
                    ['type' => 'bullets', 'items' => [
                        'Penjumlahan dan pengurangan dilakukan pada elemen dengan posisi yang sama.',
                        'Matriks harus memiliki jumlah baris dan kolom yang sama.',
                        'Perkalian skalar mengalikan setiap elemen dengan satu bilangan tertentu.',
                    ]],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
total = 0
untuk i dari 0 sampai 1:
    untuk j dari 0 sampai 1:
        total = total + matriks[i][j]
TAMPILKAN total
TXT],
                ],
                'key_points' => [
                    'Array dua dimensi merepresentasikan data baris-kolom.',
                    'Elemen diakses memakai indeks baris dan kolom.',
                    'Penjumlahan matriks memerlukan dimensi yang sama.',
                ],
                'summary' => 'Array dua dimensi merepresentasikan data baris-kolom. Traversal mengunjungi elemen, sementara operasi matriks mengolah elemen sesuai posisinya.',
                'tip' => 'Pisahkan indeks baris dan kolom agar perulangan tidak tertukar.',
            ],

            '4.2' => [
                'title' => 'Review Materi dan Persiapan UTS',
                'session' => 8,
                'minutes' => 10,
                'objective' => 'Mahasiswa mampu meninjau kembali konsep sesi 1-7 sebagai persiapan memahami evaluasi tengah semester.',
                'objectives' => [
                    'Meninjau ulang fondasi algoritma dan dasar bahasa.',
                    'Mengulang kontrol alur serta struktur data.',
                    'Mengenali konsep yang masih perlu dipelajari.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Ringkasan Materi Sesi 1-7'],
                    ['type' => 'bullets', 'items' => [
                        'Algoritma, flowchart, pseudocode, dan gambaran eksekusi program.',
                        'Variabel, tipe data, IDE sebagai konsep, input, output, dan IPO.',
                        'Seleksi, operator logika, perulangan, nested loop, pencacah, dan akumulator.',
                        'Library/package, array satu dimensi, indeks, dan manipulasi string.',
                        'Array 2D, indeks baris/kolom, traversal, dan operasi matriks.',
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Strategi Persiapan'],
                    ['type' => 'steps', 'items' => [
                        'Baca ulang rangkuman setiap modul.',
                        'Identifikasi konsep yang belum dikuasai.',
                        'Tinjau ilustrasi dan contoh kasus.',
                        'Kerjakan kuis penguatan pada stage sebelumnya.',
                    ]],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Catatan Penting', 'text' => 'Sesi 8 adalah evaluasi tengah semester dalam RPS. LearnHub hanya menyediakan rangkuman dan latihan pemahaman, bukan pengganti ujian resmi.'],
                ],
                'key_points' => [
                    'Tinjau algoritma, variabel, tipe data, dan IPO.',
                    'Ulangi seleksi, perulangan, library, array, dan matriks.',
                    'UTS teori dan praktik tetap dilaksanakan di luar LearnHub sesuai RPS.',
                ],
                'summary' => 'Sesi 8 adalah evaluasi tengah semester dalam RPS. LearnHub menyediakan rangkuman dan latihan pemahaman, bukan pengganti ujian resmi.',
                'tip' => 'Gunakan checklist topik untuk menemukan materi yang masih perlu dipelajari.',
            ],

            '5.1' => [
                'title' => 'Pemrograman Modular: Fungsi dan Prosedur',
                'session' => 9,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan modularitas, fungsi, prosedur, parameter, return value, dan scope variabel.',
                'objectives' => [
                    'Menjelaskan tujuan pemrograman modular.',
                    'Membedakan fungsi dan prosedur.',
                    'Memahami parameter, argumen, dan scope variabel.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Pemrograman Modular'],
                    ['type' => 'paragraph', 'text' => 'Program dibagi menjadi bagian lebih kecil dengan tanggung jawab yang jelas. Pendekatan ini membantu keterbacaan, penggunaan ulang, pengujian, dan pemeliharaan.'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'Fungsi', 'text' => 'Menjalankan tugas tertentu dan dapat mengembalikan nilai (return value). Contoh: fungsi menghitung rata-rata nilai.'],
                        ['title' => 'Prosedur', 'text' => 'Menjalankan tugas tertentu. Pada banyak bahasa, prosedur tidak mengembalikan nilai sebagai hasil utama.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Parameter, Argumen, dan Return Value'],
                    ['type' => 'bullets', 'items' => [
                        'Parameter adalah variabel penerima informasi dalam definisi fungsi/prosedur.',
                        'Argumen adalah nilai yang diberikan saat pemanggilan.',
                        'Pass by value meneruskan salinan nilai; pass by reference memberi akses pada objek/lokasi yang dirujuk.',
                        'Return value adalah nilai yang dikembalikan fungsi setelah proses selesai.',
                    ]],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Scope Variabel'],
                    ['type' => 'paragraph', 'text' => 'Scope menentukan ruang lingkup akses variabel. Variabel lokal terbatas pada ruang lingkup tertentu, sedangkan variabel global tersedia lebih luas sesuai aturan bahasa.'],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
FUNGSI rata_rata(a, b):
    KEMBALIKAN (a + b) / 2
AKHIR FUNGSI

TAMPILKAN rata_rata(80, 90)
TXT],
                ],
                'key_points' => [
                    'Modularitas membagi program menjadi bagian-bagian dengan tanggung jawab tertentu.',
                    'Return value adalah hasil yang dikembalikan oleh fungsi.',
                    'Scope membatasi tempat variabel dapat diakses.',
                ],
                'summary' => 'Pemrograman modular membagi masalah menjadi komponen yang lebih kecil. Fungsi, prosedur, parameter, return value, dan scope membentuk dasar penyusunan program modular.',
                'tip' => 'Berikan tanggung jawab tunggal pada fungsi agar mudah dipahami.',
            ],

            '5.2' => [
                'title' => 'Pemrograman Rekursif',
                'session' => 10,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan rekursi, base case, recursive step, call stack, perbandingan dengan iterasi, dan kompleksitas sederhana.',
                'objectives' => [
                    'Menjelaskan konsep rekursi, base case, dan recursive step.',
                    'Menelusuri pemanggilan fungsi melalui call stack.',
                    'Membandingkan pendekatan rekursif dan iteratif.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Konsep Rekursi'],
                    ['type' => 'paragraph', 'text' => 'Rekursi adalah teknik ketika fungsi memanggil dirinya sendiri untuk menyelesaikan bagian masalah yang lebih kecil.'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'Base Case', 'text' => 'Kondisi dasar yang menghentikan pemanggilan rekursif.'],
                        ['title' => 'Recursive Step', 'text' => 'Bagian yang memanggil fungsi kembali dengan masalah yang lebih kecil atau lebih dekat ke kondisi dasar.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Contoh Faktorial'],
                    ['type' => 'paragraph', 'text' => 'Faktorial dapat dijelaskan dengan n! = n x (n-1)! dan 0! = 1. Misalnya 5! = 120.'],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
FUNGSI faktorial(n):
    JIKA n == 0 MAKA
        KEMBALIKAN 1
    JIKA TIDAK
        KEMBALIKAN n * faktorial(n - 1)
    AKHIR JIKA
AKHIR FUNGSI
TXT],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Call Stack'],
                    ['type' => 'paragraph', 'text' => 'Call stack menyimpan informasi pemanggilan fungsi yang belum selesai. Setelah base case dicapai, hasil dikembalikan secara bertahap.'],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Rekursif vs Iteratif', 'text' => 'Rekursif memakai pemanggilan fungsi, sedangkan iteratif memakai perulangan. Perbandingan perlu mempertimbangkan keterbacaan, penggunaan memori, dan karakter masalah.'],
                ],
                'key_points' => [
                    'Base case adalah kondisi penghentian rekursi.',
                    'Recursive step harus mendekat ke kondisi berhenti.',
                    'Call stack menyimpan informasi pemanggilan fungsi yang belum selesai.',
                ],
                'summary' => 'Rekursi memecah masalah melalui pemanggilan fungsi. Base case harus jelas dan recursive step harus mendekat ke kondisi berhenti.',
                'tip' => 'Pastikan setiap pemanggilan rekursif mendekati kondisi dasar.',
            ],

            '6.1' => [
                'title' => 'Struct atau Record',
                'session' => 11,
                'minutes' => 12,
                'objective' => 'Mahasiswa mampu menjelaskan struct/record, member/field, pengelompokan data heterogen, array of struct, dan akses member.',
                'objectives' => [
                    'Menjelaskan pengertian struct/record dan member/field.',
                    'Mengelompokkan data heterogen dalam satu kesatuan.',
                    'Mengakses member pada array of struct.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Pengertian Struct / Record'],
                    ['type' => 'paragraph', 'text' => 'Struct atau record mengelompokkan beberapa elemen data yang saling berhubungan dan dapat memiliki tipe data berbeda. Setiap atribut informasi di dalam struct disebut member atau field.'],
                    ['type' => 'table', 'columns' => ['NIM', 'Nama', 'Semester', 'IPK'], 'rows' => [
                        ['22101', 'Andi', '2', '3.65'],
                        ['22102', 'Bunga', '2', '3.80'],
                    ], 'caption' => 'Satu record data mahasiswa menyatukan beberapa tipe data berbeda.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Array of Struct'],
                    ['type' => 'paragraph', 'text' => 'Array of struct menyimpan banyak record dengan struktur atribut yang sama, misalnya daftar mahasiswa atau inventaris. Akses member mengambil informasi tertentu dari record, misalnya nama atau IPK mahasiswa.'],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
REKAM Mahasiswa:
    NIM   : teks
    Nama  : teks
    IPK   : desimal

mahasiswa[0].Nama = "Andi"
TAMPILKAN mahasiswa[0].Nama
TXT],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Penerapan', 'text' => 'Contoh penerapan meliputi Data Mahasiswa dan Data Inventaris dengan kode, nama, kategori, dan jumlah.'],
                ],
                'key_points' => [
                    'Struct/record menyatukan beberapa atribut yang dapat memiliki tipe data berbeda.',
                    'Member atau field adalah bagian data di dalam struct/record.',
                    'Array of struct mengelompokkan banyak record dengan struktur serupa.',
                ],
                'summary' => 'Struct/record menyatukan atribut yang saling berhubungan. Array of struct mengelompokkan banyak record dengan struktur yang serupa.',
                'tip' => 'Kelompokkan data hanya jika atribut tersebut mewakili satu entitas.',
            ],

            '6.2' => [
                'title' => 'Algoritma Pencarian dan Pengurutan Dasar',
                'session' => 12,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu membedakan Linear Search, Binary Search, Bubble Sort, Selection Sort, dan efisiensi dasarnya.',
                'objectives' => [
                    'Membedakan Linear Search dan Binary Search.',
                    'Menjelaskan prinsip Bubble Sort dan Selection Sort.',
                    'Mempertimbangkan efisiensi dalam memilih algoritma.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Searching dan Sorting'],
                    ['type' => 'paragraph', 'text' => 'Searching mencari data dalam kumpulan data. Sorting menyusun data menurut aturan urutan, misalnya menaik atau menurun.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Algoritma Pencarian'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'Linear Search', 'meta' => 'O(n)', 'text' => 'Memeriksa elemen satu per satu sampai data ditemukan atau semua elemen selesai diperiksa. Dapat dipakai pada data yang belum terurut.'],
                        ['title' => 'Binary Search', 'meta' => 'O(log n)', 'text' => 'Membagi ruang pencarian menjadi dua bagian secara berulang. Data harus sudah terurut.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Algoritma Pengurutan'],
                    ['type' => 'cards', 'columns' => 2, 'items' => [
                        ['title' => 'Bubble Sort', 'meta' => 'O(n²)', 'text' => 'Membandingkan elemen yang berdekatan dan menukarnya apabila urutannya salah.'],
                        ['title' => 'Selection Sort', 'meta' => 'O(n²)', 'text' => 'Memilih elemen minimum/maksimum dari bagian yang belum terurut untuk menempati posisi berikutnya.'],
                    ]],
                    ['type' => 'callout', 'variant' => 'tip', 'title' => 'Memilih Algoritma', 'text' => 'Pemilihan mempertimbangkan ukuran data, kondisi data (terurut atau tidak), kemudahan, serta kebutuhan efisiensi.'],
                    ['type' => 'table', 'columns' => ['Algoritma', 'Karakteristik'], 'rows' => [
                        ['Linear Search', 'Data belum terurut, pemeriksaan berurutan'],
                        ['Binary Search', 'Memerlukan data terurut, O(log n)'],
                        ['Bubble Sort', 'Menukar elemen berdekatan, O(n²)'],
                        ['Selection Sort', 'Memilih elemen ekstrem, O(n²)'],
                    ]],
                ],
                'key_points' => [
                    'Linear Search memeriksa elemen secara berurutan satu per satu.',
                    'Binary Search membutuhkan data yang sudah terurut.',
                    'Selection Sort memilih elemen yang sesuai untuk posisi berikutnya.',
                ],
                'summary' => 'Searching menemukan elemen, sorting menyusun elemen. Linear/Binary Search dan Bubble/Selection Sort memiliki cara kerja dan karakteristik efisiensi berbeda.',
                'tip' => 'Gunakan Binary Search hanya jika data sudah terurut.',
            ],

            '7.1' => [
                'title' => 'Manajemen Berkas dan File I/O',
                'session' => 13,
                'minutes' => 12,
                'objective' => 'Mahasiswa mampu menjelaskan pembacaan, penulisan, append, penyimpanan persisten, mode file, dan penanganan kesalahan berkas.',
                'objectives' => [
                    'Menjelaskan konsep File I/O dan operasinya.',
                    'Membedakan mode read, write, dan append.',
                    'Menangani kesalahan berkas secara terkendali.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Konsep File I/O'],
                    ['type' => 'paragraph', 'text' => 'File Input/Output adalah mekanisme membaca data dari berkas dan menyimpan data ke berkas. Penyimpanan persisten membuat data tetap tersedia setelah program selesai dijalankan.'],
                    ['type' => 'table', 'columns' => ['Operasi', 'Kegunaan'], 'rows' => [
                        ['Read', 'Membaca isi berkas yang sudah tersedia.'],
                        ['Write', 'Menulis data; dapat mengganti isi berkas.'],
                        ['Append', 'Menambahkan data ke bagian akhir tanpa mengganti isi sebelumnya.'],
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Mode File dan Penanganan Kesalahan'],
                    ['type' => 'bullets', 'items' => [
                        'Mode membuka berkas menentukan apakah berkas dibaca, ditulis, atau ditambahkan.',
                        'Membaca, menulis, atau menambahkan bergantung pada mode yang dipilih.',
                        'Masalah dapat berupa file tidak ditemukan, izin tidak cukup, lokasi tidak sesuai, atau format data tidak sesuai.',
                    ]],
                    ['type' => 'code', 'label' => 'Pseudocode', 'code' => <<<'TXT'
COBA
    BERKAS = BUKA("inventaris.txt", MODE_TULIS)
    TULIS(BERKAS, "Buku,10")
    TUTUP(BERKAS)
TANGKAP kesalahan
    TAMPILKAN "Berkas tidak dapat dibuka"
AKHIR COBA
TXT],
                ],
                'key_points' => [
                    'Read digunakan untuk membaca isi berkas.',
                    'Append menambahkan data tanpa menggantikan isi sebelumnya.',
                    'Mode dan penanganan kesalahan penting untuk menjaga data.',
                ],
                'summary' => 'File I/O membantu data disimpan dan dibaca kembali. Pemilihan mode dan penanganan kesalahan penting untuk menjaga data.',
                'tip' => 'Konfirmasikan mode operasi agar data lama tidak tertimpa tanpa sengaja.',
            ],

            '7.2' => [
                'title' => 'Clean Code, Keamanan Kode Dasar, dan Etika Profesi',
                'session' => 14,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan keterbacaan kode, modularitas, validasi input, defensive programming, keamanan dasar, HAKI, dan etika akademik.',
                'objectives' => [
                    'Menjelaskan prinsip Clean Code.',
                    'Menerapkan validasi input dan defensive programming.',
                    'Menghormati HAKI dan etika akademik.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Clean Code'],
                    ['type' => 'paragraph', 'text' => 'Clean Code adalah prinsip penulisan kode yang mengutamakan keterbacaan, konsistensi, struktur, dan kemudahan pemeliharaan.'],
                    ['type' => 'table', 'columns' => ['Kurang Jelas', 'Deskriptif'], 'rows' => [
                        ['x', 'jumlah_mahasiswa'],
                        ['d', 'tanggal_lahir'],
                    ], 'caption' => 'Penamaan variabel yang baik menjelaskan isi atau tujuan.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Validasi dan Keamanan Dasar'],
                    ['type' => 'bullets', 'items' => [
                        'Defensive programming mengantisipasi kondisi tidak normal seperti input kosong atau nilai di luar rentang.',
                        'Validasi memastikan data sesuai tipe, format, dan batasan sebelum diproses.',
                        'Prinsip keamanan meliputi validasi input, pembatasan akses, perlindungan informasi rahasia, dan penanganan error yang aman.',
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'HAKI dan Etika Profesi'],
                    ['type' => 'paragraph', 'text' => 'Pengembang perlu menghormati lisensi, mencantumkan sumber, tidak mengakui karya orang lain sebagai milik sendiri, dan menjaga kejujuran akademik.'],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Code Review', 'text' => 'Code review memeriksa keterbacaan, konsistensi, logika, dan potensi masalah untuk meningkatkan kualitas, bukan menyalahkan pembuat kode.'],
                ],
                'key_points' => [
                    'Clean Code meningkatkan keterbacaan dan kemudahan pemeliharaan.',
                    'Validasi memastikan data memenuhi aturan yang ditetapkan.',
                    'Mengakui karya orang lain tanpa atribusi melanggar etika akademik dan HAKI.',
                ],
                'summary' => 'Clean Code meningkatkan keterbacaan. Validasi dan defensive programming membantu menangani kondisi tidak normal, sedangkan HAKI dan etika menjaga tanggung jawab profesional.',
                'tip' => 'Antisipasi input tidak normal tanpa memperlihatkan detail kesalahan yang tidak aman.',
            ],

            '8.1' => [
                'title' => 'Integrasi dan Demonstrasi Proyek Mini',
                'session' => 15,
                'minutes' => 15,
                'objective' => 'Mahasiswa mampu menjelaskan integrasi konsep pemrograman ke dalam proyek mini, dari identifikasi masalah sampai pengujian dan demonstrasi.',
                'objectives' => [
                    'Mengidentifikasi masalah dan kebutuhan proyek.',
                    'Merancang solusi serta mengintegrasikan konsep RPS.',
                    'Menjelaskan pengujian, debugging, dan dokumentasi.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Proyek Mini'],
                    ['type' => 'paragraph', 'text' => 'Proyek mini menggabungkan beberapa konsep pemrograman untuk menyelesaikan masalah tertentu melalui pendekatan Project-Based Learning.'],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Tahapan Perancangan'],
                    ['type' => 'steps', 'items' => [
                        'Identifikasi masalah dan pihak yang membutuhkan solusi.',
                        'Analisis kebutuhan fungsional dan nonfungsional.',
                        'Perancangan solusi: data, proses, output, algoritma, struktur data, dan pembagian modul.',
                        'Pengujian dan debugging untuk memeriksa kesesuaian sistem.',
                        'Dokumentasi dan demonstrasi hasil.',
                    ]],
                    ['type' => 'heading', 'level' => 3, 'text' => 'Integrasi Konsep'],
                    ['type' => 'paragraph', 'text' => 'Contoh sistem inventaris dapat menggabungkan variabel, seleksi, perulangan, fungsi, struct/record, searching, sorting, dan File I/O.'],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Studi Kasus', 'text' => 'Use case sistem inventaris: tambah data barang, tampilkan data, cari barang, urutkan data, dan simpan/baca berkas.'],
                ],
                'key_points' => [
                    'Pengembangan proyek dimulai dengan memahami masalah yang ingin diselesaikan.',
                    'Kebutuhan fungsional menjelaskan fitur yang harus disediakan sistem.',
                    'Dokumentasi membantu pengguna dan pengembang memahami serta memelihara sistem.',
                ],
                'summary' => 'Proyek mini mengintegrasikan konsep yang telah dipelajari. Prosesnya meliputi identifikasi masalah, kebutuhan, desain, integrasi, pengujian, debugging, dokumentasi, dan demonstrasi.',
                'tip' => 'Mulai dari masalah dan kebutuhan, bukan dari tampilan akhir.',
            ],

            '8.2' => [
                'title' => 'Review Materi dan Persiapan UAS',
                'session' => 16,
                'minutes' => 12,
                'objective' => 'Mahasiswa mampu meninjau seluruh materi dan memahami aspek proyek akhir yang tercantum dalam RPS.',
                'objectives' => [
                    'Meninjau seluruh topik sesi 1-15.',
                    'Menghubungkan kebutuhan dengan rancangan solusi.',
                    'Menyiapkan pemahaman untuk evaluasi akhir semester.',
                ],
                'content' => [
                    ['type' => 'heading', 'level' => 2, 'text' => 'Ringkasan Seluruh Materi'],
                    ['type' => 'bullets', 'items' => [
                        'Fondasi: algoritma, flowchart, pseudocode, variabel, tipe data, dan IPO.',
                        'Kontrol alur: seleksi, operator logika, perulangan, fungsi, prosedur, dan rekursi.',
                        'Struktur data: array satu dimensi, array multidimensi, string, dan struct/record.',
                        'Pengolahan data: library, searching, sorting, serta File I/O.',
                        'Kualitas dan etika: Clean Code, validasi, defensive programming, keamanan, HAKI, dan etika.',
                    ]],
                    ['type' => 'heading', 'level' => 2, 'text' => 'Persiapan Evaluasi'],
                    ['type' => 'steps', 'items' => [
                        'Baca ulang ringkasan setiap modul.',
                        'Periksa kembali pembahasan kuis.',
                        'Identifikasi konsep yang masih perlu dipelajari.',
                    ]],
                    ['type' => 'callout', 'variant' => 'note', 'title' => 'Catatan Penting', 'text' => 'Sesi 16 adalah evaluasi akhir semester dalam RPS. LearnHub hanya memberikan review bacaan dan kuis penguatan, bukan tempat pengumpulan proyek atau ujian resmi.'],
                ],
                'key_points' => [
                    'LearnHub mendukung persiapan pemahaman, bukan menggantikan ujian resmi.',
                    'Gunakan peta konsep untuk menghubungkan kebutuhan dengan rancangan solusi.',
                    'UAS praktikum atau proyek akhir tetap dilaksanakan menurut RPS.',
                ],
                'summary' => 'Sesi 16 adalah evaluasi akhir semester dalam RPS. LearnHub mendukung persiapan pemahaman, bukan menggantikan praktikum/proyek akhir resmi.',
                'tip' => 'Gunakan peta konsep untuk menghubungkan kebutuhan dengan rancangan solusi.',
            ],
        ];
    }
}
