"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(3000);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connnection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const message = data.toString();
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
