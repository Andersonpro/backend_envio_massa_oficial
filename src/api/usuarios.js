const express = require('express')
const router = express.Router()
const { usuario } = require('../models')
const UsuarioService = require('../services/usuario')
const { body, validationResult } = require('express-validator')

const usuarioService = new UsuarioService(usuario)

//router.get('/', async (req, res) => {
//  const usuarios = await usuarioService.get()
//  res.status(200).json(usuarios)
//})

router.post('/',
  body('nome').not().isEmpty().trim().escape(),
  body('email')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('telefone')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().
    isEmpty()
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { nome, email, telefone, password } = req.body
    try {
      await usuarioService.adicionar({ nome, email, telefone, password })
      res.status(201).send('Usuario adicionado com sucesso!')
    } catch (erro) {
      res.status(400).send(erro.message)
    }
  })

module.exports = router
