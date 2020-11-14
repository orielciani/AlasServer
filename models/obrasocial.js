const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const obraSocialSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre de la obra social es  necesaria'] },
  direccion: { type: String, required: [true, 'La direccion es necesaria'] },
  ciudad: { type: String, required: [true, 'La ciudad es necesaria'] },
  codpos: { type: String, required: [true, 'El CODPOS es necesario'] },
  provincia: { type: String, required: [true, 'La provincia es necesaria'], },
  ci: { type: String, required: [true, 'La condicion de iva es necesaria'], },
  cuit: { type: String, unique: true, required: [true, 'El CUIT es necesario'], },
  ib: { type: String, required: [true, 'Los ingresos brutos es necesario'], },
  telefono: { type: String, required: [true, 'El telefono es necesario'], },
  celular: { type: String, required: [true, 'El celular es necesario'], },
  contacto: { type: String, required: [true, 'El contacto es necesario'], },
  correo: { type: String, required: [true, 'El correo es necesario'], },
  otros: { type: String, required: false, },
  img: { type: String, required: false, }
}, { collection: 'obrassociales' });
obraSocialSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser unico, y ese ya esta en uso' });
module.exports = mongoose.model('ObraSocial', obraSocialSchema);