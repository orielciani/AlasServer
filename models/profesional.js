const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const profesionalSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  dni: { type: String, unique: true, required: false },
  direccion: { type: String, required: false },
  ciudad: { type: String, required: false },
  provincia: { type: String, required: false },
  nacimiento: { type: String, required: false },
  telefono: { type: String, required: false },
  celular: { type: String, required: false },
  correo: { type: String, required: false },
  cuit: { type: String, required: false },
  ib: { type: String, required: false },
  cbu: { type: String, required: false },
  profesion: { type: String, required: false },
  taller: { type: String, required: false },
  alta: { type: String, required: false },
  baja: { type: String, required: false },
  seguro: { type: String, required: false },
  imagen: { type: String, required: false },
  asistencia: [{
    lunes: [{
      horarioLunes: { type: String, required: false },
      actividadLunes: { type: String, required: false }
    }],
    martes: [{
      horarioMartes: { type: String, required: false },
      actividadMartes: { type: String, required: false }
    }],
    miercoles: [{
      horarioMiercoles: { type: String, required: false },
      actividadMiercoles: { type: String, required: false }
    }],
    jueves: [{
      horarioJueves: { type: String, required: false },
      actividadJueves: { type: String, required: false }
    }],
    viernes: [{
      horarioViernes: { type: String, required: false },
      actividadViernes: { type: String, required: false }
    }],

  }]


}, { collection: 'profesionales' });

profesionalSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Profesionales', profesionalSchema);