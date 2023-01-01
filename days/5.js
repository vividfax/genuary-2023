// Debug view

class Sketch5 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#C8E0F4",
            "light": "#9DD1F1",
            "mid": "#508AA8",
            "dark": "#BA1200",
            "black": "#031927",
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        noFill();
        background(this.palette.mid);
        stroke(this.palette.light);

        for (let i = 0; i < width+1; i+=30) {
            for (let j = 0; j < height+1; j+=30) {

                push();
                translate(i, j);

                rect(0, 0, 30, 30);

                if (random() < 0.1) {
                    stroke(this.palette.light);

                    if (random() < 0.5) {
                        fill(this.palette.light);
                        ellipse(0, 0, 30);
                    } else if (random() < 0.5) {
                        fill(this.palette.white);
                        ellipse(0, 0, 30);
                    } else {
                        fill(this.palette.light);
                        rect(0, 0, 30);
                        fill(this.palette.black);
                        ellipse(0, 0, 30);
                    }

                } else if (random() < 0.05) {
                    stroke(this.palette.light);
                    ellipse(0, 0, 30*3);
                } else if (random() < 0.01) {
                    stroke(this.palette.light);
                    ellipse(0, 0, 30*3*3);
                }

                pop();
            }
        }

        push();
        translate(width/2, height/2);

        for (let i = 0; i < 15; i++) {

            stroke(this.palette.dark);
            rect(0, 0, width*3/i);
        }

        translate(-width/2, -height/2);

        for (let i = 0; i < 15; i++) {

            stroke(this.palette.dark);
            rect(0, 0, width*3/i);
            ellipse(random(width), random(height), 30);
            ellipse(width/2, random(height), 30);
        }

        pop();


        for (let i = 0; i < width+1; i+=30) {
            for (let j = 0; j < height+1; j+=30) {

                push();
                translate(i, j);

                if (i == 0 || i == width || j == 0 || j == height) {
                    stroke(this.palette.mid);
                    fill(this.palette.black);
                    rect(0, 0, 30, 30);
                }

                pop();
            }
        }
    }
}
