require('dotenv').config(); // Cargar variables de entorno desde .env

const pgp = require('pg-promise')();
const connectionString = process.env.DB_URL; // Utiliza la variable de entorno DB_URL

const db = pgp(connectionString);


db.connect()
  .then(() => {
    const fs = require('fs');
    fs.readFile('db.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo db.txt:', err);
        return;
      }

      // Divide el contenido en líneas
      const lines = data.split('\n');

      // Procesa cada línea para obtener las palabras de origen y sus traducciones
      lines.forEach((line) => {
        const [origen, traducciones] = line.split('-');

        // Divide las traducciones y palabras de origen en palabras individuales
        const palabrasOriginales = origen.split(',');
        const traduccionesIndividuales = traducciones.split(',');
        palabrasOriginales.forEach(palabraOriginal => {
          traduccionesIndividuales.forEach(traduccion => {
            console.log(palabraOriginal + "-" + traduccion + "\n");
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
