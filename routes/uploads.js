/** 
 * Rutas: /api/uploads/
*/
const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload)

module.exports = router;
