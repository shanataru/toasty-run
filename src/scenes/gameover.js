import k from "../kaplayContext";
import { createWorld, moveWorld} from "../entities/world";

export default function gameover(bgm){
    bgm.paused = true;
    createWorld();
    k.onUpdate( () => {
        moveWorld(-50, -200, 554);
    });

    let bestScore = k.getData("best-score");
    const currentScore = k.getData("current-score");
    if(currentScore > bestScore){
        k.setData("best-score", currentScore);
        bestScore = currentScore;
    }

    k.add([
        k.text("GAME OVER", {font: "game-font", size: 72},), 
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text(`Score: ${currentScore}`, {font: "game-font", size: 46},), 
        k.pos(k.center().x, k.center().y-50),
        k.anchor("center"),
    ])

    k.add([
        k.text(`Best: ${bestScore}`, {font: "game-font", size: 46},), 
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
    ])

    k.wait(1, () => {
        k.add([
            k.text("Press Space/Click/Touch to Play", {font: "game-font", size: 46},), 
            k.pos(k.center().x, k.center().y + 125),
            k.anchor("center"),
        ]);
        k.onButtonPress("jump", () => k.go("game"));
    })
}