// A grid inside a grid inside a grid

class Sketch17 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFEFD3",
            "light": "#FFC49B",
            "mid": "#ADB6C4",
            "dark": "#294C60",
            "black": "#001B2E",
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        let backgroundColour = randomColour(this.palette);
        background(backgroundColour);

        let size = width;

        let hexW = sqrt(3)*(size);
        let hexH = 2*(size);

        noStroke();

        push();
        translate(width/2, height/2);
        drawInnerHexes(hexW, hexH, backgroundColour, this.palette, 0);

    //     for (let i = 0; i <= width/hexW; i++) {
    //         for (let j = 0; j <= height/(hexH*.75); j++) {

    //             push();

    //             if (j%2 == 0) {
    //                 translate(i*hexW, j*hexH*.75);
    //             } else {
    //                 translate(i*hexW + hexW/2, j*hexH*.75);
    //             }

    //             let colour = randomColour(this.palette);

    //             while (colour == backgroundColour) {
    //                 colour = randomColour(this.palette);
    //             }

    //             fill(colour);
    //             ellipse(0, 0, hexW);

    //             drawInnerHexes(hexW, hexH, colour, this.palette);

    //             pop();
    //         }
    //     }
        pop();
    }
}

function drawInnerHexes(w, h, colour, palette, level) {

    level++;

    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {

            push();

            if (l%2 == 0) {
                translate(k*w/3, l*h/3*.75);
            } else {
                if (k == 1) {
                    pop();
                    continue;
                }
                translate(k*w/3 + w/6, l*h/3*.75);
            }

            let innerColour = randomColour(palette);

            while (innerColour == colour) {
                innerColour = randomColour(palette);
            }

            fill(innerColour);
            ellipse(0, 0, w/3);

            if (level < 4) {
                drawInnerHexes(w/3, h/3, innerColour, palette, level);
            }

            pop();
        }
    }
}