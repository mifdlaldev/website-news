-- ============================================
-- Website News — Seed Data
-- Run this in Supabase Dashboard > SQL Editor
-- Or via: psql $DATABASE_URL -f supabase/seed.sql
-- ============================================

-- 1. TEST USER (password: Test123456!)
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at)
VALUES
  ('d0a8b6c0-1234-5678-9abc-def012345678', 'author@websitenews.com', '{"name":"Budi Santoso"}', now())
ON CONFLICT (id) DO NOTHING;

-- 2. PUBLIC USER PROFILE (trigger will auto-create, but we insert directly for safety)
INSERT INTO public.users (id, email, name, role)
VALUES
  ('d0a8b6c0-1234-5678-9abc-def012345678', 'author@websitenews.com', 'Budi Santoso', 'author')
ON CONFLICT (id) DO NOTHING;

-- 3. CATEGORIES
INSERT INTO public.categories (id, name, slug, description)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Teknologi', 'teknologi', 'Berita terbaru seputar teknologi, gadget, dan inovasi digital'),
  ('a1000000-0000-0000-0000-000000000002', 'Ekonomi', 'ekonomi', 'Informasi ekonomi, bisnis, dan pasar keuangan terkini'),
  ('a1000000-0000-0000-0000-000000000003', 'Olahraga', 'olahraga', 'Liputan olahraga nasional dan internasional'),
  ('a1000000-0000-0000-0000-000000000004', 'Sains', 'sains', 'Penemuan ilmiah, riset, dan inovasi teknologi terbaru'),
  ('a1000000-0000-0000-0000-000000000005', 'Politik', 'politik', 'Dinamika politik dalam dan luar negeri')
ON CONFLICT (slug) DO NOTHING;

-- 4. TAGS
INSERT INTO public.tags (id, name, slug)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'AI', 'ai'),
  ('b1000000-0000-0000-0000-000000000002', 'Startup', 'startup'),
  ('b1000000-0000-0000-0000-000000000003', 'Keuangan', 'keuangan'),
  ('b1000000-0000-0000-0000-000000000004', 'Sepak Bola', 'sepak-bola'),
  ('b1000000-0000-0000-0000-000000000005', 'Lingkungan', 'lingkungan'),
  ('b1000000-0000-0000-0000-000000000006', 'Kesehatan', 'kesehatan'),
  ('b1000000-0000-0000-0000-000000000007', 'Pendidikan', 'pendidikan'),
  ('b1000000-0000-0000-0000-000000000008', 'Hiburan', 'hiburan')
ON CONFLICT (slug) DO NOTHING;

-- 5. ARTICLES
INSERT INTO public.articles (id, title, slug, excerpt, content, cover_image, status, author_id, category_id, featured, published_at)
VALUES
-- Article 1: Teknologi — Featured
(
  'c1000000-0000-0000-0000-000000000001',
  'Revolusi AI Generatif: Bagaimana Model Bahasa Besar Mengubah Cara Kita Bekerja',
  'revolusi-ai-generatif',
  'Dari menulis kode hingga membuat konten kreatif, AI generatif telah menjadi asisten tak terpisahkan bagi jutaan profesional di seluruh dunia.',
  '<h2>Transformasi Digital yang Tak Terbendung</h2><p>Kecerdasan buatan generatif telah mengalami lompatan yang luar biasa dalam beberapa tahun terakhir. Model bahasa besar seperti GPT-4 dan open-source Llama 3 mampu memahami dan menghasilkan teks dengan tingkat akurasi yang belum pernah kita lihat sebelumnya.</p><p>Di Indonesia sendiri, adopsi AI generatif tumbuh signifikan. Riset terbaru menunjukkan bahwa 67% perusahaan di Indonesia telah menggunakan atau sedang menguji coba teknologi AI dalam operasional mereka.</p><h3>Dampak pada Dunia Kerja</h3><p>Transformasi ini membawa perubahan fundamental. Pekerjaan yang sebelumnya membutuhkan waktu berjam-jam kini bisa diselesaikan dalam hitungan menit. Namun, ini juga menimbulkan kekhawatiran tentang masa depan beberapa profesi.</p><p>Para ahli memperkirakan bahwa AI tidak akan menggantikan manusia, tetapi justru akan menjadi alat yang memperkuat kemampuan kita. Kuncinya adalah adaptasi dan pembelajaran berkelanjutan.</p><blockquote>AI bukanlah ancaman, melainkan kesempatan untuk kita bekerja lebih cerdas dan lebih kreatif.</blockquote><p>Pemerintah Indonesia sendiri telah mulai menyusun regulasi untuk mengatur penggunaan AI, dengan fokus pada etika, transparansi, dan perlindungan data pribadi.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000001', true, now() - interval '1 day'
),

