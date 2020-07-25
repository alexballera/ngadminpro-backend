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

const actualizarUsuario = async(req, res = response) => {

  // TODO Validar token y si es el usuario correcto

  const uid = req.params.id

  try {

    const usuarioDB = await Usuario.findById(uid);
    // Actualizaciones
    const campos = req.body;

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese Id'
      })
    }

    if (usuarioDB.email === req.body.email) {
      delete campos.email;
    } else {
      const existeEmail = await Usuario.findOne({email: req.body.email})
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        })
      }
    }

    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true, useFindAndModify: false })

    res.json({
      ok: true,
      usuario: usuarioActualizado,
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
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
}
