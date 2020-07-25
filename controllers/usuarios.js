const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {

  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    usuarios
  })
}

const crearUsuarios = async(req, res = response) => {

  // Destructuramos
  const { email, password, nombre } = req.body;

  try {

    const existeEmail = await Usuario.findOne({email});

    // Validaciones
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      })
    }

    // Creamos una instancia de Usuario
    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
  
    // Guardamos en la base de datos
    await usuario.save()
    
    res.json({
      ok: true,
      usuario
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  } 
}

module.exports = {
  getUsuarios,
  crearUsuarios
}