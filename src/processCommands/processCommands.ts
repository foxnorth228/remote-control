//@ts-ignore
import { IMousePosition  } from "../mouseInf/mouseInf.ts";
//@ts-ignore
import { commands } from "./containerCommands.ts";

export async function processRequest(mouse: IMousePosition, data: string) {
    console.log(data);
    console.log(`Before X: ${mouse.x}, Y: ${mouse.y}`);
    const arrOfCommand = data.split(" ");
    for (let [key, value] of Object.entries(commands)) {
        console.log(key, arrOfCommand[0]);
        if (key === arrOfCommand[0]) {
            console.log(key, arrOfCommand[0]);
            if (value instanceof Function) {
                processArguments(mouse, value, arrOfCommand.slice(1));
            }
        }
    }
    console.log(arrOfCommand);
    console.log(`After X: ${mouse.x}, Y: ${mouse.y}`);
}

function processArguments(mouse: IMousePosition, func: Function, arr: Array<string>) {
    console.log(func, arr, func.length);
    switch(func.length) {
        case 1: func(mouse); break;
        case 2: func(mouse, Number(arr[0])); break;
        case 3: func(mouse, Number(arr[0]), arr[1]); break;
        default: func(mouse, arr[0], arr[1], arr.slice(2)); break;
    }
}