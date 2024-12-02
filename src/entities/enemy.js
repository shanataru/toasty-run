import k from "../kaplayContext.js";

export function makeEnemy(pos, enemySpeed, gameSpeed, playerCharacter){
    const enemy = k.add([
        k.sprite("enemy", {anim: "run"}),
        k.area( {shape: new k.Rect(k.vec2(0,0), 24, 32)} ),
        k.scale(2.5),
        k.anchor("center"), //change origin from top left
        k.pos(pos),
        k.offscreen(), //offscreen component, allow us to check if enemy off screen
        "enemy", //tag
    ]);

    enemy.onUpdate( () => {
        if (gameSpeed < 1300){
            enemy.move(-(gameSpeed + enemySpeed), 0);
        }
        else{
            enemy.move(-(gameSpeed+25), 0);
        }

        if (playerCharacter.status === "buff") { 
            let time = k.time() * 10;
            //let r = Math.sin(time) * 128 + 128;

            let r = Math.sin(time) * 128 + 128;
            let g = Math.sin(time + 2) * 128 + 128;
            let b = Math.sin(time + 4) * 128 + 128;
            r = Math.max(r - 80, 0); 
            g = Math.max(g - 80, 0);
            b = Math.max(b - 80, 0);

            enemy.color = k.rgb(r, g, b);
            enemy.opacity = 0.9; 
        } else{
            enemy.opacity = 1.0;
            enemy.color = k.rgb(255, 255, 255);
        }
    });

    enemy.onExitScreen( () => {
        if (enemy.pos.x < 0){
            k.destroy(enemy);
        }
    });

    return enemy;
}