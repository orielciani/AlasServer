const express = require('express');
const app = express();
const ObraSocial = require('../models/obrasocial');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todass las obras sociales
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  ObraSocial.find({})
  .skip(desde)
  .limit(5)
    .exec((err, obrasSociales) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo buscar las obras sociales'
        })
      }
      ObraSocial.count({}, (err, conteo) => {
        if ( err ) {
        return res.status(500).json({
        ok: false,
        message: 'No se pudo enviar'
        })
      }
      return res.status(200).json({
        ok: true,
        conteo: conteo,
        obrasSociales: obrasSociales
      })
      })
    })
});
// ========================================
// Obtener obra social por id
// ========================================
app.get('/obrasocial/:id', (req, res) => {
  const id = req.params.id;
  ObraSocial.findById(id)
    .exec((err, obrasocial) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo buscar la obra social'
        })
      }
      if (!obrasocial) {
        return res.status(400).json({
          ok: false,
          message: 'No existe una obra social con el id ' + id
        })
      }
      res.status(200).json({
        ok: true,
        obrasocial: obrasocial
      })
    })
});
// ========================================
// Agregar obra social
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const obrasocial = new ObraSocial({
    nombre: body.nombre,
    direccion: body.direccion,
    ciudad: body.ciudad,
    codpos: body.codpos,
    provincia: body.provincia,
    ci: body.ci,
    cuit: body.cuit,
    ib: body.ib,
    telefono: body.telefono,
    celular: body.celular,
    contacto: body.contacto,
    correo: body.correo,
    otros: body.otros
  });
  obrasocial.save((err, obrasocialGuardada) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear obra social',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      obrasocial: obrasocialGuardada
    })
  })
});
// ========================================
// Actualizar obra social
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const id = req.params.id;
  ObraSocial.findById(id, (err, obrasocial) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar obra social'
      })
    }
    if (!obrasocial) {
      return res.status(400).json({
        ok: false,
        message: 'No existe una obra social con el id ' + id + ' por lo tanto no se puede actualizar'
      })
    }
    obrasocial.nombre = body.nombre;
    obrasocial.direccion = body.direccion;
    obrasocial.ciudad = body.ciudad;
    obrasocial.codpos = body.codpos;
    obrasocial.provincia = body.provincia;
    obrasocial.ci = body.ci;
    obrasocial.cuit = body.cuit;
    obrasocial.ib = body.ib;
    obrasocial.telefono = body.telefono;
    obrasocial.celular = body.celular;
    obrasocial.contacto = body.contacto;
    obrasocial.correo = body.correo;
    obrasocial.otros = body.otros;
    obrasocial.save((err, obrasocialGuardada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al agregar obra social',
          error: err
        })
      }
      return res.status(201).json({
        ok: true,
        obrasocial: obrasocialGuardada
      })
    })
  })
});
// ========================================
// Eliminar obra social por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const id = req.params.id;
  ObraSocial.findByIdAndRemove(id)
    .exec((err, obrasocialBorrada) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo eliminar el obra social'
        })
      }
      if (!obrasocialBorrada) {
        return res.status(400).json({
          ok: false,
          message: 'No existe una obra social con el id: ' + id + ' no existe'
        })
      }
      res.status(200).json({
        ok: true,
        message: 'La obra social fue eliminada',
        obrasocial: obrasocialBorrada
      })
    })
});
module.exports = app;