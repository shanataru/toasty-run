import k from "../kaplayContext.js";

export function makeCharacter(pos){
    const playerCharacter = k.add([
        k.sprite("character", {anim: "run"}),
        k.scale(3),
        k.area( {shape: new k.Rect(k.vec2(0,5), 25, 25) }),
        k.anchor("center"), //change origin from top left
        k.pos(pos),
        k.body({jumpForce: 1500}),
        { //pass an object for personal methods etc.
            //setControls: () => { //this not defined
            //setControls(){
            setControls: function(){
                k.onButtonPress("jump", () => {
                    if(this.isGrounded()){
                        this.jump();
                        this.play("jump");
                        k.play("sndJump", {volume: 0.5}); //plays sound
                    }
                });
            },
            //setEvents: () => {
            setEvents: 
            function(){
                this.onFall(() => {
                    this.play("fall");
                });
                
                this.onGround(() => {
                    this.play("run");
                });
            },
        }
    ]);
    return playerCharacter;
}