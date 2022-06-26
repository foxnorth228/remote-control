import "dotenv/config";
import jimp from "jimp";
import robot from "robotjs";
//@ts-ignore
import { IMousePosition  } from "../mouseInf/mouseInf.ts";
export const commands = {
    mouse_up: move_mouse(0, -1),
    mouse_down: move_mouse(0, 1),
    mouse_left: move_mouse(-1, 0),
    mouse_right: move_mouse(1, 0),
    mouse_position: send_mouse_position,
    draw_circle: drawCircle,
    draw_rectangle: drawRectangle,
    draw_square: drawSquare,
    prnt_scrn: printScreen
}

type AsyncFunction = (...args: [IMousePosition, ...number[]]) => Promise<any>;
function move_mouse(directMoveHorisontal: number = 0, directMoveVertical: number = 0): AsyncFunction {
    async function move_mouse_to_position(mouse: IMousePosition, move: number): Promise<null> {
        mouse.x += directMoveHorisontal * move;
        mouse.y += directMoveVertical * move;
        if (checkMousePosition(mouse)) {
            robot.moveMouse(mouse.x, mouse.y);
        }
        return null;
    }
    return move_mouse_to_position;
}

async function send_mouse_position(mouse: IMousePosition): Promise<string> {
    return `${mouse.x},${mouse.y}`;
}

async function drawCircle(mouse: IMousePosition, radius: number): Promise<null> {
    const x = mouse.x;
    const y = mouse.y;
    const centerX = x + radius;
    const centerY = y;
    robot.moveMouse(x, y);
    robot.mouseToggle("down");
    for (let i = -Math.PI; i <= Math.PI; i += 0.01) {
        const newX = centerX + (radius * Math.cos(i));
        const newY = centerY + (radius * Math.sin(i));
        robot.moveMouse(newX, newY);
    }
    robot.mouseToggle("up");
    return null;
}

async function drawRectangle(mouse: IMousePosition, length: number, width: number): Promise<null> {
    const x = mouse.x;
    const y = mouse.y;
    robot.mouseToggle("down");
    robot.moveMouseSmooth(x + length, y);
    robot.moveMouseSmooth(x + length, y + width);
    robot.moveMouseSmooth(x, y + width);
    robot.moveMouseSmooth(x, y);
    robot.mouseToggle("up");
    return null;
}

async function drawSquare(mouse: IMousePosition, length: number): Promise<null> {
    const x = mouse.x;
    const y = mouse.y;
    robot.mouseToggle("down");
    robot.moveMouseSmooth(x + length, y);
    robot.moveMouseSmooth(x + length, y + length);
    robot.moveMouseSmooth(x, y + length);
    robot.moveMouseSmooth(x, y);
    robot.mouseToggle("up");
    return null;
}

async function printScreen(mouse: IMousePosition): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const screenshot = robot.screen.capture(mouse.x - 100, mouse.y - 100, mouse.x + 100, mouse.y + 100);
            const image = new jimp(screenshot.width, screenshot.height);
            let pos = 0;
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                /* eslint-disable no-plusplus */
                image.bitmap.data[idx + 2] = screenshot.image.readUInt8(pos++);
                image.bitmap.data[idx + 1] = screenshot.image.readUInt8(pos++);
                image.bitmap.data[idx + 0] = screenshot.image.readUInt8(pos++);
                pos++
                image.bitmap.data[idx + 3] = 255;
                /* eslint-enable no-plusplus */
            });
            const buff = await image.getBase64Async(jimp.MIME_PNG);
            const index = buff.indexOf(",");
            resolve(buff.slice(index + 1));
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

const screen = robot.screen.capture();
const maxScreenX: number = (screen.width) ? screen.width : 1920;
const maxScreenY: number = (screen.height) ? Number(screen.height) : 1080;
const minScreenX: number = 0;
const minScreenY: number = 0;

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