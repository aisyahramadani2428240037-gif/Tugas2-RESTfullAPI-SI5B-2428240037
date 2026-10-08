const express = require('express');

const router = express.Router();

const toddlerController = require('../controllers/toddlerController');

const cekApiKey = require('../middlewares/cekApiKey');

// GET semua toddler
router.get(
  '/',
  toddlerController.getAllToddler
);

// GET toddler berdasarkan ID
router.get(
  '/:id',
  toddlerController.getToddlerById
);

// POST toddler
router.post(
  '/',
  cekApiKey,
  toddlerController.createToddler
);

// PUT toddler
router.put(
  '/:id',
  cekApiKey,
  toddlerController.updateToddler
);

// DELETE toddler
router.delete(
  '/:id',
  cekApiKey,
  toddlerController.deleteToddler
);

module.exports = router;