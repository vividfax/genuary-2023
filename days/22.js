// Shadows

class Sketch22 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#DCF763",
            "light": "#F1F2EE",
            "mid": "#BFB7B6",
            "dark": "#848C8E",
            "black": "#435058",
        }

        this.noLoop = true;
        this.complete = true;

        this.canvas2 = createGraphics(width, height);
    }

    update() {

    }

    display() {

        background(this.palette.mid);
        this.canvas2.clear();

        push();
        this.canvas2.push();

        rectMode(CENTER);
        noFill();
        stroke(this.palette.dark);
        strokeWeight(4);
        this.canvas2.rectMode(CENTER);
        this.canvas2.noFill();
        this.canvas2.stroke(this.palette.black);
        this.canvas2.strokeWeight(4);

        for (let i = 0; i <= width; i+=30) {
            for (let j = 0; j <= width; j+=30) {

                rect(i+4, j+4, 30);
                this.canvas2.rect(i, j, 30);
            }
        }

        noStroke();
        this.canvas2.noStroke();
        this.canvas2.stroke(this.palette.white);

        fill(this.palette.dark);
        this.canvas2.fill(this.palette.light);

        for (let i = 0; i < 60; i++) {

            let x = random(width);
            let y = random(height);
            let radius = random(5, 100);
            ellipse(x+radius*.2, y+radius*.2, radius*1.2);
            this.canvas2.strokeWeight(radius*.02+0.5);
            this.canvas2.ellipse(x, y, radius);
        }

        this.canvas2.pop();
        pop();

        image(this.canvas2, 0, 0);
    }
}
