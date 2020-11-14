const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los usuarios
// ========================================
app.get('/', (req, res) => {
  Usuario.find({}, 'nombre img role email')
  .exec( (err, usuarios) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      usuarios: usuarios
    })
  })
});
// ========================================
// Obtener usuario por id
// ========================================
app.get('/usuario/:id', mdAutenticacion.verificaToken, (req, res) => {
  const id = req.params.id;
  Usuario.findById(id, 'nombre img role email')
  .exec( (err, usuario) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    if ( !usuario ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un usuario con el id ' + id
    })
    }
     res.status(200).json({
      ok: true,
      usuario: usuario
    })
  })
});
// ========================================
// Crear usuario
// ========================================
app.post('/crear', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE,], (req, res) => {
  const body = req.body;
  const usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })
  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear usuario',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      usuario: usuarioGuardado
    })
  })
});
// ========================================
// Actualizar usuario
// ========================================
app.put('/actualizar/:id', mdAutenticacion.verificaToken, (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Usuario.findById(id, (err, usuario) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar usuario'
      })
    }
    if(!usuario) {
    return res.status(400).json({
      ok: false,
      message: 'No existe un usuario con el id ' + id + ' por lo tanto no se puede actualizar'
    })
    }
    usuario.nombre = body.nombre;
    usuario.email = body.email;
    usuario.password = bcrypt.hashSync(body.password, 10);
    usuario.role = body.role;
  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear usuario',
        error: err
      })
    }
    return res.status(201).json({
      ok: true,
      usuario: usuarioGuardado
    })
  })
  })
});
// ========================================
// Eliminar usuario por id
// ========================================
app.delete('/usuario/eliminar/:id', mdAutenticacion.verificaToken, (req, res) => {
  const id = req.params.id;
  Usuario.findByIdAndRemove(id)
  .exec( (err, usuarioBorrado) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo eliminar el usuario'
      })
    }
    if ( !usuarioBorrado ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un usuario con el id: ' + id + ' no existe'
      })
    }
     res.status(200).json({
      ok: true,
      message: 'Usuario eliminado',
      usuario: usuarioBorrado
    })
  })
});
module.exports = app;