// My kid could have made that

class Sketch26 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": [203, 223, 144, 150],
            "light": [143, 173, 136, 150],
            "mid": [127, 156, 150, 150],
            "dark": [77, 124, 138, 150],
            "black": [27, 64, 121, 150],
        }

        this.complete = true;
    }

    prerun() {

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {

                if (random() < 0.5) {
                    set(i, j, 110);
                } else {
                    set(i, j, 140);
                }
            }
        }

        this.backgroundColour = randomColour(this.palette);

        this.wobblyCircles = [];

        for (let i = 0; i < random(4, 7); i++) {

            let colour = randomColour(this.palette);
            while (colour == this.backgroundColour) colour = randomColour(this.palette);

            this.wobblyCircles.push(new WobblyCircle(random(50, 90), 1, random(100, width-100), random(100, height-100), colour));
            this.wobblyCircles.push(new WobblyCircle(random(5, 10), 1, random(50, width-50), random(50, height-50), colour));
            this.wobblyCircles.push(new WobblyCircle(random(5, 10), 1, random(50, width-50), random(50, height-50), colour));
        }
    }

    update() {

        for (let i = 0; i < this.wobblyCircles.length; i++) {
            this.wobblyCircles[i].update();
        }
    }

    display() {

        updatePixels();

        background(this.backgroundColour);
        background(this.backgroundColour);
        background(this.backgroundColour);

        for (let i = 0; i < this.wobblyCircles.length; i++) {
            this.wobblyCircles[i].display(0, 0);
        }
    }
}

class WobblyCircle {

    constructor(radius, wobble, x, y, colour) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;

        this.offset = (radius+1)/20*wobble;

        this.offsets = [];
        this.offsetDirections = [];

        for (let i = 0; i < 12; i++) {

            this.offsets[i] = random(-this.offset, this.offset);
            this.offsetDirections[i] = random([-1, 1]);
        }
    }

    update() {

        for (let i = 0; i < 12; i++) {

            let currentOffset = this.offsets[i];

            if (currentOffset > this.offset || currentOffset < -this.offset) this.offsetDirections[i] *= -1;

            this.offsets[i] += this.offsetDirections[i]*random(0.05*this.radius/50);
        }
    }

    overlap(otherCircle) {

        let distance = dist(this.x, this.y, otherCircle.x, otherCircle.y);
        let radii = this.radius + otherCircle.radius + 3;

        if (distance < radii) return true;
    }

    hitsEdge() {

        let borderWidth = 27;

        if (this.x + this.radius >= width-borderWidth) return true;
        else if (this.x - this.radius <= borderWidth) return true;
        else if (this.y + this.radius >= height-borderWidth) return true;
        else if (this.y - this.radius <= borderWidth) return true;
    }

    grow() {

        this.radius++;
    }

    display(offsetX, offsetY, col) {

        let colour = col || this.colour;

        let radius = this.radius;

        if (radius <= 0) return;

        push();
        translate(this.x + offsetX, this.y + offsetY);
        angleMode(DEGREES);
        noStroke();
        fill(colour);

        beginShape();

        for (let i = 0; i < 2; i++) {

            curveVertex(0, -radius+this.offsets[0]);
            curveVertex(radius*.7+this.offsets[1], -radius*.7+this.offsets[2]);
            curveVertex(radius+this.offsets[3], 0);
            curveVertex(radius*.7+this.offsets[4], radius*.7+this.offsets[5]);
            curveVertex(0, radius+this.offsets[6]);
            curveVertex(-radius*.7+this.offsets[7], radius*.7+this.offsets[8]);
            curveVertex(-radius+this.offsets[9], 0);
            curveVertex(-radius*.7+this.offsets[10], -radius*.7+this.offsets[11]);
        }

        endShape(CLOSE);

        pop();
    }
}