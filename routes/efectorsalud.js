const express = require('express');
const app = express();
const EfectorSalud = require('../models/efectorsalud');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los efectore de ssalud
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  EfectorSalud.find({})
  .skip(desde)
  .limit(5)
  .exec( (err, efectoressalud) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar los efector de salud'
      })
    }
    EfectorSalud.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      efectoressalud: efectoressalud
    })
    })
  })
});
// ========================================
// Obtener un efector de salud por id
// ========================================
app.get('/efectorsalud/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const id = req.params.id;
  EfectorSalud.findById(id)
  .exec( (err, efectorsalud) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar el efector de salud'
      })
    }
    if ( !efectorsalud ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un efector de salud con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      efectorsalud: efectorsalud
    })
  })
});
// ========================================
// Agregar un efector de salud
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const efectorsalud = new EfectorSalud({
        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        celular: body.celular,
        correo: body.correo,
        contacto: body.contacto,
        distrito: body.distrito,
        observacion: body.observacion
    });
  efectorsalud.save((err, efectorsaludGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear un efector de salud',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      efectorsalud: efectorsaludGuardado
    })
  })
});
// ========================================
// Actualizar efector de salud
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const body = req.body;
  const id = req.params.id;
  EfectorSalud.findById(id, (err, efectorsalud) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar efector de salud'
      })
    }
    if(!efectorsalud) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un efector de salud con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
    efectorsalud.nombre = body.nombre;
    efectorsalud.direccion = body.direccion;
    efectorsalud.telefono = body.telefono;
    efectorsalud.celular = body.celular;
    efectorsalud.correo = body.correo;
    efectorsalud.contacto = body.contacto;
    efectorsalud.distrito = body.distrito;
    efectorsalud.observacion = body.observacion;

    efectorsalud.save((err, efectorsaludGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al agregar efector de salud',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      efectorsalud: efectorsaludGuardado
    })
  })
  })
});
// ========================================
// Eliminar efectorsalud por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const id = req.params.id;
  EfectorSalud.findByIdAndRemove(id)
  .exec( (err, efectorsaludBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el efector de salud'
      })
    }
    if ( !efectorsaludBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un efector de salud con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'El efector de salud fue eliminado',
      efectorsalud: efectorsaludBorrado
    })
  })
});
module.exports = app;