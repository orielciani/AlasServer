// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Var
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports of routes
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');
const proveedorRoutes = require('./routes/proveedor');
const profesionalRoutes = require('./routes/profesional');
const obrasocialRoutes = require('./routes/obrasocial');
const efectorsaludRoutes = require('./routes/efectorsalud');
const institucionRoutes = require('./routes/institucion');
const agendacontactoRoutes = require('./routes/agendacontacto');
const concurrenteRoutes = require('./routes/concurrente');
const busquedaRoutes = require('./routes/busqueda');


// Connecting to database via Mongo Atlas
const url = "Escondido";
mongoose.connection.openUri(url, (err, res) => {
  if (err) throw err;
  console.log('Base de datos Mongodb: ONLINE');
});

// Routes
app.use('/busqueda', busquedaRoutes);
app.use('/concurrentes', concurrenteRoutes);
app.use('/agendacontactos', agendacontactoRoutes);
app.use('/instituciones', institucionRoutes);
app.use('/efectoressalud', efectorsaludRoutes);
app.use('/obrassociales', obrasocialRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/profesionales', profesionalRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Petitions
app.listen(process.env.PORT, process.env.YOUR_HOST, () => {
  console.log('Server ON');
});
