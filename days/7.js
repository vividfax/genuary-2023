// Sample a color palette from your favorite movie/album cover

// Grand Budapest Hotel

class Sketch7 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFF0F4",
            "light": "#FFC7C4",
            "mid": "#FC90A7",
            "dark": "#C9A156",
            "black": "#313D58",
            "extra": "#953535"
        }

        this.noLoop = true;
    }

    update() {

    }

    display() {

        push();
        rectMode(CORNER);
        noStroke();
        fill(this.palette.light);
        background(this.palette.mid);
        rect(0, 0, width, 430);
        pop();

        this.displayWindows();
        this.displayColumns();
        this.displayRoof();
        this.displayRailing();
        this.displayDormers();
    }

    displayWindows() {

        push();
        translate(0, 6);

        let windowW = 19;
        let windowH = windowW*2.3;

        let rows = 10;
        let padding = 41;

        let pinkWindow = false;
        let pinkWindowChance = 66;

        for (let j = 0; j < rows; j++) {

            push();
            translate(0, -windowH/2);
            rectMode(CORNER);
            noStroke();
            fill(this.palette.mid);
            rect(0, j*windowH*1.7-windowH*.1, width, windowH*.25);
            rect(0, j*windowH*1.7+windowH, width, windowH*.25);
            fill(this.palette.white);
            rect(0, j*windowH*1.7-windowH*.1, width, windowH*.12);
            rect(0, j*windowH*1.7+windowH, width, windowH*.14);

            pop();

            for (let i = padding; i <= width-padding; i += windowW*2.4) {

                let windowColour, barColour;
                if (random() < 0.85) {
                    windowColour = this.palette.black;
                    barColour = this.palette.dark;
                } else {
                    windowColour = this.palette.dark;
                    barColour = this.palette.black;
                }
                if (!pinkWindow && pinkWindowChance < 44 && random() < 1/pinkWindowChance) {
                    pinkWindow = true;
                    windowColour = this.palette.extra;
                    barColour = this.palette.dark;
                } else {
                    pinkWindowChance--;
                }

                push();
                translate(i-windowW/2, j*windowH*1.7);
                translate(0, -windowH/2);
                rectMode(CORNER);
                noStroke();
                fill(this.palette.white);
                quad(-windowW*0.3, -windowH*.1, 0, windowH*.4, windowW, windowH*.4, windowW+windowW*0.3, -windowH*.1);

                fill(windowColour);
                rect(0, 0, windowW, windowH, windowW, windowW, 0, 0);
                stroke(barColour);
                strokeWeight(windowW*.1);
                line(windowW/2, 0, windowW/2, windowH);
                strokeWeight(windowW*.15);
                stroke(this.palette.white);
                line(0, windowH*.25, windowW, windowH*.25);
                stroke(this.palette.white);
                strokeWeight(windowH*.12);
                noFill();
                rect(0, 0, windowW, windowH, windowW, windowW, 0, 0);

                pop();
            }
        }

        pop();
    }

    displayColumns() {

        push();

        noStroke();
        fill(this.palette.white);

        for (let i = 0; i < height; i += 6) {

            push();
            rect(0, i, 25 + random(0, 10), random(5, 6));
            rect(width, i, 25 + random(0, 10), random(5, 6));
            pop();
        }

        pop();
    }

    displayRoof() {

        push();

        rectMode(CORNER);
        noStroke();
        fill(this.palette.mid);
        rect(0, 0, width, 128);
        fill(this.palette.white);
        rect(0, 0, width, 110);

        push();
        translate(0, 110);
        noStroke();
        fill(this.palette.white);

        for (let i = 6; i < width; i+=15) {

            rect(i, 0, 4, 6);
        }
        pop();

        fill(this.palette.black);
        rect(0, 0, width, 100);

        strokeWeight(1.5);
        stroke(this.palette.white);
        fill(this.palette.dark);
        triangle(-2, 0, -2, 80, 160, 0);
        triangle(width+2, 0, width+2, 80, width-160, 0);
        noStroke();
        rect(0, 0, width, 45)

        pop();
    }

    displayRailing() {

        push();
        translate(0, 5);

        stroke(this.palette.white);
        strokeWeight(1.5);
        line(70, 25-1, width-70, 25-1);

        noFill();
        strokeWeight(1.5);
        stroke(this.palette.black);

        for (let i = 70; i < width-70; i+=20) {

            line(i, 20, i, 50);
            ellipse(i, 25, 6);
            ellipse(i+10, 33, 14);
            ellipse(i+10, 42, 20);
        }
        line(width-70, 20, width-70, 50);
        ellipse(width-70, 25, 6);

        line(70, 25, width-70, 25);

        fill(this.palette.dark);
        noStroke();
        rectMode(CORNER);
        rect(0, 0, 70-1, 30);
        rect(width-70+1, 0, width-70+1, 30);

        stroke(this.palette.white);
        strokeWeight(1.5);
        line(70-1, 40, width-70+1, 40);

        pop();
    }

    displayDormers() {

        push();

        let w = 19;
        let h = w*2.3;
        let padding = 41;

        for (let i = padding; i <= width-padding; i+= w*2.4) {

            strokeWeight(h*.18)
            fill(this.palette.white);
            stroke(this.palette.white);
            rect(i, 80, w, h, 25, 25, 0, 0);
            strokeWeight(h*.12)
            stroke(this.palette.black);
            fill(this.palette.black);
            rect(i, 80, w, h, 25, 25, 0, 0);

            if (random() < 0.15) {
                fill(this.palette.white);
            }
            rect(i, 91, w, h*.8);
            stroke(this.palette.dark);

            strokeWeight(w*.1);
            noFill();
            line(i, 75, i, 100);
            line(i-5, 85, i+5, 85);
            rect(i, 87.5, 12, 22);
            stroke(this.palette.light);
            strokeWeight(h*.12)
            rect(i, 91, w, h*.8);
        }

        pop();

        rectMode(CORNER);
        noStroke();
        fill(this.palette.white);
        rect(0, 99, width, 10);
    }
}
