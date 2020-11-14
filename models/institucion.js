const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const institucionSchema = new Schema({
    denominacion: { type: String, required: [true, 'El nombre es necesario'] },
    direccion: { type: String, unique: true, required: [true, 'La direccion es necesaria'] },
    ciudad: { type: String, required: [true, 'La ciudad es necesaria'] },
    codpos: { type: String, required: [true, 'El codpos es necesario'] },
    provincia: { type: String, required: [true, 'La provincia es necesaria'] },
    ci: { type: String, required: [true, 'El ci es necesario'] },
    cuit: { type: String, required: [true, 'El cuit es necesario'] },
    ib: { type: String, required: [true, 'El ib es necesario'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    celular: { type: String, required: [true, 'El celular es necesario'] },
    correo: { type: String, required: [true, 'El correo es necesario'] },
    contacto: { type: String, required: [true, 'El contacto es necesario'] },
    contactocel: { type: String, required: false },
    web: { type: String, required: false },
    otros: { type: String, required: false }

}, { collection: 'instituciones' });

institucionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Institucion', institucionSchema);