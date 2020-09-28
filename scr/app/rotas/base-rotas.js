const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador;

module.exports = (app) => { //EXPORTANDO APP 
    const rotasBase = BaseControlador.rotas();

    //DEFININDO UMA ROTA
    app.get(rotasBase.home, baseControlador.home());

    app.route(rotasBase.login)
        .get(baseControlador.login())
        .post(baseControlador.efetuaLogin());
    
}

