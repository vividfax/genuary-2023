// A grid inside a grid inside a grid

class Sketch17 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": 255,
            "light": 191,
            "mid": 127,
            "dark": 63,
            "black": 0,
        }
    }

    update() {

    }

    display() {

        circle(10, 10, 19);
    }
}
