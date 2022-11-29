// Art Deco

class Sketch20 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFE68A",
            "light": "#CBAF49",
            "mid": "#CEA441",
            "dark": "#1E7174",
            "black": "#101A2B"
        }

        this.font = "Limelight";

        this.noLoop = true;
    }

    prerun() {

        textFont(this.font);
    }

    update() {

    }

    display() {

        push();

        background(this.palette.black)

        fill(this.palette.black);
        stroke(this.palette.mid);
        translate(width/2, height/2);

        let size = 1000;

        for (let i = 0; i < size*100; i++) {

            if (random() < 0.5) {
                stroke(this.palette.black);
                if (random() < 0.5) fill(this.palette.mid);
                else fill(this.palette.white);
            } else {
                stroke(this.palette.mid);
                fill(this.palette.black);
            }

            strokeWeight(random(3, 10));
            let w = random(1, 3)*size;
            let h = random(1, 3)*size;
            this.randomShape(w, h);
            size -= 10;

            if (size < 100) break;
        }

        noFill();
        strokeWeight(30);
        stroke(this.palette.mid);
        rect(0, 0, width, height);
        strokeWeight(20);
        stroke(this.palette.white);
        rect(0, 0, width, height);

        strokeWeight(random(3, 10));
        stroke(this.palette.black);
        fill(this.palette.mid);
        rect(0, 0, 270, 130);

        fill(this.palette.black);
        noStroke();
        textSize(50);
        text("Genuary", 0, 0);

        pop();
    }

    randomShape(w, h) {

        let shape = random(["rect", "diamond", "rect", "diamond", "rect", "diamond", "ellipse"]);

        if (shape == "rect") {
            rect(0, 0, w, h);
        } else if (shape == "diamond") {
            push();
            rotate(45);
            rect(0, 0, w, w);
            pop();
        } else if (shape == "ellipse") {
            push();
            noFill();
            stroke(this.palette.dark);
            strokeWeight(5);
            if (random() < 0.5) rotate(45);
            rotate(45);
            ellipse(0, 0, w*.5, w*1.5);
            rotate(90);
            ellipse(0, 0, w*.5, w*1.5);
            pop();
        }
    }
}
