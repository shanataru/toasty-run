import k from "../kaplayContext";

let bgPieces
let platforms

const bgPieceWidth = 4096;
const bgPieceScale = 1.5;
const bgOpacity = 0.8;
const bgYPos = 100;

const platformWidth = 1280; 
const platformScale = 1.1;
const platformYPos = 545;

export function createWorld(){
    bgPieces = [
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
    ];

    platforms = [
        k.add([k.sprite("platforms"), k.pos(0, platformYPos), k.scale(platformScale), ]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * platformScale, platformYPos), k.scale(platformScale), ]),
    ];
    platforms[1].flipX = true;
}

export function moveWorld(bgSpeed, platformSpeed, characterPosY){
    if (bgPieces[1].pos.x < 0){
        bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * bgPieceScale, bgYPos);
        bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(bgSpeed, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * bgPieceScale, bgYPos);
    
    //shift bg a bit when character jump
    bgPieces[0].moveTo(bgPieces[0].pos.x, - characterPosY / 10 - 25);
    bgPieces[1].moveTo(bgPieces[1].pos.x, - characterPosY / 10 - 25);

    if(platforms[1].pos.x < 0){
        platforms[0].moveTo(platforms[1].pos.x + platforms[0].width * platformScale, platformYPos);
        platforms.push(platforms.shift());
    }
    platforms[0].move(platformSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[0].width * platformScale, platformYPos);
}