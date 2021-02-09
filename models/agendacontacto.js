const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const agendaContactoSchema = new Schema({
    nombre: { type: String, required: [false, 'El nombre es necesario'] },
    correo: { type: String, unique: true, required: [true, 'El correo es necesaria'] },
    telefono: { type: String, required: [false, 'El telefono es necesaria'] },
    celular: { type: String, required: [false, 'El celular es necesario'] },
    institucion: { type: String, required: [false, 'La institucion es necesaria'], },
    horario: { type: String, required: false }
}, { collection: 'agendacontactos' });
agendaContactoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('AgendaContaco', agendaContactoSchema);