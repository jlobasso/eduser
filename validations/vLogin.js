//VALIDA USUARIO y PASSWORD

const errorMessage = require("../functions/messages");

function vLoginUsername (parametros) {
    return  /[a-zA-Z0-9_-]{4,30}/g.test( parametros );
}

function vLoginPassword (parametros) {    
   return /[a-zA-Z0-9_-]{6,18}/g.test( parametros );
}

module.exports = {vLoginUsername, vLoginPassword};