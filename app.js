const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json({
    strict: true
}));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: 'Format JSON tidak valid'
        });
    }

    next(err);
});


// API Key
const API_KEY = 'si5b_rahasia123';

// Middleware untuk memeriksa API Key
function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== API_KEY) {
    return res.status(401).json({
      message: 'API key tidak valid'
    });
  }

  next();
}

// Data sementara (hilang saat server restart)
let toddler = [
  {
    id: 1,
    nama: 'Alya',
    tanggalLahir: '2022-05-10',
    jenisKelamin: 'P',
    beratKg: 12,
    tinggiCm: 85
  },
  {
    id: 2,
    nama: 'Rafi',
    tanggalLahir: '2021-08-15',
    jenisKelamin: 'L',
    beratKg: 14,
    tinggiCm: 90
  }
];

let nextId = 3;

// GET / -> memastikan server berjalan
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

// GET /toddler -> seluruh data
// Bisa difilter: /toddler?jenisKelamin=P
app.get('/toddler', (req, res) => {
  const { jenisKelamin } = req.query;

  if (jenisKelamin) {
    const hasil = toddler.filter(
      (t) => t.jenisKelamin === jenisKelamin
    );

    return res.json(hasil);
  }

  res.json(toddler);
});

// GET /toddler/:id -> satu data berdasarkan ID
app.get('/toddler/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const data = toddler.find((t) => t.id === id);

  if (!data) {
    return res.status(404).json({
      message: 'Data tidak ditemukan'
    });
  }

  res.json(data);
});

// POST /toddler -> tambah data baru
// Wajib menggunakan API Key
app.post('/toddler', cekApiKey, (req, res) => {
  const {
    nama,
    tanggalLahir,
    jenisKelamin,
    beratKg,
    tinggiCm
  } = req.body;

  if (
    !nama ||
    !tanggalLahir ||
    !jenisKelamin ||
    beratKg === undefined ||
    beratKg === null ||
    beratKg === '' ||
    tinggiCm === undefined ||
    tinggiCm === null ||
    tinggiCm === ''
  ) {
    return res.status(400).json({
      message:
        'nama, tanggalLahir, jenisKelamin, beratKg dan tinggiCm wajib diisi'
    });
  }

  const baru = {
    id: nextId++,
    nama,
    tanggalLahir,
    jenisKelamin,
    beratKg,
    tinggiCm
  };

  toddler.push(baru);

  res.status(201).json(baru);
});

// PUT /toddler/:id -> ubah data
app.put('/toddler/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = toddler.findIndex(
    (t) => t.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Data tidak ditemukan'
    });
  }

  toddler[index] = {
    ...toddler[index],
    ...req.body,
    id
  };

  res.json(toddler[index]);
});

// DELETE /toddler/:id -> hapus data
app.delete('/toddler/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = toddler.findIndex(
    (t) => t.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Data tidak ditemukan'
    });
  }

  toddler.splice(index, 1);

  res.status(204).send();
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});