const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const proveedorSchema = new Schema({
  denominacion: { type: String, required: [true, 'El nombre es necesario'] },
  direccion: { type: String, required: [false, 'La direccion es necesaria'] },
  ciudad: { type: String, required: [false, 'La ciudad es necesaria'] },
  cp: { type: String, required: [false, 'El codigo postal es necesariao'] },
  provincia: { type: String, required: [false, 'La provincia es necesaria'] },
  ci: { type: String, required: [false, 'El ci es necesario'] },
  cuit: { type: String, unique: true, required: [true, 'El cuit es necesario'] },
  telefono: { type: String, required: [false, 'El telefono es necesario'] },
  celular: { type: String, required: [false, 'El celular es necesario'] },
  correo: { type: String, required: [false, 'El correo es necesario'] },
  contacto: { type: String, required: [true, 'El contacto es necesario'] },
  actividad: { type: String, required: false }

}// , { collection: 'proveedores' }
);

proveedorSchema.plugin(uniqueValidator, { message: 'El {PATH} ya esta en uso' });

module.exports = mongoose.model('Proveedor', proveedorSchema);