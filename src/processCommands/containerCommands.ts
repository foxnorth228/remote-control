import "dotenv/config";
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
        console.log(mouse, directMoveHorisontal, directMoveVertical, move);
        console.log(arguments);
        mouse.x += directMoveHorisontal * move;
        mouse.y += directMoveVertical * move;
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