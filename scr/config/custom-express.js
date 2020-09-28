require('marko/node-require').install();
require('marko/express')

const express = require('express'); //RECEBE UMA CHAMADA DE FUNÇÃO
const app = express(); //OBJETO DO EXPRESS
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/estatico', express.static('./scr/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return (method);
    }
}));

const sessaoAutenticacao = require('./sessao-autentificacao');
sessaoAutenticacao(app);

//IMPORTAÇÃO DE ROTAS
const rotas = require('../app/rotas/rotas.js');
rotas(app);

app.use(function(req, resp, next){
  return(resp.status(404).marko(
    require('../app/views/base/erros/404.marko')
  ));
});

//MIDDLEWARE DE TRATAMENTO DE ERROS
app.use(function(erro, req, resp, next){
  return(resp.status(500).marko(
    require('../app/views/base/erros/500.marko')
  ));
});

module.exports = app;
