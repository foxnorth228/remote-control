import "dotenv/config";
import Jimp from 'jimp';
import robot from 'robotjs';
import process from "process";
//@ts-ignore
import { IMousePosition } from "./src/mouseInf/mouseInf.ts";
//@ts-ignore
import { httpServer } from './src/http_server/index.ts';
//@ts-ignore
import { processRequest } from './src/processCommands/processCommands.ts';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';

const HTTP_PORT = process.env.HTTP_PORT;
httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

const wss_host = (process.env.WSS_HOST) ? process.env.WSS_HOST : "localhost";
const wss_port = (process.env.WSS_PORT) ? Number(process.env.WSS_PORT) : 8181;
const wss = new WebSocketServer({
    host: wss_host,
    port: wss_port
});

const mousePosition: IMousePosition = {
    x: 0,
    y: 0,
}

wss.on("connection", async (ws, req) => {
    console.log("connect");
    console.log(req.socket.remoteAddress);
    ws.on("message", (data) => {
        processRequest(mousePosition, data.toString());
        ws.send(`mouse_position ${mousePosition.x},${mousePosition.y}`);
    })
})