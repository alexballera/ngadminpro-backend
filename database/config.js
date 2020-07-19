const mongoose = require('mongoose');

const dbConnection = async() => {

  try {
    await mongoose.connect('mongodb+srv://user_admin:aJtR46ckGunyhx6@cluster0.2ezrj.mongodb.net/hospitaldb', {
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
