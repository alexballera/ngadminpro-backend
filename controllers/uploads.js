const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

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
  const file = req.files.images

  const [, subtype] = file.mimetype.split('/')

  // Validar extensiones
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

  if(!extensionesValidas.includes(subtype)) {
    return res.status(400).json({
      ok: true,
      msg: 'No es una extensión válida'
    })
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${subtype}`

  // Path para guardar imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`

  // Mover la imagen
  file.mv(path, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen'
      })
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo)

    res.json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo
    })
  });
}

module.exports = {
  fileUpload,
}
