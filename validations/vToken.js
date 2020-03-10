const db = require("../config/mysql/connect");
const { errorMessage } = require("../functions/messages");

function vToken (parametros) {
  return new Promise(resolve=>{
    token =  /[a-z0-9]+/g.test( parametros );
    if(token){
      db.query("SELECT id_user, username, token_time FROM complaint.users WHERE token=?", parametros,
      function(error, rows, fields){
          if (error){ 
            resolve(errorMessage(800, error.sqlMessage));
        }else{     

          if (rows.length) {
            const idUser = rows[0].id_user
            const tokenTime = Date.now()
            if(+rows[0].token_time > tokenTime){ 

              resolve({
                  id_user: rows[0].id_user,
                  username: rows[0].username,
                  status: 'ok'
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
                  resolve(errorMessage(800, error.sqlMessage));
                } else {
                  resolve(errorMessage(103));
                }               
              }); 
            }                    
          } else {
            resolve(errorMessage(103));
          } 
        }  
      });
    } else {
      resolve(errorMessage(103));
    }
  });
}

module.exports = vToken;