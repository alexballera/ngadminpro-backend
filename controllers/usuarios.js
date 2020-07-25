const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {

  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    usuarios
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