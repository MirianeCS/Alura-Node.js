const baseRotas = require('./base-rotas');
const livroRotas = require('./livro-rotas');

module.exports = (app) => { //EXPORTANDO APP 
    baseRotas(app);
    livroRotas(app);
}

