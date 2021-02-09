const express = require('express');
const app = express();
const AgendaContacto = require('../models/agendacontacto');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los contactos
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  AgendaContacto.find({})
  .skip(desde)
  .limit(5)
  .exec( (err, contactos) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar los  contactos'
      })
    }
    AgendaContacto.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      contactos: contactos
    })
    })
  })
});
// ========================================
// Obtener contacto por id
// ========================================
app.get('/contacto/:id', (req, res) => {
  const id = req.params.id;
  AgendaContacto.findById(id)
  .exec( (err, contacto) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar el contacto'
      })
    }
    if ( !contacto ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un contacto con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      contacto: contacto
    })
  })
});
// ========================================
// Agregar contacto
// ========================================
app.post('/agregar', (req, res) => {
  const body = req.body;
  const contacto = new AgendaContacto({
        nombre: body.nombre,
        correo: body.correo,
        telefono: body.telefono,
        celular: body.celular,
        institucion: body.institucion,
        horario: body.horario
    });
  contacto.save((err, contactoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear contacto',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      contacto: contactoGuardado
    })
  })
});
// ========================================
// Actualizar contacto
// ========================================
app.put('/actualizar/:id',  (req, res) => {
  const body = req.body;
  const id = req.params.id;
  AgendaContacto.findById(id, (err, contacto) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar contacto'
      })
    }
    if(!contacto) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un contacto con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
        contacto.nombre = body.nombre;
        contacto.correo = body.correo;
        contacto.telefono = body.telefono;
        contacto.celular = body.celular;
        contacto.institucion = body.institucion;
        contacto.horario = body.horario;
    contacto.save((err, contactoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al agregar contacto',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      contacto: contactoGuardado
    })
  })
  })
});
// ========================================
// Eliminar contacto por id
// ========================================
app.delete('/eliminar/:id',  (req, res) => {
  const id = req.params.id;
  AgendaContacto.findByIdAndRemove(id)
  .exec( (err, contactoBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el contacto'
      })
    }
    if ( !contactoBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un contacto con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'Contacto eliminado',
      contacto: contactoBorrado
    })
  })
});
module.exports = app;