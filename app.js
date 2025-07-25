//Configuramos nuestro servidor
//1. Librerías

const express = require('express'); //framework para crear servidores
const morgan = require('morgan');// middleware para registrar las peticiones HTTP
const hbs = require('hbs');// motor de plantillas para renderizar html
const path = require('path'); //librería para trabajar con rutas
const MongoStore = require('connect-mongo');
require('dotenv').config(); 
const session = require('express-session');


//2.Creamos el servidor
const app = express(); 

//3.Aplicamos los middlewares
app.use(morgan('dev')); //registrar las peticiones HTTP en la consola
app.use(express.json()); //parsear el cuerpo de las peticiones a JSON

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/integradorii',
    ttl: 60 * 60 * 24 // sesión dura 1 día (en segundos)
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // cookie también dura 1 día
  }
}));

app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioId || null;
  res.locals.nombreUsuario = req.session.nombreUsuario || null;
  next();
});

app.use(express.urlencoded({ extended: true })); //parsear el cuerpo de las peticiones a URL-encoded

app.use(express.static(path.join(__dirname, 'public'))); //servir archivos estáticos desde la carpeta public

//4.Configuramos el motor de plantillas
app.set('view engine', 'hbs');

// 5. Configuramos las rutas de hbs
app.set('views', path.join(__dirname, 'views')); //configurar la carpeta de vistas

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// 6. Importamos las rutas
const apiRouter = require('./routes/datosProductosRouter'); //rutas de la API
const authRouter = require('./routes/authRouter'); //rutas de autenticación
const pagesRouter = require('./routes/pagesRouter');// rutas a las páginas

//7. Usamos las rutas
app.use('/api', apiRouter); //rutas de la API
app.use('/auth', authRouter); //rutas de autenticación
app.use('/', pagesRouter); // rutas a las páginas

//8. Middleware para manejar errores 404 y 500
// Middleware para manejar rutas no encontradas
app.use((req, res) =>{
    console.log('Ruta no encontrada:' + req.url);
    res.status(404).send('<h1>404-Página no encontrada</h1>');
});


// Middleware para manejar errores internos del servidor
app.use((err, req, res, next) => {
    console.error( err.stack);
    res.status(500).send('<h1>500-Error interno del servidor</h1>');
});

//Exportamos el servidor
module.exports = app;