-- Article 2: Ekonomi
(
  'c1000000-0000-0000-0000-000000000002',
  'Pasar Modal Indonesia Mencatat Rekor Baru di Tengah Ketidakpastian Global',
  'pasar-modal-indonesia-rekor-baru',
  'Indeks Harga Saham Gabungan (IHSG) berhasil menembus level tertinggi sepanjang masa meskipun ekonomi global masih dibayangi ketidakpastian.',
  '<h2>Optimisme Investor Membuncah</h2><p>Pasar modal Indonesia menunjukkan kinerja yang impresif sepanjang tahun ini. IHSG berhasil menembus level 7.500 untuk pertama kalinya dalam sejarah, mencerminkan kepercayaan investor terhadap fundamental ekonomi nasional.</p><p>Gubernur Bank Indonesia menyatakan bahwa stabilitas moneter dan kebijakan fiskal yang prudent menjadi faktor utama di balik penguatan pasar.</p><h3>Sektor yang Mendorong Pertumbuhan</h3><p>Beberapa sektor menjadi motor penggerak utama, di antaranya sektor teknologi, perbankan, dan pertambangan. Kapitalisasi pasar Bursa Efek Indonesia kini telah mencapai lebih dari Rp10.000 triliun.</p><p>Analis memperkirakan bahwa tren positif ini masih akan berlanjut, didorong oleh konsumsi domestik yang kuat dan investasi infrastruktur yang berkelanjutan.</p>',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000002', false, now() - interval '2 days'
),

-- Article 3: Olahraga
(
  'c1000000-0000-0000-0000-000000000003',
  'Timnas Indonesia Melaju ke Piala Asia: Sebuah Perjalanan Bersejarah',
  'timnas-indonesia-piala-asia',
  'Setelah penantian panjang, Tim Nasional Indonesia berhasil memastikan diri tampil di ajang Piala Asia tahun depan.',
  '<h2>Kebangkitan Sepak Bola Indonesia</h2><p>Ini adalah momen yang telah dinanti oleh seluruh pecinta sepak bola Indonesia. Tim Garuda berhasil mengamankan tiket ke Piala Asia setelah mengalahkan lawan berat di babak kualifikasi.</p><p>Pelatih timnas mengatakan bahwa kunci keberhasilan adalah kerja keras dan disiplin seluruh pemain. Dukungan luar biasa dari suporter juga menjadi energi tambahan bagi tim.</p><h3>Dampak pada Sepak Bola Nasional</h3><p>Keberhasilan ini diharapkan menjadi momentum kebangkitan sepak bola Indonesia. Pembinaan usia muda dan profesionalisme liga menjadi fokus utama ke depannya.</p><p>PSSI telah menyiapkan program jangka panjang untuk memastikan prestasi ini bisa dipertahankan dan ditingkatkan di masa mendatang.</p>',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000003', false, now() - interval '3 days'
),

-- Article 4: Sains
(
  'c1000000-0000-0000-0000-000000000004',
  'Ilmuwan Indonesia Berhasil Mengembangkan Bahan Bakar Nabati dari Limbah Sawit',
  'bahan-bakar-nabati-limbah-sawit',
  'Inovasi terbaru dari peneliti Indonesia berhasil mengubah limbah kelapa sawit menjadi bahan bakar nabati yang ramah lingkungan dan ekonomis.',
  '<h2>Terobosan Hijau dari Laboratorium Indonesia</h2><p>Tim peneliti dari Institut Teknologi Bandung berhasil mengembangkan teknologi yang mampu mengkonversi limbah kelapa sawit menjadi biofuel berkualitas tinggi. Inovasi ini tidak hanya memecahkan masalah lingkungan, tetapi juga menciptakan nilai ekonomi baru.</p><p>Indonesia sebagai produsen kelapa sawit terbesar di dunia menghasilkan jutaan ton limbah setiap tahunnya. Teknologi ini memungkinkan pemanfaatan limbah tersebut menjadi sumber energi terbarukan.</p><h3>Potensi Pengembangan</h3><p>Peneliti utama menjelaskan bahwa teknologi ini masih dalam tahap pengembangan, namun hasil uji coba menunjukkan performa yang menjanjikan. Biofuel yang dihasilkan memiliki kualitas setara dengan bahan bakar fosil.</p><p>Pemerintah menyambut baik inovasi ini dan berencana memberikan dukungan untuk pengembangan skala industri.</p>',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000004', false, now() - interval '4 days'
),

