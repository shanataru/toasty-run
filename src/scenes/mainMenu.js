import k from "../kaplayContext";
import { makeCharacter } from "../entities/character";


export default function mainMenu() {
    if (!k.getData("best-score")) {
        k.setData("best-score", 0);
    }
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 8000;
    const bgPieceScale = 0.75;
    const bgOpacity = 0.8;
    const bgYPos = -50;
    const bgPieces = [
        k.add([
            k.sprite("background"), 
            k.pos(0, bgYPos), 
            k.scale(bgPieceScale), 
            k.opacity(bgOpacity),
        ]), //components
        k.add([
            k.sprite("background"), 
            k.pos(bgPieceWidth * bgPieceScale, bgYPos), 
            k.scale(bgPieceScale), 
            k.opacity(bgOpacity),
        ])
    ]
    //bgPieces[1].flipX = true;

    const platformWidth = 1280; 
    const platformScale = 1.1;
    const platformYPos = 545;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, platformYPos), k.scale(platformScale), ]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * platformScale, platformYPos), k.scale(platformScale), ]),
    ]

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

    platforms[1].flipX = true;

    makeCharacter(k.vec2(200, 554));

    k.add([
        k.sprite("enemy", {anim: "run"}),
        k.pos(k.center().x - 100, k.center().y),
        k.scale(2)
    ]);

    k.add([
        k.sprite("butter"),
        k.pos(k.center().x, k.center().y),
        k.scale(2.0)
    ]);

    k.add([
        k.sprite("jam", {anim: "idle"}),
        k.pos(k.center().x+100, k.center().y),
        k.scale(2.0)
    ]);

    k.add([
        k.sprite("egg"),
        k.pos(k.center().x+200, k.center().y),
        k.scale(2.0)
    ]);

    k.onUpdate( () => {
        if (bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * bgPieceScale, bgYPos);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * bgPieceScale, bgYPos);
        //bgPieces[1].move(-200,0);

        if(platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * platformScale, platformYPos);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-500, 0);
        platforms[1].moveTo(platforms[0].pos.x + + platformWidth * platformScale, platformYPos);

    });
}