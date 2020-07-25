require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Creamos el servidor
const app = express();

// Config CORS
app.use(cors())

// Lectura de y parseo del body
app.use(express.json());

// Base de datos
dbConnection()


// aJtR46ckGunyhx6
// user_admin

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT + ' Click ~> ' + 'http://localhost:' + process.env.PORT);
})
