const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador;

const Livro = require('../modelos/livro');
const BaseControlador = require('../controladores/base-controlador');

module.exports = (app) => { //EXPORTANDO APP 
    const rotasLivro = LivroControlador.rotas();

    //DEFININDO UMA ROTA    
    app.use(rotasLivro.autenticadas, function(req, resp, next) {
        if (req.isAuthenticated())
            next();
        else
            resp.redirect(BaseControlador.rotas().login);
    });
    
    app.get(rotasLivro.lista, livroControlador.lista());
    
    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita());

    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());
    
    app.delete(rotasLivro.delecao, livroControlador.remove());

}

