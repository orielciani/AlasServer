const express = require('express');
const app = express();
const Profesional = require('../models/profesional');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los profesionales
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Profesional.find({})
  .skip(desde)
  .limit(5)
  .exec( (err, profesionales) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar los profesionales'
      })
    }
    Profesional.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      profesionales: profesionales
    })
    })
  })
});
// ========================================
// Obtener profesional por id
// ========================================
app.get('/profesional/:id', (req, res) => {
  const id = req.params.id;
  Profesional.findById(id)
  .exec( (err, profesional) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar el profesional'
      })
    }
    if ( !profesional ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un profesional con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      profesional: profesional
    })
  })
});
// ========================================
// Agregar profesional
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const profesional = new Profesional({
        nombre: body.nombre,
        dni: body.dni,
        direccion: body.direccion,
        ciudad: body.ciudad,
        provincia: body.provincia,
        nacimiento: body.nacimiento,
        cuit: body.cuit,
        ib: body.ib,
        telefono: body.telefono,
        celular: body.celular,
        correo: body.correo,
        cbu: body.cbu,
        profesion: body.profesion,
        alta: body.alta,
        baja: body.baja,
        seguro: body.seguro,
        imagen: body.imagen,
                inicioLunes: body.inicioLunes,
                finalLunes: body.finalLunes,
                actividadLunes: body.actividadLunes,
                inicioMartes: body.inicioMartes,
                finalMartes: body.finalMartes,
                actividadMartes: body.actividadMartes,
                inicioMiercoles: body.inicioMiercoles,
                finalMiercoles: body.finalMiercoles,
                actividadMiercoles: body.actividadMiercoles,
                inicioJueves: body.inicioJueves,
                finalJueves: body.finalJueves,
                actividadJueves: body.actividadJueves,
                inicioViernes: body.inicioViernes,
                finalViernes: body.finalViernes,
                actividadViernes: body.actividadViernes,

    });
  profesional.save((err, profesionalGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear profesional',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      profesional: profesionalGuardado
    })
  })
});
// ========================================
// Actualizar profesional
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Profesional.findById(id, (err, profesional) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar profesional'
      })
    }
    if(!profesional) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un profesional con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
    profesional.nombre = body.nombre;
    profesional.dni = body.dni;
    profesional.direccion = body.direccion;
    profesional.ciudad = body.ciudad;
    profesional.provincia = body.provincia;
    profesional.nacimiento = body.nacimiento;
    profesional.telefono = body.telefono;
    profesional.celular = body.celular;
    profesional.correo = body.correo;
    profesional.cuit = body.cuit;
    profesional.ib = body.ib;
    profesional.cbu = body.cbu;
    profesional.alta = body.alta;
    profesional.baja = body.baja;
    profesional.profesion = body.profesion;
    profesional.imagen = body.imagen;
    profesional.seguro = body.seguro;
    profesional.actividadLunes = body.actividadLunes;
    profesional.actividadMartes = body.actividadMartes;
    profesional.actividadMiercoles = body.actividadMiercoles;
    profesional.actividadJueves = body.actividadJueves;
    profesional.actividadViernes = body.actividadViernes;
    profesional.inicioMartes = body.inicioMartes;
    profesional.finalMartes = body.finalMartes;
    profesional.inicioMiercoles = body.inicioMiercoles;
    profesional.finalMiercoles = body.finalMiercoles;
    profesional.inicioJueves = body.inicioJueves;
    profesional.finalJueves = body.finalJueves;
    profesional.inicioViernes = body.inicioViernes;
    profesional.finalViernes = body.finalViernes;


    profesional.save((err, profesionalGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al agregar profesional',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      profesional: profesionalGuardado
    })
  })
  })
});
// ========================================
// Eliminar profesional por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const id = req.params.id;
  Profesional.findByIdAndRemove(id)
  .exec( (err, profesionalBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el profesional'
      })
    }
    if ( !profesionalBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un profesional con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'El profesional fue eliminado',
      profesional: profesionalBorrado
    })
  })
});
module.exports = app;