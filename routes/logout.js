const express = require('express');
const router = express.Router();
const db = require("../config/mysql/connect");
const vToken = require("../validations/vToken");
const { message, errorMessage } = require("../functions/messages");


// const { router, db } = require(
//     "../includes/start/router",
//     "../includes/start/db",

//     );


router.get('/', async function(req, res, next) {  
  var rToken = await vToken(req.query.token);  
  if(rToken.status === 'ok' && rToken.id_user){  
    const registro={
      token: 0,
      token_time: 0,
      token_active: 0,
      last_login: new Date()
    };    

    db.query('UPDATE complaint.users SET ? WHERE ?',[registro,{id_user:rToken.id_user}], 
    function(error,filas){
      if (error){
        res.send(errorMessage(800, error.sqlMessage));
      }else{       
        res.send(message(104));
      }               
    });  
  }else{
    res.send(rToken);
  }
});


module.exports = router;