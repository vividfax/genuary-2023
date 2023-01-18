// Tessellation

class Sketch12 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFF8F0",
            "light": "#9DD9D2",
            "mid": "#F4D06F",
            "dark": "#FF8811",
            "black": "#50427F",
        }

        this.complete = true;
        // this.noLoop = true;

        this.spacing = 60;
        this.xOffset = -this.spacing;
        this.yOffset = -this.spacing;
    }

    update() {

        let spacing = this.spacing;

        this.xOffset++;
        this.yOffset++;

        if (this.xOffset > 0) {
            this.xOffset = -this.spacing;
        }

        if (this.yOffset > 0) {
            this.yOffset = -this.spacing;
        }
    }

    display() {

        background(this.palette.white);

        push();
        rectMode(CORNER);
        noStroke();

        let spacing = this.spacing;

        for (let i = -spacing; i < width+spacing*2; i+=spacing) {
            for (let j = -spacing; j < height+spacing*2; j+=spacing) {

                fill(this.palette.dark);

                if (j%(spacing*2) == 0 && i%(spacing*2) == 0) {
                    fill(this.palette.mid);
                } else if (j%(spacing*2) == spacing && i%(spacing*2) == spacing) {
                    fill(this.palette.mid);
                }

                rect(i+this.xOffset, j+this.yOffset, spacing);

                fill(this.palette.mid);

                if (j%(spacing*2) == 0 && i%(spacing*2) == 0) {
                    fill(this.palette.white);
                } else if (j%(spacing*2) == spacing && i%(spacing*2) == spacing) {
                    fill(this.palette.white);
                }

                ellipse(i+spacing/2+this.xOffset, j+spacing/2+spacing/2+this.yOffset, spacing);
                ellipse(i+spacing/2-spacing/2+this.xOffset, j+spacing/2+this.yOffset, spacing);
            }
        }

        strokeWeight(spacing*.1);

        for (let i = -spacing; i < width+spacing*2; i+=spacing) {
            for (let j = -spacing; j < height+spacing*2; j+=spacing) {

                stroke(this.palette.white);
                noFill();

                if (j%(spacing*2) == 0 && i%(spacing*2) == 0) {
                    stroke(this.palette.light);
                    fill(this.palette.black);
                } else if (j%(spacing*2) == spacing && i%(spacing*2) == spacing) {
                    stroke(this.palette.light);
                    fill(this.palette.black);
                }

                ellipse(i+spacing/2-spacing/2+this.xOffset, j+spacing/2+this.yOffset, spacing/2);
            }
        }

        pop();
    }
}
