import "./style.css";
import init, { initialise, create_app_state } from "innards";

init().then(start);

let dragging = false;
let prevPos = { x: 0, y: 0 };
let prevRes = 1;
let upResolution = 0;

window.addEventListener("mousedown", () => {
    dragging = true;
});
window.addEventListener("mouseup", () => {
    dragging = false;
});

function start() {
    function delayHighRes(func: Function) {
        appState.set_scale(2);
        func();
        if (upResolution) {
            clearTimeout(upResolution);
        }
        upResolution = setTimeout(() => appState.set_scale(prevRes), 500);
    }

    initialise();

    const canvas = document.querySelector("canvas")!;
    const context = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let appState = create_app_state(canvas.width, canvas.height);

    window.addEventListener("resize", resizer);
    looper();

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        appState.free();
        appState = create_app_state(canvas.width, canvas.height);
    }

    window.addEventListener("keypress", (e) => {
        if (e.key === " ") {
            appState.toggle_fast();
            return;
        }

        if (e.key == "=" || e.key == "+") {
            appState.inc_pow(0.1);
            return;
        }
        if (e.key == "-" || e.key == "_") {
            appState.inc_pow(-0.1);
        }

        const n = Number(e.key);
        if (isNaN(n) || n === 0) {
            return;
        }

        prevRes = n;
        appState.set_scale(n);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (dragging) {
            delayHighRes(() => appState.pan(prevPos.x, prevPos.y, e.x, e.y));
        }
        prevPos.x = e.x;
        prevPos.y = e.y;
    });

    canvas.addEventListener("wheel", (e) => {
        delayHighRes(() => appState.zoom(e.deltaY));
    });

    function looper() {
        appState.draw(context);
        requestAnimationFrame(looper);
    }
}
