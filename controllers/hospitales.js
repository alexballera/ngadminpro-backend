const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

  // Con populate se pasan por argumentos modelo: 'usuario' y las celdas p.e 'nombre img'
  const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img')

  res.json({
    ok: true,
    hospitales
  })
}

const crearHospital = async(req, res = response) => {

  // ID del usuario
  const uid = req.uid

  const hospital = new Hospital({
    // Desestructuramos y agregamos UID
    usuario: uid,
    ...req.body
  });

  try {

    // Guardamos en la DB
    const hospitalDB = await hospital.save();
  
    res.json({
      ok: true,
      hospital: hospitalDB
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    }) 
  }
}

const actualizarHospital = async(req, res = response) => {

  const id = req.params.id
  const uid = req.uid

  try {
    
    const hospital = await Hospital.findById(id)

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: 'Hospital no encontrado'
      })
    }

    // hospital.nombre = req.body.nombre
    const cambioHospitales = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospitales, {new: true})



    res.json({
      ok: true,
      msg: 'actualizarHospital',
      hospital: hospitalActualizado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el adminsitrador"
    })
  }

}

const borrarHospital = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'borrarHospital'
  })
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
}