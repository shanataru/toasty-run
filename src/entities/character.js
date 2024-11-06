import k from "../kaplayContext.js";

export function makeCharacter(pos){
    const playerCharacter = k.add([
        k.sprite("character", {anim: "run"}),
        k.scale(3),
        k.area(),
        k.anchor("center"), //change origin from top left
        k.pos(pos),
        k.body({jumpForce: 1700}),
        { //pass an object for personal methods etc.
            //setControls: () => { //or shorcut .. setControls() {}
            //setControls(){
            setControls: function(){
                k.onButtonPress("jump", () => {
                    if(this.isGrounded()){
                        this.play("jump") //play jump animation of the character
                        this.jump();
                        k.play("sndJump", {volume: 0.5}); //plays sound
                    }
                });
            },
            //setEvents: () => {
            setEvents: function(){
                this.onGround(() => {
                    this.play("run");
                });
            },
        }
    ]);
    return playerCharacter;
}