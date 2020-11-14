const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const proveedorSchema = new Schema({
  denominacion: { type: String, required: [true, 'El nombre es necesario'] },
  direccion: { type: String, required: [true, 'La direccion es necesaria'] },
  ciudad: { type: String, required: [true, 'La ciudad es necesaria'] },
  cp: { type: String, required: [true, 'El codigo postal es necesariao'] },
  provincia: { type: String, required: [true, 'La provincia es necesaria'] },
  ci: { type: String, required: [true, 'El ci es necesario'] },
  cuit: { type: String, unique: true, required: [true, 'El cuit es necesario'] },
  telefono: { type: String, required: [true, 'El telefono es necesario'] },
  celular: { type: String, required: [true, 'El celular es necesario'] },
  correo: { type: String, required: [true, 'El correo es necesario'] },
  contacto: { type: String, required: [true, 'El contacto es necesario'] },
  actividad: { type: String, required: false }

}// , { collection: 'proveedores' }
);

proveedorSchema.plugin(uniqueValidator, { message: 'Ese {PATH} ya esta en uso' });

module.exports = mongoose.model('Proveedor', proveedorSchema);