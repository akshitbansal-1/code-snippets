//program for creating a simple websocket server using node js and express
//
//The Express.js library is imported and assigned to the variable called express
var express = require('express');
var app = express();

//import the express-ws library and set up WebSocket support on the app instance.
var expressWs = require('express-ws')(app);

//route handler function is defined for the root path of the server.
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
    //an event listener is set up for incoming WebSocket messages.
  ws.on('message', async function(msg) {
    await new Promise((res, rej) => {
        setTimeout(res, 1000);
    });
    console.log(msg);
    ws.send('abc');
  });
  
});

//The server starts and listens on port 3000.
app.listen(3000, () => {
    console.log('started')
});
