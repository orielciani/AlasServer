const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const institucionSchema = new Schema({
    denominacion: { type: String, required: [true, 'El nombre es necesario'] },
    direccion: { type: String, required: [false, 'La direccion es necesaria'] },
    ciudad: { type: String, required: [false, 'La ciudad es necesaria'] },
    codpos: { type: String, required: [false, 'El codpos es necesario'] },
    provincia: { type: String, required: [false, 'La provincia es necesaria'] },
    ci: { type: String, required: [false, 'El ci es necesario'] },
    cuit: { type: String, unique: true, required: [true, 'El cuit es necesario'] },
    ib: { type: String, required: [false, 'El ib es necesario'] },
    telefono: { type: String, required: [false, 'El telefono es necesario'] },
    celular: { type: String, required: [false, 'El celular es necesario'] },
    correo: { type: String, required: [false, 'El correo es necesario'] },
    contacto: { type: String, required: [false, 'El contacto es necesario'] },
    contactocel: { type: String, required: false },
    contactocorreo: { type: String, required: false },
    web: { type: String, required: false },
    otros: { type: String, required: false }

}, { collection: 'instituciones' });

institucionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Institucion', institucionSchema);