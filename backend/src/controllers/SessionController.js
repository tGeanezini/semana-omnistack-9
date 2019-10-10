const User = require('../models/User');

// métodos = index (listagem de sessões), show (lista uma única sessão), store (salvar uma sessão), update (atualizar uma sessão), destroy (destruir uma sessão)

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        // Tenta encontrar um usuário já cadastrado com o email informado
        // let = indica que a variável pode ser alterada
        let user = await User.findOne({ email }); 

        // Se não encontrar, cria um novo
        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};