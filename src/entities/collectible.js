import k from "../kaplayContext.js";

const butterSpawnRate = [0.5, 2.0];
const jamSpawnRate = [15, 25]
const saltSpawnRate = [30, 50];

const butterSpawnAreaY = [575, 575];
const jamSpawnAreaY = [100, 175]
const saltSpawnAreaY = [200, 250];


const spawnBehavior = {
    butter: (posX) => {
        return {
            pos: k.vec2(posX, k.rand(butterSpawnAreaY[0], butterSpawnAreaY[1])),
            scale: 2,
            nextSpawnTime: k.rand(butterSpawnRate[0], butterSpawnRate[1])
        };
    },
    jam: (posX) => {
        return {
            pos: k.vec2(posX, k.rand(jamSpawnAreaY[0], jamSpawnAreaY[1])),
            scale: 2.5,
            nextSpawnTime: k.rand(jamSpawnRate[0],jamSpawnRate[1])
        };
    },
    rainbow_salt: (posX) => {
        return {
            pos: k.vec2(posX, k.rand(saltSpawnAreaY[0], saltSpawnAreaY[1])),
            scale: 2.2,
            nextSpawnTime: k.rand(saltSpawnRate[0],saltSpawnRate[1])
        };
    },
};

export function makeCollectible(collectibleName, gameSpeed, posX){
    const {pos, scale, nextSpawnTime} = spawnBehavior[collectibleName](posX);
    const collectible =  k.add([
        k.sprite(collectibleName, {anim: "idle"}),
        k.area( {shape: new k.Rect(k.vec2(0,0), 24, 32)} ),
        k.scale(scale),
        k.anchor("center"), //change origin from top left
        k.pos(pos),
        k.rotate(),
        k.offscreen(), //offscreen component, allow us to check if enemy off screen
        collectibleName, //tag
    ]);

    let myTime = 0;
    let time = 0;
    let angle = 30;

    collectible.onUpdate( () => {
        if (collectibleName === "jam") { //moves in wavy pattern
            myTime += k.dt(); // Increment time by the delta time each frame
            let y = Math.sin(4*myTime)*350;
            collectible.move( - gameSpeed/2, y);
        }
        else if (collectibleName === "rainbow_salt"){
            time += k.dt();
            if(time > 0.7){
                angle *= -1;
                time = 0;
            }
            collectible.angle = angle;
            collectible.move( - gameSpeed/2, 0);
        }
        else{ //doesnt move
            collectible.move( - gameSpeed, 0);
        }
    });

    // destroy if off-screen
    collectible.onExitScreen( () => {
        if (collectible.pos.x < 0){
            k.destroy(collectible);
        }
    });

    return nextSpawnTime;
}