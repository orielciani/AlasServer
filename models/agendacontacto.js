const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const agendaContactoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    correo: { type: String, unique: true, required: [true, 'El correo es necesaria'] },
    telefono: { type: String, required: [true, 'El telefono es necesaria'] },
    celular: { type: String, required: [true, 'El celular es necesario'] },
    institucion: { type: String, required: [true, 'La institucion es necesaria'], },
    horario: { type: String, required: false }
}, { collection: 'agendacontactos' });
agendaContactoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('AgendaContaco', agendaContactoSchema);