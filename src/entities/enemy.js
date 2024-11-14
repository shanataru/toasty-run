import k from "../kaplayContext.js";

export function makeEnemy(pos, enemySpeed, gameSpeed){
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
    });

    enemy.onExitScreen( () => {
        if (enemy.pos.x < 0){
            k.destroy(enemy);
        }
    });

    return enemy;
}