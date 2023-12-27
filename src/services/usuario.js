

class UsuarioService{
  constructor (UsuarioModel) {
    this.usuario = UsuarioModel
  }

  async get () {
    const usuarios = await this.usuario.findAll()
    return usuarios
  }

  async buscarPorEmail (email) {
    return this.usuario.findOne({where: {email}})
  }  

  async adicionar (usuarioDTO) {
    // verifica se já existe curso com o mesmo nome
    console.log('usuarioDTO', usuarioDTO)
    const usuario = await this.usuario.findOne({
      where: {
        telefone: usuarioDTO.telefone
      }
    })
    if (usuario != null) {
      throw new Error('Já existe um usuario cadastrado com esse telefone!')
    }
    try {
      await this.usuario.create(usuarioDTO)
    } catch (erro) {
      console.error(erro.message)
      throw erro
    }
  }
}

module.exports = UsuarioService
