const messageList = require("./messagesList");
const language = "es"; 

function message (code) {
  return {result: {
            data: [], 
            code: code, 
            message: messageList[code][language], 
            status: "ok"
          }
        };
}

function errorMessage (code, message) {  
  if (code === 800){
    msn = messageList[code]+message;
  }else{
    msn = messageList[code][language];
  }
  
  return {result: {
        data: [], 
        code: code, 
        message: msn,
        status: "error"
      }
    };
}

module.exports = {
  message, 
  errorMessage
};