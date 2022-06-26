import robot from "robotjs";
//@ts-ignore
import { IMousePosition  } from "../mouseInf/mouseInf.ts";
//@ts-ignore
import { commands } from "./containerCommands.ts";
import { WebSocket } from "ws";

type AsyncFunction = (...args: [IMousePosition, ...number[]]) => Promise<any>;
export async function processRequest(ws: WebSocket, data: string) {
    const mouse = robot.getMousePos();
    let command;
    let answer;
    const arrOfCommand = data.split(" ");
    for (let [key, value] of Object.entries(commands)) {
        if (key === arrOfCommand[0]) {
            command = key;
            answer = await processArguments(mouse, value as AsyncFunction, arrOfCommand.slice(1));
        }
    }
    return [command, answer];
}

async function processArguments(mouse: IMousePosition, func: AsyncFunction, arr: Array<string>) {
    switch(func.length) {
        case 1: return await func(mouse);
        case 2: return await func(mouse, Number(arr[0]));
        case 3: return await func(mouse, Number(arr[0]), Number(arr[1]));
        default: return null;
    }
}