// Intersections

class Sketch4 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#EFD6AC",
            "light": "#C44900",
            "mid": "#C44900",
            "dark": "#183A37",
            "black": "#04151F",
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        push();
        background(this.palette.white);
        noStroke();
        rectMode(CENTER);

        for (let i = 0; i < 100; i++) {

            push();
            translate(random(width), random(height));
            // rotate(random(360));

            fill(randomColour(this.palette));
            rect(0, 0, random(width/8, width/4), random(width/3, width/2));

            pop();
        }

        filter(BLUR, 4);
        blendMode(EXCLUSION);

        for (let i = 0; i < 8; i++) {

            fill(255);
            ellipse(random(width), random(height), random(width/2, width));
            ellipse(random(width), random(height), random(10, 20));
        }

        pop();
    }
}
