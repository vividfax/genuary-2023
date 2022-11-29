// Suprematism

class Sketch11 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": 255,
            "light": 191,
            "mid": 127,
            "dark": 63,
            "black": 0,
        }

        this.size;
    }

    update() {

        this.size = random(540*2);
    }

    display() {

        stroke(random(255));
        noFill();
        circle(width/2, height/2, this.size);
    }
}
