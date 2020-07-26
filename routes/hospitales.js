/** 
 * Rutas: /api/hospitales
*/
const { Router } = require('express');

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require('../controllers/hospitales')
const router = Router();

router.get('/', getHospitales)

router.post('/',
  // Validaciones
  [
  ],
  crearHospital
)

router.put('/:id',
  // Validaciones
  [

  ],
  actualizarHospital
)

router.delete('/:id', borrarHospital)


module.exports = router;