-- Article 5: Politik
(
  'c1000000-0000-0000-0000-000000000005',
  'Reformasi Birokrasi: Pemerintah Luncurkan Sistem Pemerintahan Berbasis Elektronik',
  'reformasi-birokrasi-spbe',
  'Pemerintah resmi meluncurkan Sistem Pemerintahan Berbasis Elektronik (SPBE) untuk meningkatkan efisiensi dan transparansi pelayanan publik.',
  '<h2>Transformasi Digital Pelayanan Publik</h2><p>Langkah besar dilakukan pemerintah dalam mereformasi birokrasi. Peluncuran SPBE menjadi tonggak penting dalam upaya menciptakan pemerintahan yang lebih efisien, transparan, dan akuntabel.</p><p>Menteri Pendayagunaan Aparatur Negara menyatakan bahwa SPBE akan mengintegrasikan seluruh layanan pemerintah dalam satu platform digital yang mudah diakses oleh masyarakat.</p><h3>Manfaat bagi Masyarakat</h3><p>Dengan sistem baru ini, masyarakat tidak perlu lagi mengurus berbagai dokumen secara manual ke berbagai instansi. Cukup dengan satu portal, berbagai layanan seperti perizinan, administrasi kependudukan, dan layanan publik lainnya bisa diakses secara online.</p><p>Implementasi SPBE akan dilakukan secara bertahap di seluruh kementerian dan lembaga hingga tingkat daerah.</p>',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000005', true, now() - interval '5 days'
),

-- Article 6: Teknologi
(
  'c1000000-0000-0000-0000-000000000006',
  'Startup Indonesia Raih Pendanaan Series B Senilai Rp 1,5 Triliun',
  'startup-indonesia-pendanaan-series-b',
  'Perusahaan rintisan asal Bandung berhasil menarik minat investor global dengan inovasi platform logistik berbasis AI.',
  '<h2>Kesuksesan Startup Lokal</h2><p>Kabar gembira datang dari ekosistem startup Indonesia. Sebuah perusahaan rintisan asal Bandung yang bergerak di bidang logistik berhasil mengamankan pendanaan Series B senilai Rp 1,5 triliun dari investor internasional.</p><p>Pendanaan ini menjadi salah satu yang terbesar di kategori logistik teknologi di Asia Tenggara sepanjang tahun ini. Investor yang berpartisipasi termasuk VC ternama dari Silicon Valley dan Jepang.</p><h3>Rencana Pengembangan</h3><p>Dengan pendanaan segar ini, startup berencana memperluas jangkauan layanan ke lebih dari 50 kota di Indonesia serta mengembangkan teknologi AI untuk optimasi rute pengiriman.</p><p>CEO startup tersebut menyatakan bahwa target mereka adalah menjadi platform logistik terintegrasi terbesar di Indonesia dalam lima tahun ke depan.</p>',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000001', false, now() - interval '6 days'
),

-- Article 7: Ekonomi
(
  'c1000000-0000-0000-0000-000000000007',
  'UMKM Go Digital: Lebih dari 10 Juta Pelaku Usaha Kini Telah Bertransformasi Digital',
  'umkm-go-digital',
  'Transformasi digital UMKM di Indonesia mencapai tonggak sejarah dengan lebih dari 10 juta pelaku usaha telah mengadopsi platform digital.',
  '<h2>Lompatan Digital UMKM Indonesia</h2><p>Pandemi telah mempercepat adopsi digital di kalangan UMKM. Kini, lebih dari 10 juta pelaku UMKM telah memanfaatkan platform digital untuk memasarkan dan menjual produk mereka.</p><p>Menteri Koperasi dan UKM mengapresiasi capaian ini dan menegaskan komitmen pemerintah untuk terus mendukung digitalisasi UMKM melalui berbagai program pelatihan dan pendanaan.</p><h3>Platform yang Paling Diminati</h3><p>Shopee, Tokopedia, dan Instagram menjadi platform utama yang digunakan UMKM. Sektor kuliner, fashion, dan kerajinan tangan mendominasi transaksi digital UMKM.</p><p>Pemerintah menargetkan 30 juta UMKM akan go digital pada tahun depan melalui berbagai insentif dan kemudahan akses teknologi.</p>',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000002', false, now() - interval '7 days'
),

