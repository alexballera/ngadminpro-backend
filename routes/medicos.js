/** 
 * Rutas: /api/medicos
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

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
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().notEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos,
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
