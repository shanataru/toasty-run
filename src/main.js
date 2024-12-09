import k from "./kaplayContext";
import mainMenu from "./scenes/mainMenu";  //no need for {}, default export
import game from "./scenes/game";
import gameover from "./scenes/gameover";


k.loadSprite("background", "graphics/kitchen-bg2-blur-4k.png");
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


k.loadFont("game-font", "fonts/Cantika_Cute_Handwriting.otf");
k.loadSound("sndHurt", "sounds/yoink.wav");
k.loadSound("sndGameOver", "sounds/Hurt.wav");
k.loadSound("sndJump", "sounds/toaster-pop.wav");
k.loadSound("sndCollect", "sounds/3-up-fast-2.wav");
k.loadSound("sndPowerUp", "sounds/power_up.wav");
k.loadSound("sndHealthUp", "sounds/health_up.wav");
k.loadSound("BgMusic", "sounds/bit-shift-kevin-macleod.mp3");


k.onLoad(() => {
    k.scene("main-menu", mainMenu);
    k.scene("game", game);
    k.scene("gameover", gameover);
    k.go("main-menu");
});



