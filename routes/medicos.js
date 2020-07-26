/** 
 * Rutas: /api/medicos
*/
const { Router } = require('express');

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require('../controllers/medicos')

const router = Router();

router.get('/', getMedicos)

router.post('/',
  // Validaciones
  [
  ],
  crearMedico
)

router.put('/:id',
  // Validaciones
  [

  ],
  actualizarMedico
)

router.delete('/:id', borrarMedico)


module.exports = router;
