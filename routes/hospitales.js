/** 
 * Rutas: /api/hospitales
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

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
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().notEmpty(),
    validarCampos,
  ],
  crearHospital
)

router.put('/:id',
  // Validaciones
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().notEmpty(),
    validarCampos,
  ],
  actualizarHospital
)

router.delete('/:id', borrarHospital)


module.exports = router;
