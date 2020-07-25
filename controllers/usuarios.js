const Usuario = require('../models/usuario');

const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    msg: 'Get Usuario'
  })
}

const crearUsuarios = async(req, res) => {

  // Destructuramos
  const { email, password, nombre } = req.body;

  // Creamos una instancia de Usuario
  const usuario = new Usuario(req.body);

  // Guardamos en la base de datos
  await usuario.save()
  
  res.json({
    ok: true,
    usuario
  })
}

module.exports = {
  getUsuarios,
  crearUsuarios
}