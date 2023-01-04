// Steal Like An Artist

class Sketch6 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": 255,
            "light": 191,
            "mid": 127,
            "dark": 63,
            "black": 0,
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        push();
        rectMode(CORNER);
        noStroke();
        let blendModes = [ADD, LIGHTEST, DIFFERENCE, EXCLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {

                let colours = [255, 200, 100];
                colours = shuffle(colours);

                blendMode(BLEND);
                fill(colours[0], colours[1], colours[2]);
                rect(i*108, j*108, 108);
                blendMode(random(blendModes));
                image(portraitImage, i*108, j*108, 108, 108);
                blendMode(random(blendModes));
                image(portraitImage, i*108, j*108, 108, 108);
            }
        }

        pop();
    }
}
