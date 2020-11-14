const Concurrente = require('./models/concurrente');
const EfectorSalud = require('./models/efectorsalud');
const Institucion = require('./models/institucion');
const ObraSocial = require('./models/obrasocial');
const Profesional = require('./models/profesional');
const Proveedor = require('./models/proveedor');
const Usuario = require('./models/usuario');
const AgendaContacto = require('./models/agendacontacto');

exports.buscarAgendaContactos = function buscarAgendaContactos(busqueda, regex) {
  return new Promise((resolve, reject) => {
    AgendaContacto.find({})
    .or([{ 'nombre': regex }, { 'correo': regex }, { 'telefono': regex }, { 'celular': regex }, { 'institucion': regex }])
      .exec((err, contactos) => {
      if (err) {
        reject('Error al buscar efectores de Salud', err);
      } else {
        resolve(contactos);
      }
    });
  });
}
exports.buscarInstituciones = function buscarInstituciones(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Institucion.find({})
    .or([{ 'denominacion': regex }, { 'ciudad': regex }, { 'provincia': regex }, { 'cuit': regex }, { 'telefono': regex }])
      .exec((err, instituciones) => {
      if (err) {
        reject('Error al buscar efectores de Salud', err);
      } else {
        resolve(instituciones);
      }
    });
  });
}
exports.buscarEfectoresSalud = function buscarEfectoresSalud(busqueda, regex) {
  return new Promise((resolve, reject) => {
    EfectorSalud.find({})
    .or([{ 'nombre': regex }, { 'correo': regex }, { 'telefono': regex }, { 'celular': regex }, { 'distrito': regex }])
      .exec((err, efectores) => {
      if (err) {
        reject('Error al buscar efectores de Salud', err);
      } else {
        resolve(efectores);
      }
    });
  });
}
exports.buscarProfesionales = function buscarProfesionales(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Profesional.find({})
    .or([{ 'nombre': regex }, { 'dni': regex }, { 'telefono': regex }, { 'celular': regex }, { 'profesion': regex }])
    .exec((err, profesionales) => {
      if (err) {
        reject('Error al buscar profesionales', err);
      } else {
        resolve(profesionales);
      }
    });
  });
}
exports.buscarProveedores = function buscarProveedores(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Proveedor.find({})
    .or([{ 'denominacion': regex }, { 'direccion': regex }, { 'telefono': regex }, { 'celular': regex }, { 'cuit': regex }])
      .exec((err, proveedores) => {
      if (err) {
        reject('Error al buscar proveedores', err);
      } else {
        resolve(proveedores);
      }
    });
  });
}
exports.buscarObrasSociales = function buscarObrasSociales(busqueda, regex) {
  return new Promise((resolve, reject) => {
    ObraSocial.find({})
    .or([{ 'nombre': regex }, { 'direccion': regex }, { 'telefono': regex }, { 'celular': regex }, { 'ciudad': regex }])
    .exec((err, obrassociales) => {
      if (err) {
        reject('Error al buscar profesionales', err);
      } else {
        resolve(obrassociales);
      }
    });
  });
}
exports.buscarConcurrentes = function buscarConcurrentes(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Concurrente.find({})
    .or([{'nombre': regex}, {'dni': regex}])
    .exec((err, concurrentes) => {
      if (err) {
        reject('Error al buscar concurrentes', err);
      } else {
        resolve(concurrentes);
      }
    });
  });
}
exports.buscarUsuarios = function buscarUsuarios(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Usuario.find({}, 'nombre email img')
      .or([{ 'nombre': regex }, { 'email': regex }])
      .exec((err, usuarios) => {
        if (err) {
          reject('Error al buscar usuarios', err);
        } else {
          resolve(usuarios);
        }
      });
  });
}