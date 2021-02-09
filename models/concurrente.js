var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var concurrenteSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    dni: { type: String, required: [true, 'El DNI es necesario'], unique: true },
    fechadenacimiento: { type: String, required: false },
    sexo: { type: String, required: false },
    direccion: { type: String, required: false },
    barrio: { type: String, required: false },
    localidad: { type: String, required: false },
    provincia: { type: String, required: false },
    estadocivil: { type: String, required: false },
    telefono: { type: String, required: false },
    celular: { type: String, required: false },
    correo: { type: String, required: false },
    cuil: { type: String, required: false },
    cobertura: { type: String, required: false },
    numerobenef: { type: String, required: false },
    alta: { type: String, required: false },
    baja: { type: String, required: false },
    cud: { type: String, required: false },
    vencimiento: { type: String, required: false },
    imagen: { type: String, required: false },
    jornada: { type: String, required: false },
    diagnostico: { type: String, required: false },
    tratamiento: { type: String, required: false },
    equiporeferencia: { type: String, required: false },
    responsable: {
        nombrefamiliar: { type: String, required: false },
        vinculofamiliar: { type: String, required: false },
        direccionfamiliar: { type: String, required: false },
        dnifamiliar: { type: String, required: false },
        responsablefamiliar: { type: String, required: false },
        fechanacimientofamiliar: { type: String, required: false },
        estadocivilfamiliar: { type: String, required: false },
        telefonofamiliar: { type: String, required: false },
        celularfamiliar: { type: String, required: false },
        correofamiliar: { type: String, required: false },
        ocupacionfamiliar: { type: String, required: false },
        convivientefamiliar: { type: String, required: false }
    },
    transporte: {
        nombretransporte: { type: String, required: false },
        contactotransporte: { type: String, required: false },
        cuittransporte: { type: String, required: false },
        direcciontransporte: { type: String, required: false },
        ibtransporte: { type: String, required: false },
        situaciontransporte: { type: String, required: false },
        telefonotransporte: { type: String, required: false },
        celulartransporte: { type: String, required: false },
        correotransporte: { type: String, required: false }
    },
    asistenteterapeutico: {
        tieneasistente: { type: String, required: false },
        nombreasistente: { type: String, required: false },
        cuitasistente: { type: String, required: false },
        direccionasistente: { type: String, required: false },
        telefonoasistente: { type: String, required: false },
        celularasistente: { type: String, required: false },
        correoasistente: { type: String, required: false },
        cuilasistente: { type: String, required: false },
        ibasistente: { type: String, required: false },
        profesionasistente: { type: String, required: false }
    },
    asistencia: {
        mananalunes: { type: String, required: false },
        mananamartes: { type: String, required: false },
        mananamiercoles: { type: String, required: false },
        mananajueves: { type: String, required: false },
        mananaviernes: { type: String, required: false },
        tardelunes: { type: String, required: false },
        tardemartes: { type: String, required: false },
        tardemiercoles: { type: String, required: false },
        tardejueves: { type: String, required: false },
        tardeviernes: { type: String, required: false }
    },
    taller: {
        tmananalunes: { type: String, required: false },
        tmananamartes: { type: String, required: false },
        tmananamiercoles: { type: String, required: false },
        tmananajueves: { type: String, required: false },
        tmananaviernes: { type: String, required: false },
        ttardelunes: { type: String, required: false },
        ttardemartes: { type: String, required: false },
        ttardemiercoles: { type: String, required: false },
        ttardejueves: { type: String, required: false },
        ttardeviernes: { type: String, required: false }
    }


}, { collection: 'concurrentes' });
concurrenteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Concurrente', concurrenteSchema);