-- Article 8: Sains
(
  'c1000000-0000-0000-0000-000000000008',
  'Observatorium Boscha Mengungkap Temuan Baru tentang Lubang Hitam Supermasif',
  'observatorium-boscha-lubang-hitam',
  'Para astronom Indonesia berkontribusi dalam penelitian internasional yang mengungkap misteri lubang hitam di pusat galaksi Bima Sakti.',
  '<h2>Prestasi Astronomi Indonesia</h2><p>Observatorium Boscha di Lembang, Bandung, kembali menorehkan prestasi. Tim peneliti yang menggunakan teleskop radio di observatorium tersebut berhasil mengumpulkan data penting tentang lubang hitam supermasif Sagitarius A*. Temuan ini menjadi bagian dari proyek Event Horizon Telescope yang melibatkan ilmuwan dari berbagai negara.</p><p>Data yang dikumpulkan dari Observatorium Boscha membantu memperkuat pengamatan global tentang perilaku lubang hitam di pusat galaksi kita.</p><h3>Kontribusi Global</h3><p>Partisipasi Indonesia dalam penelitian astrofisika kelas dunia ini menunjukkan bahwa ilmuwan Indonesia memiliki kapasitas yang diakui secara internasional. Observatorium Boscha sendiri merupakan salah satu observatorium tertua di Asia.</p><p>Penelitian ini membuka jalan untuk pemahaman yang lebih dalam tentang alam semesta dan hukum fisika yang mengaturnya.</p>',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000004', false, now() - interval '8 days'
),

-- Article 9: Olahraga
(
  'c1000000-0000-0000-0000-000000000009',
  'Atlet Bulu Tangkis Indonesia Raih Gelar Juara Dunia Setelah 15 Tahun',
  'bulu-tangkis-juara-dunia',
  'Indonesia kembali meraih gelar juara dunia bulu tangkis setelah puasa gelar selama 15 tahun di nomor ganda putra.',
  '<h2>Kembalinya Kejayaan Bulu Tangkis</h2><p>Indonesia akhirnya memutus puasa gelar juara dunia bulu tangkis. Pasangan ganda putra Indonesia berhasil menjuarai Kejuaraan Dunia Bulu Tangkis setelah mengalahkan lawan tangguh dari China di partai final.</p><p>Pertandingan final yang berlangsung sengit selama tiga game berhasil dimenangkan dengan skor 21-19, 17-21, 21-14. Kemenangan ini disambut suka cita oleh seluruh masyarakat Indonesia.</p><h3>Pembinaan Usia Muda</h3><p>Prestasi ini membuktikan bahwa sistem pembinaan bulu tangkis Indonesia masih menjadi yang terbaik di dunia. PBSI berkomitmen untuk terus menghasilkan atlet-atlet muda berbakat.</p><p>Dengan gelar ini, Indonesia kini memiliki total 20 gelar juara dunia bulu tangkis, menjadikannya salah satu negara paling sukses dalam sejarah olahraga ini.</p>',
  'https://images.unsplash.com/photo-1613919113640-2571c34b7b81?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000003', false, now() - interval '9 days'
),

-- Article 10: Teknologi
(
  'c1000000-0000-0000-0000-000000000010',
  '5G Indonesia: Lebih dari Sekadar Kecepatan Internet',
  '5g-indonesia-lebih-dari-kecepatan',
  'Jaringan 5G di Indonesia tidak hanya tentang internet cepat, tetapi juga membuka peluang baru di berbagai sektor industri.',
  '<h2>Era Baru Konektivitas</h2><p>Implementasi jaringan 5G di Indonesia terus berkembang. Lebih dari sekadar kecepatan internet yang tinggi, 5G membawa potensi transformasi di berbagai sektor seperti manufaktur, kesehatan, pendidikan, dan pertanian.</p><p>Operator seluler di Indonesia telah membangun ribuan tower BTS 5G di kota-kota besar dan terus memperluas jangkauannya.</p><h3>Aplikasi Industri</h3><p>Di sektor manufaktur, 5G memungkinkan penggunaan Internet of Things (IoT) secara masif untuk otomatisasi pabrik. Di bidang kesehatan, dokter dapat melakukan operasi jarak jauh dengan bantuan robot yang dikendalikan melalui jaringan 5G berlatensi rendah.</p><p>Sektor pendidikan juga merasakan manfaatnya dengan pengalaman pembelajaran virtual yang lebih imersif menggunakan teknologi augmented dan virtual reality.</p><p>Pemerintah menargetkan seluruh ibu kota provinsi akan tercover jaringan 5G dalam dua tahun ke depan sebagai bagian dari percepatan transformasi digital nasional.</p>',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'published', 'd0a8b6c0-1234-5678-9abc-def012345678', 'a1000000-0000-0000-0000-000000000001', false, now() - interval '10 days'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. ARTICLE-TAGS (junction)
INSERT INTO public.article_tags (article_id, tag_id)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003'),
  ('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004'),
  ('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005'),
  ('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007'),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002'),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000002'),
  ('c1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000005'),
  ('c1000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000004'),
  ('c1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000006')
ON CONFLICT DO NOTHING;
