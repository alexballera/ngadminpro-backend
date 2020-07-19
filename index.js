const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Creamos el servidor
const app = express();

// Base de datos
dbConnection()


// aJtR46ckGunyhx6
// user_admin

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola Mundo'
  })
})

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
