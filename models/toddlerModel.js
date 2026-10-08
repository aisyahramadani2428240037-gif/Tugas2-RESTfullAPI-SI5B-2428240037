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

// Mengambil semua data toddler
const getAll = () => {
  return toddler;
};

// Mengambil data berdasarkan ID
const getById = (id) => {
  return toddler.find((t) => t.id === id);
};

// Menambahkan data toddler
const create = (data) => {
  const baru = {
    id: nextId++,
    ...data
  };

  toddler.push(baru);

  return baru;
};

// Mengubah data toddler
const update = (id, data) => {
  const index = toddler.findIndex((t) => t.id === id);

  if (index === -1) {
    return null;
  }

  toddler[index] = {
    ...toddler[index],
    ...data,
    id
  };

  return toddler[index];
};

// Menghapus data toddler
const remove = (id) => {
  const index = toddler.findIndex((t) => t.id === id);

  if (index === -1) {
    return false;
  }

  toddler.splice(index, 1);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};