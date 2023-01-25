// More Moiré

class Sketch23 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#E3D26F",
            "light": "#CA895F",
            "mid": "#A15E49",
            "dark": "#4E3822",
            "black": "#2F1B25",
        }

        // this.noLoop = true;
        this.complete = true;

        this.angle1 = 0;
        this.angle2 = 0;
        this.angle3 = 0;

    }

    prerun() {

        background(this.palette.mid);

        this.backgroundColour = this.palette.mid;
        this.ringColour = randomColour(this.palette);

        while (this.ringColour == this.backgroundColour) this.ringColour = randomColour(this.palette);
    }

    update() {

    }

    display() {

        background(161, 94, 73, 30);

        push();
        translate(width/2, height/2);
        angleMode(DEGREES);

        rotate(this.angle1);
        translate(-10*5, 0);
        this.concentricCircles(0, 0, 20*1.2-1, 4);

        rotate(this.angle2);
        translate(-10*15*1.2, 0);
        this.concentricCircles(0, 0, 15*1.2-2, 4);

        rotate(this.angle3);
        translate(-10*10*1.2-4, 0);
        this.concentricCircles(0, 0, 10*1.2-2, 4);

        pop();

        this.angle1 += 1.5;
        this.angle2 += 1;
        this.angle3 += 1.5;
    }

    concentricCircles(x, y, numOfRings, weight) {

        noFill();
        stroke(this.ringColour);
        strokeWeight(weight);

        for (let i = 0; i < numOfRings; i++) {

            ellipse(x, y, i*weight*weight+weight);
        }
    }
}
