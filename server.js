const dotenv =require('dotenv');
dotenv.config();

//importamos la config del servidor
const app = require('./app');

//Importamos la conexión a la base de datos
const connectDB = require('./conexion/conecctionMongo');

//Importamos el puerto del archivo .env
const PORT = process.env.PORT || 4000; // Puerto por defecto o el especificado en el archivo .env

//Importamos la URL de conexión a la base de datos
const MONGO_URI = process.env.MONGO_ATLAS;

connectDB(MONGO_URI);

app.listen(PORT,() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});