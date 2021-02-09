const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
// Verificar token
exports.verificaToken = (req, res, next)=>{
  const token = req.query.token;
  jwt.verify(token, SEED, (err, decoded)=>{
    if(err) {
      return res.status(401).json({
    ok: false,
    mensaje: 'Token incorrecto'
      })
    }
    req.usuario = decoded.usuario;
    next();
  });
}
// ========================================
// Verificar admin
// ========================================
exports.verificaADMIN_ROLE = function(req, res, next) {
    const usuario = req.usuario;
    const id = req.params.id;
    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token equivocado - no sos admin'
        });
    }
}
// ========================================
// Verificar soy yo
// ========================================
exports.verificaYo = function(req, res, next) {
  const usuario = req.usuario;
  const id = req.params.id;
  if ( usuario._id === id ) {
    return res.status(401).json({
        ok: false,
        mensaje: 'No puedes eliminarte a si mismo'
    });
  } else {
    next();
    return;
  }
}
