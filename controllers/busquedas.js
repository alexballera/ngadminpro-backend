const { response } = require('express');
const Usuarios = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospitales = require('../models/hospital');

const getTodo = async(req, res = response) => {

  // Almacenamos el parámetro de búsqueda
  const busqueda = req.params.busqueda

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp
  // i = ignorar mayúsculas o minúsculas
  const regex = new RegExp(busqueda, 'i')

  // const usuarios   = await Usuarios.find({nombre: regex})
  // const medicos    = await Medicos.find({nombre: regex})
  // const hospitales = await Hospitales.find({nombre: regex})

  // Optimizamos el código anterior con una Promise
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuarios.find({nombre: regex}),
    Medicos.find({nombre: regex}),
    Hospitales.find({nombre: regex})
  ])


  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales
  })
}

module.exports = {
  getTodo
}
