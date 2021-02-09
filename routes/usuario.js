const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const mdAutenticacion = require('../middleware/autenticacion')
// ========================================
// Obtener todos los usuarios
// ========================================
app.get('/', [mdAutenticacion.verificaToken],   (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Usuario.find({}, 'nombre img role email')
  .skip(desde)
  .limit(5)
  .exec( (err, usuarios) => {
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    Usuario.count({}, (err, conteo) => {
      if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
      })
    }
    return res.status(200).json({
      ok: true,
      conteo: conteo,
      usuarios: usuarios
    })
    })
  })
});
// ========================================
// Obtener usuario por id
// ========================================
app.get('/usuario/:id', [mdAutenticacion.verificaToken],  (req, res) => {
  const id = req.params.id;
  Usuario.findById(id, 'nombre img role email')
  .exec( (err, usuario) => {
    if ( !usuario ) {
      return res.status(400).json({
      ok: false,
      message: 'No existe un usuario con el id ' + id
    })
    }
    if ( err ) {
      return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar'
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
app.post('/crear', [mdAutenticacion.verificaToken],  (req, res) => {
  const body = req.body;
  if (!body.nombre || !body.email || !body.role || !body.password || body.password === null) {
    return res.status(400).json({
    ok: false,
    message: 'Debe llenar todo el formulario para crear un nuevo usuario'
  })
  }
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
app.put('/actualizar/:id', [mdAutenticacion.verificaToken],   (req, res) => {
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
    // if (!body.password || body.password === null) {
    //   return res.status(400).json({
    //   ok: false,
    //   message: 'No ingreso una contraseña'
    // })
    // }
    usuario.nombre = body.nombre;
    usuario.email = body.email;
    if( body.password !== null || '' ) {
       usuario.password = bcrypt.hashSync(body.password, 10);
    }
    // usuario.password = bcrypt.hashSync(body.password, 10);
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
app.delete('/usuario/eliminar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE, mdAutenticacion.verificaYo],   (req, res) => {
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