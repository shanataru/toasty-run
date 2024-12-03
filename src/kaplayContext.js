import kaplay from "kaplay";

const k = kaplay(
    {
        width: 1280,
        height: 720,
        letterbox: true, //keep aspect ratio
        background: [0,0,0],
        global: false,
        touchToMouse: true,
        buttons: {
            jump: {
                keyboard: ["space"],
                mouse: ["left"],
            },
        },
        debugKey: "d",
        debug: false, // is always on on default
    }
);

export default k;