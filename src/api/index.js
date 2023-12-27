const express = require('express')

const usuariosRouter = require('./usuarios')
const loginRouter = require('./login')
const perfilRouter = require('./perfil')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('App online!')
})

router.use('/usuarios', usuariosRouter)
router.use('/login', loginRouter)
router.use('/perfil', perfilRouter)

module.exports = router
