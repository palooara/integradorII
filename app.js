//Configuramos nuestro servidor
//1. Librerías

const express = require('express'); //framework para crear servidores
const morgan = require('morgan');// middleware para registrar las peticiones HTTP
const hbs = require('hbs');// motor de plantillas para renderizar html
const path = require('path'); //librería para trabajar con rutas
const apiRouter = require('./routes/datosProductosRouter'); //rutas de la API
const authRouter = require('./routes/authRouter'); //rutas de autenticación

const session = require('express-session');


//2.Creamos el servidor
const app = express(); 

//3.Aplicamos los middlewares
app.use(morgan('dev')); //registrar las peticiones HTTP en la consola
app.use(express.json()); //parsear el cuerpo de las peticiones a JSON

app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioId || null;
  res.locals.nombreUsuario = req.session.nombreUsuario || null; // ← Esto también
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
const pagesRouter = require('./routes/pagesRouter');

//7. Usamos las rutas
app.use('/', pagesRouter);
app.use('/api', apiRouter); //rutas de la API
app.use('/auth', authRouter); //rutas de autenticación

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