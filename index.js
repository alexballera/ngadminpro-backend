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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT + ' Click ~> ' + 'http://localhost:' + process.env.PORT);
})
