const express = require('express');
const router = express.Router();
const vToken = require("../validations/vToken");
const db = require("../config/mysql/connect");
const Crypto = require('crypto-js')
const { message, errorMessage } = require("../functions/messages");

const User = require('../config/mongoose/models').User;


router.get('/', async function(req, res, next) {  
    try {
        var rToken = await vToken(req.query.token);  
        if(rToken.status === 'ok' && rToken.id_user){  
            
            const qryCustomers = "SELECT id_user, username, first_name, last_name, email, last_login FROM complaint.users";
            db.query(qryCustomers, [], function(error, rows, fields){
            
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
                    }else{
                        res.send(errorMessage(301));  
                    }    
                }
            });      
            
        }else{
            res.send(rToken);
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    } 
});


router.post('/', async function(req, res, next) { 
  
  try {
    var rToken = await vToken(req.body.token);  
    if(rToken.status === 'ok' && rToken.id_user){  


      User.create({name: { lastName: "Lobasso", email: "dlobasso@gmail.com"}}, function(err) {
        if (err) return console.error(err);
      });
      
      // User.find(function(err, user) {
      //   if (err) return console.error(err);
      //   console.log(user);
      // });


      const qryUser = "SELECT username, email FROM complaint.users WHERE username=? OR email=? AND active=?";
      db.query(qryUser, [req.body.username, req.body.email, 1],function(error, rows, fields){
        if (error){
          resolve(errorMessage(800, error.sqlMessage));
        }else{
          if (rows.length) {
            if(rows[0].username === req.body.username){
              res.send(errorMessage(211));
            }else if(rows[0].email === req.body.email){
              res.send(errorMessage(212));
            }

          }else{
            const random = Math.random().toString(7).substr(8);
            const passHash = Crypto.SHA256(random+req.body.password).toString();
            const user={
              username: req.body.username,
              password: passHash,
              random: random,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              start_date: new Date()
            };

            db.query('INSERT INTO complaint.users SET ?', user, function (error,resultado){
              if (error){
                res.send(errorMessage(800, error.sqlMessage));
              }else{                
                //Funcion envia correo para activar la cuenta
                res.send(message(201));                                
              }  
            });
          }
        } 
      });
    }else{
      res.send(rToken);
    } 
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  } 
});


module.exports = router;