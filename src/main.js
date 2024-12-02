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

k.loadSprite("butter", "graphics/butter2.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        idle: {from: 0, to: 0, loop: false, speed: 1}
    }
});

k.loadSprite("jam", "graphics/jam_strawberry_sheet.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        idle: {from: 0, to: 4, loop: true, speed: 3},
    },
});

k.loadSprite("egg", "graphics/egg4.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        idle: {from: 0, to: 0, loop: false, speed: 1}
    }
});

k.loadSprite("rainbow_salt", "graphics/rainbow-salt-shiny.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        idle: {from: 0, to: 1, loop: true, speed: 3}
    }
});


k.loadFont("game-font", "fonts/Planes_ValMore.ttf");
k.loadSound("sndHurt", "sounds/yoink.wav");
k.loadSound("sndJump", "sounds/jump.mp3");
k.loadSound("sndCollect", "sounds/collect.mp3");
k.loadSound("sndPowerUp", "sounds/power_up.wav");
k.loadSound("sndHealthUp", "sounds/health_up.wav");
k.loadSound("sndBgMusic", "sounds/bit-shift-kevin-macleod.mp3");




k.onLoad(() => {
    k.scene("main-menu", mainMenu);
    k.scene("game", game);
    k.scene("game-over", () => {});
    k.go("main-menu");
});



