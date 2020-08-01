const { response } = require("express");

const fileUpload = (req, res = response) => {

  const {tipo, id} = req.params

  // Validar tipo
  const tiposValidos = ['hospitales', 'medicos', 'usuarios']

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital'
    })
  }

  // Validamos que existe un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No se recibió ningún archivo"
    })
  }

  // Procesar archivo

  res.json({
    ok: true,
    msg: 'fileUploaded'
  })
}

module.exports = {
  fileUpload,
}
