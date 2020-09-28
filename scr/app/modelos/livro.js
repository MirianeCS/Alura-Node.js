const { check } = require('express-validator/check');

class Livro{
    static validacoes(){
        return [
            check('titulo').isLength({ min: 5 }).withMessage('Precisa ter pelo menos 5 carateres'),
            check('preco').isCurrency().withMessage('O preço precisa ter um valor válido') //VERIFICANDO SE É DINHEIRO
        ] 
    }
}

module.exports = Livro;