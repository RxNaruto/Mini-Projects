import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(3000);

const wss = new WebSocketServer({server: httpServer});

wss.on('connection',function connnection(ws){
   ws.on('error',console.error);

   ws.on('message',function message(data){
    const message = data.toString();
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(message);
        }
    })
   })

})
