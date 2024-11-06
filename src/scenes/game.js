import k from "../kaplayContext";
import { makeCharacter } from "../entities/character";
import {createWorld, moveWorld} from "../entities/world";


export default function game(){
    k.setGravity(3100);

    createWorld();
    const playerCharacter = makeCharacter(k.vec2(200, 554));
    playerCharacter.setControls();
    playerCharacter.setEvents();

    let gameSpeed = 300;
    k.loop(1, () =>  {
        gameSpeed += 50;
    });

    k.add([
        k.rect(1280, 100),
        k.pos(0, 600),
        k.area(),
        k.opacity(0),
        k.body({isStatic: true}),
    ]);

    
    k.onUpdate( () => {
        moveWorld(-100, -gameSpeed);
    });
}