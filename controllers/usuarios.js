const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    usuarios
  })
}

const crearUsuarios = async(req, res = response) => {

  // Destructuramos
  const { email, password } = req.body;

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

    // Generar TOKEN - JWT
    const token = await generarJWT(usuario.id)
    
    res.json({
      ok: true,
      usuario,
      token
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
    const {password, google, email, ...campos} = req.body;

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese Id'
      })
    }

    if (usuarioDB.email !== email) {
      
      const existeEmail = await Usuario.findOne({email})

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        })
      }
    }

    campos.email = email;

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

const borrarUsuario = async(req, res = response) => {
  const uid = req.params.id

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuuario no existe en la DB'
      })
    }

    await Usuario.findByIdAndDelete(uid)

    res.json({
      ok: true,
      msg: 'Usuario borrado'
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
  borrarUsuario,
}
