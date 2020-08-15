const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

  try {
    await mongoose.connect(`mongodb+srv://user_admin:${process.env.DB_CNN}.mongodb.net/hospitaldb`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('DB online');

  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar DB')
  }
}

module.exports = {
  dbConnection
}
