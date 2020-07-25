const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

  // Destructuramos
  const { email, password } = req.body;
  try {

    // Verificar email
    const usuarioDB = await Usuario.findOne({email});

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'Email no válido'
      })
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida'
      })
    }

    // Generar TOKEN - JWT
    res.json({
      ok: true,
      msg: 'Login'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
}

module.exports = {
  login
}