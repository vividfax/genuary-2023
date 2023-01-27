// Deliberately break one of your previous images, take one of your previous works and ruin it. Alternatively, remix one of your previous works.

class Sketch31 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#E6E1C5",
            "light": "#BCD3F2",
            "mid": "#D4CB92",
            "dark": "#80A4ED",
            "black": "#395C6B",
        }

        // this.noLoop = true;
        this.complete = true;
    }

    prerun() {

        this.backgroundColour = randomColour(this.palette);

        this.wobblyCircles = [];

        for (let i = 0; i < 300; i++) {

            let x = random(width);
            let y = random(height);

            let colour = randomColour(this.palette);
            while (colour == this.backgroundColour) colour = randomColour(this.palette);

            this.wobblyCircles.push(new WobblyCircle(0, 20, x, y, colour));

            for (let k = 0; k < 80; k++) {

                let grow = true;

                if (this.wobblyCircles[i].hitsEdge()) grow = false;
                else {
                    for (let j = 0; j < this.wobblyCircles.length; j++) {

                        if (i == j) continue;

                        if (this.wobblyCircles[i].overlap(this.wobblyCircles[j])) grow = false;
                    }
                }

                if (grow) this.wobblyCircles[i].grow();
            }

            if (this.wobblyCircles[i].radius < 10) this.wobblyCircles[i].radius = 0;
        }
    }

    update() {

        for (let i = 0; i < this.wobblyCircles.length; i++) {
            this.wobblyCircles[i].update();
        }
    }

    display() {

        background(this.backgroundColour);

        for (let i = 0; i < this.wobblyCircles.length; i++) {
            let radius = this.wobblyCircles[i].radius*.2;
            this.wobblyCircles[i].display(radius, radius, color(0, 40));
        }

        rectMode(CENTER);
        noFill();
        stroke(this.backgroundColour);
        strokeWeight(2);

        for (let i = 0; i <= width; i+=20) {
            for (let j = 0; j <= width; j+=20) {

                rect(i, j, 20);
            }
        }

        for (let i = 0; i < this.wobblyCircles.length; i++) {
            this.wobblyCircles[i].display(0, 0);
        }
    }
}
