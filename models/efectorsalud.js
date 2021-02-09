const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const efectorSaludSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  direccion: { type: String, required: [true, 'La direccion es necesaria'] },
  telefono: { type: String, required: [true, 'El telefono es necesario'] },
  celular: { type: String, required: [true, 'El celular es necesario'] },
  correo: { type: String, required: [true, 'El correo es necesario'], },
  contacto: { type: String, required: [true, 'El correo es necesario'], },
  distrito: { type: String, required: [true, 'El distrito es necesario'], },
  observacion: { type: String, required: false }
}, { collection: 'efectoressalud' }); efectorSaludSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('EfectorSalud', efectorSaludSchema);