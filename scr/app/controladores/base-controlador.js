const { Template } = require("marko/src/html");
const templates = require('../views/templates');
const passport = require("passport");

const LivroControlador = require('./livro-controlador');

class BaseControlador{

    static rotas(){
        return {
            home: '/',
            login: '/login'
        }
    }
    
    home(){
        return function(req, resp) {
            resp.marko(
                // require('../views/base/home/home.marko')
                templates.base.home
            );
        };
    }

    login(){
        return function(req, resp){
            resp.marko(
                templates.base.login
            );
        };
    }

    efetuaLogin() {
        return function(req, resp, next) {

            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => { //FUNÇÃO CALLBACK
                if(info)
                    return resp.marko(
                        templates.base.login
                    );

                if(erro)
                    return next(erro);

                //NÃO TEVE ERRO, ENTÃO
                req.login(usuario, (erro) => {
                    if(erro)
                        return next(erro);

                    return resp.redirect(LivroControlador.rotas().lista);
                });
            })(req, resp, next);

        };
    }
}

module.exports = BaseControlador;