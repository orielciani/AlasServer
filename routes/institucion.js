const express = require('express');
const app = express();
const Institucion = require('../models/institucion');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todass las instituciones
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Institucion.find({})
  .skip(desde)
    .limit(5)
    .exec((err, instituciones) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo buscar las instituciones'
        })
      }
      Institucion.count({}, (err, conteo) => {
        if ( err ) {
        return res.status(500).json({
        ok: false,
        message: 'No se pudo enviar'
        })
      }
      return res.status(200).json({
        ok: true,
        conteo: conteo,
        instituciones: instituciones
      })
      })
    })
});
// ========================================
// Obtener institucion por id
// ========================================
app.get('/institucion/:id', (req, res) => {
  const id = req.params.id;
  Institucion.findById(id)
    .exec((err, institucion) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo buscar la institucion'
        })
      }
      if (!institucion) {
        return res.status(400).json({
          ok: false,
          message: 'No existe una institucion con el id ' + id
        })
      }
      res.status(200).json({
        ok: true,
        institucion: institucion
      })
    })
});
// ========================================
// Agregar institucion
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const institucion = new Institucion({
        denominacion: body.denominacion,
        direccion: body.direccion,
        ciudad: body.ciudad,
        codpos: body.codpos,
        provincia: body.provincia,
        ci: body.ci,
        cuit: body.cuit,
        ib: body.ib,
        telefono: body.telefono,
        celular: body.celular,
        correo: body.correo,
        contacto: body.contacto,
        contactocel: body.contactocel,
        contactocorreo: body.contactocorreo,
        web: body.web,
        otros: body.otros

    });
  institucion.save((err, institucionGuardada) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear institucion',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      institucion: institucionGuardada
    })
  })
});
// ========================================
// Actualizar institucion
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Institucion.findById(id, (err, institucion) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar institucion'
      })
    }
    if (!institucion) {
      return res.status(400).json({
        ok: false,
        message: 'No existe una institucion con el id ' + id + ' por lo tanto no se puede actualizar'
      })
    }
    institucion.denominacion = body.denominacion;
    institucion.provincia = body.provincia;
    institucion.ciudad = body.ciudad;
    institucion.direccion = body.direccion;
    institucion.codpos = body.codpos;
    institucion.cuit = body.cuit;
    institucion.ci = body.ci;
    institucion.ib = body.ib;
    institucion.telefono = body.telefono;
    institucion.celular = body.celular;
    institucion.correo = body.correo;
    institucion.contacto = body.contacto;
    institucion.contactocel = body.contactocel;
    institucion.contactocorreo = body.contactocorreo;
    institucion.web = body.web;
    institucion.otros = body.otros;
    institucion.save((err, institucionGuardada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al agregar institucion',
          error: err
        })
      }
      return res.status(201).json({
        ok: true,
        institucion: institucionGuardada
      })
    })
  })
});
// ========================================
// Eliminar institucion por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const id = req.params.id;
  Institucion.findByIdAndRemove(id)
    .exec((err, institucionBorrada) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'No se pudo eliminar el institucion'
        })
      }
      if (!institucionBorrada) {
        return res.status(400).json({
          ok: false,
          message: 'No existe una institucion con el id: ' + id + ' no existe'
        })
      }
      res.status(200).json({
        ok: true,
        message: 'La institucion fue eliminada',
        institucion: institucionBorrada
      })
    })
});
module.exports = app;