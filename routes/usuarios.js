/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/', getUsuarios)

router.post('/',
  // Validaciones
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuarios
)

router.put('/:id',
  // Validaciones
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
)


module.exports = router;
