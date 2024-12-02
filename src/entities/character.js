import k from "../kaplayContext.js";

let playerCharacter;
const PLAYER_STATUS = ["normal", "iframe", "buff"];
let statusEndTimer = null;

export function makeCharacter(pos){
    playerCharacter = k.add([
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
                        k.play("sndJump", {volume: 0.3}); //plays sound
                    }
                });
            },
            //setEvents: () => {
            setEvents: function(){
                this.onFall(() => {
                    this.play("fall");
                });
                
                this.onGround(() => {
                    this.play("run");
                });
            },
            status: PLAYER_STATUS[0],
        },
    ]);

    playerCharacter.onUpdate(() => {
        if (playerCharacter.status === PLAYER_STATUS[2]) { 
            let time = k.time() * 10;
            let r = Math.sin(time) * 128 + 128;
            let g = Math.sin(time + 2) * 128 + 128;
            let b = Math.sin(time + 4) * 128 + 128;
            r = Math.min(r + 128, 255); 
            g = Math.min(g + 128, 255);
            b = Math.min(b + 128, 255);

            playerCharacter.color = k.rgb(r, g, b);
        }
    });

    playerCharacter.shadow = k.add([
        {
            draw() {
                let shadowWidth = (605 - playerCharacter.pos.y)/30;
                k.drawEllipse({
                    pos: k.vec2(playerCharacter.pos.x, 600), // Center of an 800x600 canvas
                    radiusX: 28 - shadowWidth,          // Horizontal radius
                    radiusY: 3,           // Vertical radius
                    color: k.rgb(0, 0, 0), // Red
                    opacity: 0.3,          // Fully opaque
                });
            },
        },
    ]);

    //child game object
    playerCharacter.collectUI = playerCharacter.add([
        k.text("", {font: "game-font", size: 12},), 
        k.pos(10, -10),
        k.opacity(1.0),
        k.color(255, 255, 0),
    ]);
    return playerCharacter;
}

export function changeCharacterStatus(statusType, statusLength){
    if (statusEndTimer !== null) { //cancel any status end timer from prior status change
        statusEndTimer.cancel();
        statusEndTimer = null;
    }

    if (statusType === PLAYER_STATUS[1]){ //iframe
        playerCharacter.opacity = 0.5;
        playerCharacter.status = PLAYER_STATUS[1];
        statusEndTimer = k.wait(statusLength, () => {
            playerCharacter.opacity = 1.0; 
            playerCharacter.color = k.rgb(255, 255, 255);
            playerCharacter.status = PLAYER_STATUS[0];
            statusEndTimer = null;
        });
    }
    else if (statusType === PLAYER_STATUS[2]){ //buff
        playerCharacter.opacity = 1.0; 
        playerCharacter.status = PLAYER_STATUS[2];
        statusEndTimer = k.wait(statusLength, () => {
            playerCharacter.opacity = 1.0; 
            playerCharacter.color = k.rgb(255, 255, 255);
            playerCharacter.status = PLAYER_STATUS[0];
            statusEndTimer = null;
        });
    }
    else{
        playerCharacter.color = k.rgb(255, 255, 255);
        playerCharacter.opacity = 1.0;
        statusEndTimer = null;
    }
}