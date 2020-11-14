const express = require('express');
const app = express();
const funciones = require('../functions.js');

// Rutas
app.get('/db/:coleccion/:busqueda', (req, res) => {
    const busqueda = req.params.busqueda;
    const coleccion = req.params.coleccion;
    const regex = new RegExp(busqueda, 'i');
    let promesa;
    switch (coleccion) {
        case 'usuarios':
            promesa = funciones.buscarUsuarios(busqueda, regex);
            break;
        case 'concurrentes':
            promesa = funciones.buscarConcurrentes(busqueda, regex);
            break;
        case 'profesionales':
            promesa = funciones.buscarProfesionales(busqueda, regex);
            break;
        case 'proveedores':
            promesa = funciones.buscarProveedores(busqueda, regex);
            break;
        case 'obrassociales':
            promesa = funciones.buscarObrasSociales(busqueda, regex);
            break;
        case 'instituciones':
            promesa = funciones.buscarInstituciones(busqueda, regex);
            break;
        case 'agendacontactos':
            promesa = funciones.buscarAgendaContactos(busqueda, regex);
            break;
        case 'efectoressalud':
            promesa = funciones.buscarEfectoresSalud(busqueda, regex);
            break;
        default:
            res.status(400).json({
                ok: false,
                err: 'Error al buscar en una coleccion'
            });
    }
      promesa.then(data => {
        res.status(200).json({
            ok: true,
            [coleccion]: data
        });
      });
});
app.get('/todo/:busqueda', (req, res) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    Promise.all([
            funciones.buscarProfesionales(busqueda, regex),
            funciones.buscarConcurrentes(busqueda, regex),
            funciones.buscarUsuarios(busqueda, regex),
            funciones.buscarObrasSociales(busqueda, regex),
            funciones.buscarAgendaContactos(busqueda, regex),
            funciones.buscarInstituciones(busqueda, regex),
            funciones.buscarEfectoresSalud(busqueda, regex),
            funciones.buscarProveedores(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                profesionales: respuestas[0],
                concurrentes: respuestas[1],
                usuarios: respuestas[2],
                obrassociales: respuestas[3],
                contactos: respuestas[4],
                instituciones: respuestas[5],
                efectoresSalud: respuestas[6],
                proveedores: respuestas[7]
            });
        });
});
module.exports = app;