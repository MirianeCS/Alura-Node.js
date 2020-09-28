const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroControlador{

    static rotas(){
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }
    
    lista(){
        return function(req, resp){

            //INSTANCIA DA CLASSE LIVRO DAO PARA REPRESENTAR O DB USADO
            const livroDao = new LivroDao(db); 
    
            livroDao.lista()
                .then(livros => resp.marko(
                templates.livros.lista, {livros: livros} //QUANDO É IGUAL NÃO PRECISA ESCREVER 
                ))
                .catch(erro => console.log(erro));
        };
    }

    cadastra(){
        return function(req, resp){
            //INFORMAÇÃO RECEBENDO DO FORMULÁRIO
            console.log(req.body); 
            
            //INSTANCIA DA CLASSE LIVRO DAO PARA REPRESENTAR O DB USADO
            const livroDao = new LivroDao(db); 
    
            const erros = validationResult(req);
    
            if(!erros.isEmpty())
                return(resp.marko(
                    templates.livros.form, 
                    {
                        livro: req.body,
                        errosValidacao: erros.array()
                    })
                );
    
            livroDao.adiciona(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))//ROTA QUE QUER REDIRECIONAR PARA
                .catch(erro => console.log(erro));
    
        }
    }

    edita(){
        return function(req, resp){
            //INFORMAÇÃO RECEBENDO DO FORMULÁRIO
            console.log(req.body); 
            
            //INSTANCIA DA CLASSE LIVRO DAO PARA REPRESENTAR O DB USADO
            const livroDao = new LivroDao(db); 
    
            livroDao.atualiza(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))//ROTA QUE QUER REDIRECIONAR PARA
                .catch(erro => console.log(erro));
    
        }
    }

    remove(){
        return function(req, resp){
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }

    formularioCadastro(){
        return function(req, resp){
            resp.marko(templates.livros.form, {livro:{}});
        }
    }

    formularioEdicao(){
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
        
            livroDao.buscaPorId(id)
                .then(livro =>{
                    resp.marko(
                        templates.livros.form, {livro: livro})} 
                )
                .catch(erro => console.log(erro));
        
        }
    }

}

module.exports = LivroControlador;