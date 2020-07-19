const express = require('express');
const { dbConnection } = require('./database/config');

// Creamos el servidor
const app = express();

// Base de datos
dbConnection()

// aJtR46ckGunyhx6
// user_admin

const port = 3000;

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola Mundo'
  })
})

app.listen(port, () => {
  console.log('Servidor corriendo en puerto ' + port);
})
