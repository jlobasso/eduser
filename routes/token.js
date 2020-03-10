const express = require('express');
const router = express.Router();
const db = require("../config/mysql/connect");
const {message, errorMessage} = require("../functions/messages");


router.get('/', async function(req, res, next) {       
  try { 
      token =  /[a-z0-9]+/g.test( req.query.token );
      if(token){
        db.query("SELECT id_user, token_time FROM complaint.users WHERE token=?", req.query.token,
        function(error, rows, fields){
            if (error){ 
              res.send(errorMessage(800, error.sqlMessage));
          }else{     
  
            if (rows.length) {
              const idUser = rows[0].id_user
              const tokenTime = Date.now()
              if(+rows[0].token_time > tokenTime){  
                res.send({
                  result: {
                    data: '',
                    code: '200',
                    message: 'ok', 
                    status: 'ok'}
                });   
  
              }else{
                const registro={
                  token: 0,
                  token_time: 0,
                  token_active: 0
                };      
  
                db.query('UPDATE complaint.users SET ? WHERE ?',[registro,{id_user:idUser}], 
                function(error,filas){
                  if (error){
                    res.send(errorMessage(800, error.sqlMessage));
                  } else {
                    res.send(errorMessage(103));
                  }               
                }); 
              }                    
            } else {
              res.send(errorMessage(103));
            } 
          }  
        });
      } else {
        res.send(errorMessage(103));
      }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    throw new Error("Opps!! Something went wrong"); // Express will catch this on its own.
  }  
});

module.exports = router;