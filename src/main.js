import k from "./kaplayContext";
import mainMenu from "./scenes/mainMenu";  //no need for {}, default export
import game from "./scenes/game";
//import gameover from "./scenes/gameover";


k.loadSprite("background", "graphics/kitchen-bg2-blur.png");
k.loadSprite("platforms", "graphics/table_platforms_dark_or.jpg");
k.loadSprite("character", "graphics/bread_spritesheet.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
        idle: {from: 0, to: 3, loop: true, speed: 15},
        run: {from: 4, to: 7, loop: true, speed: 15},
        jump: {from: 8, to: 8, loop: true, speed: 15},
        fall: {from: 12, to: 12, loop: true, speed: 15}
    }
});
k.loadSprite("enemy", "graphics/mold2-white.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        run: {from: 0, to: 3, loop: true, speed: 3}
    }
});

k.loadSprite("butter", "graphics/butter2.png");
k.loadSprite("jam", "graphics/jam_strawberry_sheet.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        idle: {from: 0, to: 4, loop: true, speed: 3},
    },
});

k.loadSprite("egg", "graphics/egg4.png");


k.loadFont("game-font", "fonts/Planes_ValMore.ttf");
k.loadSound("sndDestroy", "sounds/Destroy.wav");
k.loadSound("sndHurt", "sounds/Hurt.wav");
k.loadSound("sndJump", "sounds/jump.mp3");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("sndBgMusic", "sounds/bit-shift-kevin-macleod.mp3");




k.onLoad(() => {
    k.scene("main-menu", mainMenu);
    k.scene("game", game);
    k.scene("game-over", () => {});
    k.go("main-menu");
});



