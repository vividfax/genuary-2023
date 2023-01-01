// Made in 10 minutes

class Sketch2 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F0F3BD",
            "light": "#02C39A",
            "mid": "#00A896",
            "dark": "#028090",
            "black": "#05668D"
        }

        this.complete = true;

        this.size;
    }

    prerun() {

        background(randomColour(this.palette));
    }

    update() {

        this.size = random(width*2);
    }

    display() {

        push();
        noFill();
        stroke(randomColour(this.palette));
        circle(width/2, height/2, this.size);
        pop();
    }
}
