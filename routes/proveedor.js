const express = require('express');
const app = express();
const Proveedor = require('../models/proveedor');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los proveedores
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Proveedor.find({})
  .skip(desde)
  .limit(5)
  .exec( (err, proveedores) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar los  proveedores'
      })
    }
    Proveedor.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      proveedores: proveedores
    })
    })
  })
});
// ========================================
// Obtener proveedor por id
// ========================================
app.get('/proveedor/:id', (req, res) => {
  const id = req.params.id;
  Proveedor.findById(id)
  .exec( (err, proveedor) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar el proveedor'
      })
    }
    if ( !proveedor ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un proveedor con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      proveedor: proveedor
    })
  })
});
// ========================================
// Agregar proveedor
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const proveedor = new Proveedor({
        denominacion: body.denominacion,
        direccion: body.direccion,
        ciudad: body.ciudad,
        cp: body.cp,
        provincia: body.provincia,
        ci: body.ci,
        cuit: body.cuit,
        telefono: body.telefono,
        celular: body.celular,
        correo: body.correo,
        contacto: body.contacto,
        actividad: body.actividad
    });
  proveedor.save((err, proveedorGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear proveedor',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      proveedor: proveedorGuardado
    })
  })
});
// ========================================
// Actualizar proveedor
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Proveedor.findById(id, (err, proveedor) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar proveedor'
      })
    }
    if(!proveedor) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un proveedor con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
    if(!proveedor.denominacion || !proveedor.direccion || !proveedor.ciudad || !proveedor.cp || !proveedor.provincia || !proveedor.ci || !proveedor.cuit || !proveedor.telefono
      || !proveedor.celular || !proveedor.correo || !proveedor.contacto || !proveedor.actividad) {
      return res.status(400).json({
        ok: false,
        message: 'Uno o mas campos no fueron llenados, y todos son necesarios'
      })
      }
    proveedor.denominacion = body.denominacion;
    proveedor.direccion = body.direccion;
    proveedor.ciudad = body.ciudad;
    proveedor.cp = body.cp;
    proveedor.provincia = body.provincia;
    proveedor.ci = body.ci;
    proveedor.cuit = body.cuit;
    proveedor.telefono = body.telefono;
    proveedor.celular = body.celular;
    proveedor.correo = body.correo;
    proveedor.contacto = body.contacto;
    proveedor.actividad = body.actividad;
    proveedor.save((err, proveedorGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al agregar proveedor',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      proveedor: proveedorGuardado
    })
  })
  })
});
// ========================================
// Eliminar proveedor por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const id = req.params.id;
  Proveedor.findByIdAndRemove(id)
  .exec( (err, proveedorBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el proveedor'
      })
    }
    if ( !proveedorBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un proveedor con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'proveedor eliminado',
      proveedor: proveedorBorrado
    })
  })
});
module.exports = app;