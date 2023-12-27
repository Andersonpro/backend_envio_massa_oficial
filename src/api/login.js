const express = require("express");
const router = express.Router();
const UsuarioService = require("../services/usuario");
const { usuario } = require('../models')
const usuarioService = new UsuarioService(usuario);
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const usuario_procurado = await usuarioService.buscarPorEmail(email);

  if (!usuario_procurado) {
    res.status(401).json({
      mensagem: "Usuário não encontrado",
    });
    return;
  }

  if (usuario_procurado.password !== password) {
    res.status(401).json({
      mensagem: "Senha incorreta",
    });
    return;
  }

  const chave = 'teste123456'

  const token = jwt.sign({ usuario_id: usuario_procurado.id, email: usuario_procurado.email }, chave, { expiresIn: '1h' });

  res.status(200).json({
    "msg": "Login Realizado com sucesso",
    "token": token
  });
});

module.exports = router;
