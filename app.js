require('dotenv').config(); // Cargar variables de entorno desde .env

const pgp = require('pg-promise')();
const connectionString = process.env.DB_URL; // Utiliza la variable de entorno DB_URL

const db = pgp(connectionString);


db.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
