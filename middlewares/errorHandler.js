const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Error karena JSON tidak valid
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Format JSON tidak valid'
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Terjadi kesalahan pada server'
  });
};

module.exports = errorHandler;