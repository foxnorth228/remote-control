import "dotenv/config";
import process from "process";
//@ts-ignore
import { httpServer } from './src/http_server/index.ts';
//@ts-ignore
import { processRequest } from './src/processCommands/processCommands.ts';
import { WebSocketServer, createWebSocketStream } from 'ws';

const HTTP_PORT = process.env.HTTP_PORT;
httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

const wss_host = (process.env.WSS_HOST) ? process.env.WSS_HOST : "localhost";
const wss_port = (process.env.WSS_PORT) ? Number(process.env.WSS_PORT) : 8181;
const wss = new WebSocketServer({
    host: wss_host,
    port: wss_port
});

wss.on("connection", async (ws) => {
    console.log("connect");
    const wsStream = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });
    wsStream.on("data", async (chunk) => {
        console.log(chunk);
        const answer = await processRequest(ws, chunk.toString());
        if (answer[1] !== null) {
            console.log(`Answer: ${answer[0]} ${answer[1]}`);
            wsStream.write(`${answer[0]} ${answer[1]}\0`);
        } else {
            console.log(`The command ${chunk} process successfully`)
        }
    });
});
console.log(`Start web socket server on the ${wss_port} port!`)