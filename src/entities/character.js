import k from "../kaplayContext.js";

export function makeCharacter(pos){
    const sonic = k.add([
        k.sprite("character", {anim: "run"}),
        k.scale(3),
        k.area(),
        k.anchor("center"), //change origin from top left
        k.pos(pos),
    ]);
}