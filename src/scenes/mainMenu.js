import k from "../kaplayContext";
import { makeCharacter } from "../entities/character";
import {createWorld, moveWorld} from "../entities/world";


export default function mainMenu() {
    if (!k.getData("best-score")) {
        k.setData("best-score", 0);
    }
    k.onButtonPress("jump", () => k.go("game"));

    createWorld();

    k.add([
        k.text("TOASTY RUN", {font: "game-font", size: 72},), 
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press Space/Click/Touch to Play", {font: "game-font", size: 46},), 
        k.pos(k.center().x, k.center().y - 50),
        k.anchor("center"),
    ]);

    makeCharacter(k.vec2(200, 554));

    k.onUpdate( () => {
        moveWorld(-100, -500, 0);
    });
}