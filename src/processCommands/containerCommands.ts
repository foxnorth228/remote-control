import "dotenv/config";
import process from "process";
//@ts-ignore
import { IMousePosition  } from "../mouseInf/mouseInf.ts";
export const commands = {
    mouse_up: move_mouse(0, 1),
    mouse_down: move_mouse(0, -1),
    mouse_left: move_mouse(-1, 0),
    mouse_right: move_mouse(1, 0),
    mouse_position: change_mouse_position,
    draw_circle: drawCircle,
    draw_rectangle: drawRectangle,
    draw_square: drawSquare,
    prnt_scrn: printScreen
}

function move_mouse(directMoveHorisontal: number = 0, directMoveVertical: number = 0): Function {
    function move_mouse_to_position(mouse: IMousePosition, move: number) {
        console.log(mouse, directMoveHorisontal, directMoveVertical, move, typeof mouse.x, typeof mouse.y, typeof move);
        mouse.x += directMoveHorisontal * move;
        mouse.y += directMoveVertical * move;
        console.log(mouse, directMoveHorisontal, directMoveVertical, move);
        checkMousePosition(mouse);
    }
    return move_mouse_to_position;
}

function change_mouse_position(mouse: IMousePosition, x: number, y:number) {
    mouse.x = x;
    mouse.y = y;
}

function drawCircle() {

}

function drawRectangle() {
    
}

function drawSquare() {
    
}

function printScreen() {
    
}

const maxScreenX: number = (process.env.SCREEN_X_MAX) ? Number(process.env.SCREEN_X_MAX) : 1920;
const maxScreenY: number = (process.env.SCREEN_Y_MAX) ? Number(process.env.SCREEN_Y_MAX) : 1080;
const minScreenX: number = (process.env.SCREEN_X_MIN) ? Number(process.env.SCREEN_X_MIN) : 0;
const minScreenY: number = (process.env.SCREEN_Y_MIN) ? Number(process.env.SCREEN_Y_MIN) : 0;
function checkMousePosition(mouse: IMousePosition): boolean {
    let answer = true;
    if (mouse.x > maxScreenX) {
        mouse.x = maxScreenX;
        answer = false;
    } else if(mouse.x < minScreenX) {
        mouse.x = minScreenX;
        answer = false;
    }
    if (mouse.y > maxScreenY) {
        mouse.y = maxScreenY;
        answer = false;
    } else if(mouse.y < minScreenY) {
        mouse.y = minScreenY;
        answer = false;
    }
    return answer;
}