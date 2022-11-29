// Black and white

class Sketch19 extends Sketch {

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

    prerun() {

    }

    update() {

        this.size = random(width*2);
    }

    display() {

        noFill();
        stroke(random(255));
        circle(width/2, height/2, this.size);
    }
}
