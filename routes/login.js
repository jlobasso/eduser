const express = require('express');
const router = express.Router();
const db = require("../config/mysql/connect");
const vLogin = require('../validations/vLogin');
const Crypto = require('crypto-js')
const {message, errorMessage} = require("../functions/messages");

const Person = require('../config/mongoose/schemas').Person;


router.post('/', function(req, res, next) {  
  const username = req.body.username;
  const password = req.body.password;

  if(vLogin.vLoginUsername(username) || 
      vLogin.vLoginPassword(password)){

    const qryRandom = "SELECT random FROM complaint.users WHERE username=?";
    db.query(qryRandom, username,
      function(error, rows, fields){
        if (error){
          res.send(errorMessage(800, error.sqlMessage));
        }else{          
          if (rows.length) {
            
            const passHash = Crypto.SHA256(rows[0].random+password).toString();
            const qryIdUser = "SELECT id_user FROM complaint.users WHERE username=? AND password=? AND active=?";
            
            db.query(qryIdUser, [username, passHash, 1],
              function(error, rows, fields){
                if (error){
                  res.send(errorMessage(800, error.sqlMessage));
                }else{              
                  if (rows.length) {

                    const idUser = rows[0].id_user
                    const tokenTime = Date.now() + (120*60000); //resultado en milisegundos                    
                    const random = Math.random().toString(7).substr(8);
                    const token = Crypto.SHA512(idUser+random).toString();

                    const registro={
                      token: token,
                      token_time: tokenTime,
                      token_active: 1,
                      last_login: new Date()
                    };    

                    db.query('UPDATE complaint.users SET ? WHERE ?',[registro,{id_user:idUser}], 
                    function(error,filas){
                      if (error){
                        res.send(errorMessage(800, error.sqlMessage));
                      }else{              
                        
                        if (rows.length) {
                          
                          const qryToken = "SELECT token FROM complaint.users WHERE id_user=?";
                          db.query(qryToken, [rows[0].id_user],
                            function(error, rows, fields){
                              
                              if (error){
                                res.send(errorMessage(800, error.sqlMessage));
                              }else{        

                                  if (rows.length) {
                                  res.send({
                                    result: {
                                      data: rows,
                                      code: '',
                                      message: '', 
                                      status: 'ok'}
                                  });
                      
                                } else {
                                  res.send(errorMessage(102));
                                }                                 
                              }  

                            });
                        } else {
                          res.send(errorMessage(102));
                        } 
                      }
                    });        
                  } else {
                    res.send(errorMessage(100));
                  } 
                }  
              });
          } else {
            res.send(errorMessage(100));
          } 
        }  
      });  
    }else{
      res.send(errorMessage(101));
    }
});


module.exports = router;