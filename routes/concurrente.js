const express = require('express');
const app = express();
const Concurrente = require('../models/concurrente');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los concurrente
// ========================================
app.get('/', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Concurrente.find({})
  .skip(desde)
  .limit(5)
  .exec( (err, concurrentes) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar los concurrente'
      })
    }
    Concurrente.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      concurrentes: concurrentes
    })
    })
  })
});
// ========================================
// Obtener concurrente por id
// ========================================
app.get('/concurrente/:id', (req, res) => {
  const id = req.params.id;
  Concurrente.findById(id)
  .exec( (err, concurrente) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo buscar el concurrente'
      })
    }
    if ( !concurrente ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un concurrente con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      concurrente: concurrente
    })
  })
});
// ========================================
// Agregar concurrente
// ========================================
app.post('/agregar', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {
  const body = req.body;
  const concurrente = new Concurrente({
        nombre: body.nombre,
        dni: body.dni,
        fechadenacimiento: body.fechadenacimiento,
        sexo: body.sexo,
        direccion: body.direccion,
        barrio: body.barrio,
        localidad: body.localidad,
        provincia: body.provincia,
        estadocivil: body.estadocivil,
        telefono: body.telefono,
        celular: body.celular,
        correo: body.correo,
        cuil: body.cuil,
        cobertura: body.cobertura,
        numerobenef: body.numerobenef,
        alta: body.alta,
        baja: body.baja,
        cud: body.cud,
        vencimiento: body.vencimiento,
        imagen: body.imagen,
        jornada: body.jornada,
        diagnostico: body.diagnostico,
        tratamiento: body.tratamiento,
        equiporeferencia: body.equiporeferencia,
        responsable: {
            nombrefamiliar: body.nombrefamiliar,
            vinculofamiliar: body.vinculofamiliar,
            direccionfamiliar: body.direccionfamiliar,
            dnifamiliar: body.dnifamiliar,
            responsablefamiliar: body.responsablefamiliar,
            fechanacimientofamiliar: body.fechanacimientofamiliar,
            estadocivilfamiliar: body.estadocivilfamiliar,
            telefonofamiliar: body.telefonofamiliar,
            celularfamiliar: body.celularfamiliar,
            correofamiliar: body.correofamiliar,
            ocupacionfamiliar: body.ocupacionfamiliar,
            convivientefamiliar: body.convivientefamiliar
        },
        transporte: {
            nombretransporte: body.nombretransporte,
            contactotransporte: body.contactotransporte,
            cuittransporte: body.cuittransporte,
            direcciontransporte: body.direcciontransporte,
            ibtransporte: body.ibtransporte,
            situaciontransporte: body.situaciontransporte,
            telefonotransporte: body.telefonotransporte,
            celulartransporte: body.celulartransporte,
            correotransporte: body.correotransporte
        },
        asistenteterapeutico: {
            tieneasistente: body.tieneasistente,
            nombreasistente: body.nombreasistente,
            cuitasistente: body.cuitasistente,
            direccionasistente: body.direccionasistente,
            telefonoasistente: body.telefonoasistente,
            celularasistente: body.celularasistente,
            correoasistente: body.correoasistente,
            cuilasistente: body.cuilasistente,
            ibasistente: body.ibasistente,
            profesionasistente: body.profesionasistente
        },
        asistencia: {
            mananalunes: body.mananalunes,
            mananamartes: body.mananamartes,
            mananamiercoles: body.mananamiercoles,
            mananajueves: body.mananajueves,
            mananaviernes: body.mananaviernes,
            tardelunes: body.tardelunes,
            tardemartes: body.tardemartes,
            tardemiercoles: body.tardemiercoles,
            tardejueves: body.tardejueves,
            tardeviernes: body.tardeviernes
        },
        taller: {
            tmananalunes: body.tmananalunes,
            tmananamartes: body.tmananamartes,
            tmananamiercoles: body.tmananamiercoles,
            tmananajueves: body.tmananajueves,
            tmananaviernes: body.tmananaviernes,
            ttardelunes: body.ttardelunes,
            ttardemartes: body.ttardemartes,
            ttardemiercoles: body.ttardemiercoles,
            ttardejueves: body.ttardejueves,
            ttardeviernes: body.ttardeviernes
        }
    });
  concurrente.save((err, concurrenteGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear concurrente',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      concurrente: concurrenteGuardado
    })
  })
});
// ========================================
// Actualizar concurrente
// ========================================
app.put('/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Concurrente.findById(id, (err, concurrente) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar concurrente'
      })
    }
    if(!concurrente) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un concurrente con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
        concurrente.nombre = body.nombre;
        concurrente.dni = body.dni;
        concurrente.fechadenacimiento = body.fechadenacimiento;
        concurrente.sexo = body.sexo;
        concurrente.direccion = body.direccion;
        concurrente.barrio = body.barrio;
        concurrente.localidad = body.localidad;
        concurrente.provincia = body.provincia;
        concurrente.estadocivil = body.estadocivil;
        concurrente.telefono = body.telefono;
        concurrente.celular = body.celular;
        concurrente.correo = body.correo;
        concurrente.cuil = body.cuil;
        concurrente.cobertura = body.cobertura;
        concurrente.numerobenef = body.numerobenef;
        concurrente.alta = body.alta;
        concurrente.baja = body.baja;
        concurrente.cud = body.cud;
        concurrente.vencimiento = body.vencimiento;
        concurrente.imagen = body.imagen;
        concurrente.jornada = body.jornada;
        concurrente.diagnostico = body.diagnostico;
        concurrente.tratamiento = body.tratamiento;
        concurrente.equiporeferencia = body.equiporeferencia;
        concurrente.nombrefamiliar = body.nombrefamiliar;
        concurrente.vinculofamiliar = body.vinculofamiliar;
        concurrente.direccionfamiliar = body.direccionfamiliar;
        concurrente.dnifamiliar = body.dnifamiliar;
        concurrente.responsablefamiliar = body.responsablefamiliar;
        concurrente.fechanacimientofamiliar = body.fechanacimientofamiliar;
        concurrente.estadocivilfamiliar = body.estadocivilfamiliar;
        concurrente.telefonofamiliar = body.telefonofamiliar;
        concurrente.celularfamiliar = body.celularfamiliar;
        concurrente.correofamiliar = body.correofamiliar;
        concurrente.ocupacionfamiliar = body.ocupacionfamiliar;
        concurrente.convivientefamiliar = body.convivientefamiliar;
        concurrente.nombretransporte = body.nombretransporte;
        concurrente.contactotransporte = body.contactotransporte;
        concurrente.cuittransporte = body.cuittransporte;
        concurrente.direcciontransporte = body.direcciontransporte;
        concurrente.ibtransporte = body.ibtransporte;
        concurrente.situaciontransporte = body.situaciontransporte;
        concurrente.telefonotransporte = body.telefonotransporte;
        concurrente.celulartransporte = body.celulartransporte;
        concurrente.correotransporte = body.correotransporte;
        concurrente.tieneasistente = body.tieneasistente;
        concurrente.nombreasistente = body.nombreasistente;
        concurrente.cuitasistente = body.cuitasistente;
        concurrente.direccionasistente = body.direccionasistente;
        concurrente.telefonoasistente = body.telefonoasistente;
        concurrente.celularasistente = body.celularasistente;
        concurrente.correoasistente = body.correoasistente;
        concurrente.cuilasistente = body.cuilasistente;
        concurrente.ibasistente = body.ibasistente;
        concurrente.profesionasistente = body.profesionasistente;
        concurrente.mananalunes = body.mananalunes;
        concurrente.mananamartes = body.mananamartes;
        concurrente.mananamiercoles = body.mananamiercoles;
        concurrente.mananajueves = body.mananajueves;
        concurrente.mananaviernes = body.mananaviernes;
        concurrente.tardelunes = body.tardelunes;
        concurrente.tardemartes = body.tardemartes;
        concurrente.tardemiercoles = body.tardemiercoles;
        concurrente.tardejueves = body.tardejueves;
        concurrente.tardeviernes = body.tardeviernes;
        concurrente.tmananalunes = body.tmananalunes;
        concurrente.tmananamartes = body.tmananamartes;
        concurrente.tmananamiercoles = body.tmananamiercoles;
        concurrente.tmananajueves = body.tmananajueves;
        concurrente.tmananaviernes = body.tmananaviernes;
        concurrente.ttardelunes = body.ttardelunes;
        concurrente.ttardemartes = body.ttardemartes;
        concurrente.ttardemiercoles = body.ttardemiercoles;
        concurrente.ttardejueves = body.ttardejueves;
        concurrente.ttardeviernes = body.ttardeviernes;
    concurrente.save((err, concurrenteGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al agregar concurrente',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      concurrente: concurrenteGuardado
    })
  })
  })
});
// ========================================
// Eliminar concurrente por id
// ========================================
app.delete('/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE],  (req, res) => {
  const id = req.params.id;
  Concurrente.findByIdAndRemove(id)
  .exec( (err, concurrenteBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el concurrente'
      })
    }
    if ( !concurrenteBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un concurrente con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'El concurrente fue eliminado',
      concurrente: concurrenteBorrado
    })
  })
});
module.exports = app;