const toddlerModel = require('../models/toddlerModel');

// GET semua toddler
const getAllToddler = (req, res) => {
  const { jenisKelamin } = req.query;

  let data = toddlerModel.getAll();

  // Filter berdasarkan jenis kelamin
  if (jenisKelamin) {
    data = data.filter(
      (t) => t.jenisKelamin === jenisKelamin
    );
  }

  res.status(200).json(data);
};

// GET toddler berdasarkan ID
const getToddlerById = (req, res) => {
  const id = parseInt(req.params.id);

  const data = toddlerModel.getById(id);

  if (!data) {
    return res.status(404).json({
      message: 'Data toddler tidak ditemukan'
    });
  }

  res.status(200).json(data);
};

// POST toddler
const createToddler = (req, res) => {
  const {
    nama,
    tanggalLahir,
    jenisKelamin,
    beratKg,
    tinggiCm
  } = req.body;

  // Validasi data
  if (
    !nama ||
    !tanggalLahir ||
    !jenisKelamin ||
    beratKg === undefined ||
    tinggiCm === undefined
  ) {
    return res.status(400).json({
      message:
        'nama, tanggalLahir, jenisKelamin, beratKg dan tinggiCm wajib diisi'
    });
  }

  const dataBaru = toddlerModel.create({
    nama,
    tanggalLahir,
    jenisKelamin,
    beratKg,
    tinggiCm
  });

  res.status(201).json(dataBaru);
};

// PUT toddler
const updateToddler = (req, res) => {
  const id = parseInt(req.params.id);

  const data = toddlerModel.update(id, req.body);

  if (!data) {
    return res.status(404).json({
      message: 'Data toddler tidak ditemukan'
    });
  }

  res.status(200).json(data);
};

// DELETE toddler
const deleteToddler = (req, res) => {
  const id = parseInt(req.params.id);

  const berhasil = toddlerModel.remove(id);

  if (!berhasil) {
    return res.status(404).json({
      message: 'Data toddler tidak ditemukan'
    });
  }

  // 204 = berhasil dihapus dan tidak ada response body
  res.status(204).send();
};

module.exports = {
  getAllToddler,
  getToddlerById,
  createToddler,
  updateToddler,
  deleteToddler
};