require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Creamos el servidor
const app = express();

// Config CORS
app.use(cors())

// Base de datos
dbConnection()


// aJtR46ckGunyhx6
// user_admin

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + 'http://localhost:' + process.env.PORT);
})
