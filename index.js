const express = require('express');

// Creamos el servidor
const app = express()

const port = 3000;

app.listen(port, () => {
  console.log('Servidor corriendo en puerto ' + port);
})
