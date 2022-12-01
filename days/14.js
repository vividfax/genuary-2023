// Asemic

class Sketch14 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": color(228, 223, 218), // E4DFDA
            "light": "#D4B483",
            "mid": "#48A9A6",
            "dark": color(193, 102, 107), // #C1666B
            "darkTransparent": color(193, 102, 107, 0), // #C1666B
            "black": color(25, 57, 75), // #19394B
            "blackTransparent": color(25, 57, 75, 0) // #19394B
        }

        this.complete = true;
        this.noLoop = true;
    }

    prerun() {

        let backgroundColour = randomColour([this.palette.light, this.palette.mid]);
        this.backgroundColour = backgroundColour;
    }

    update() {

    }

    display() {

        background(this.backgroundColour);

        noStroke();

        for (let i = 0; i < 5; i++) {

            push();
            translate(random(-width/2, width+width/2), random(-height/2, height+height/2));
            rotate(random(360));
            let circleColour = randomColour(this.palette);
            if (circleColour == this.palette.white) circleColour = randomColour(this.palette);
            fill(circleColour);
            ellipse(0, 0, width*random(.5, 1), height*random(.5, 1));
            pop();
        }

        let w = 25;
        let h = 50;
        let padding = 45;

        for (let l = 0; l <= height; l += 50) {

            let size = random(25*1.0, 25*1.2);

            noStroke();
            fill(color(228, 223, 218, 100));
            push();
            translate(height/2 + random(-5, 5), l+25 + random(-5, 5));
            rotate(random(-1, 1));

            for (let i = 0; i < 10; i++) {

                rect(0, 0, height*random(1.0, 1.5), size*random(1.3, 1.9));
            }
            pop();
        }

        let number = 0;
        textFont("monospace");

        for (let k = padding; k <= width-padding-w; k += 100) {

            number++;

            push();
            translate(k+w, 0);
            rotate(random(-0.1, 0.1));

            stroke(this.backgroundColour);
            strokeWeight(1.5);
            line(0, 0, 0, height);

            for (let l = 0; l < number; l++) {
                line(-w*.75+l*3, 35, -w*.75+l*3, 40);
            }

            pop();

        }

        let scribbleSize = 33;

        for (let k = padding; k <= width-padding-w; k += 100) {

            let numberOfChars = 9-random(5, 9);

            for (let l = padding; l <= height-padding-h; l += 50) {

                stroke(this.backgroundColour);
                strokeWeight(1.5);
                // fill(this.palette.white);
                rect(k+w, l+h/2, 40, 40, 4);
            }

            for (let l = padding; l <= height-padding-h*numberOfChars; l += 50) {
                push();
                translate(-scribbleSize/2, -scribbleSize/2);
                stroke(255, 150);
                scribble.scribbleFilling([k+w, k+w+scribbleSize, k+w+scribbleSize, k+w], [l+h/2, l+h/2, l+h/2+scribbleSize, l+h/2+scribbleSize], 2.5, -45);
                pop();

                if (random() < 0.5) {
                    this.displayCharacter(k, l, w*2, h, this.palette.blackTransparent, this.palette.black);
                } else {
                    this.displayCharacter(k, l, w, h, this.palette.blackTransparent, this.palette.black);
                    this.displayCharacter(k+w, l, w, h, this.palette.blackTransparent, this.palette.black);
                }

                if (random() < 0.05) {

                    push();
                    translate(k+w, l+h/2);

                    stroke(this.palette.dark);
                    noFill();

                    push();
                    rotate(random(360));
                    scribble.scribbleEllipse(0, 0, random(w*2, w*2*1.3), random(h, h*1.3));
                    pop();

                    fill(this.palette.dark);
                    noStroke();
                    translate(w*1.5, -h/2);
                    this.displayCharacter(0, 0, w, h, this.palette.dark, this.palette.dark);
                    pop();
                }
            }
        }

        for (let i = 0; i < 3; i++) {

        }
    }

    displayCharacter(k, l, w, h, colourA, colourB) {

        push();
        translate(k, l);

        noStroke();

        let firstPoint = [random(0, w), random(0, h)];
        let secondPoint = [random(0, w), random(0, h)];
        let firstControlPoint;
        let secondControlPoint;

        let numberOfLines = int(random(2, 5));

        for (let i = 0; i < numberOfLines; i++) {

            firstPoint = secondPoint;
            firstControlPoint = [random(0, w), random(0, h)];
            secondControlPoint = [random(0, w), random(0, h)];
            secondPoint = [random(0, w), random(0, h)];

            let steps = 100;

            for (let j = 0; j < steps; j++) {

                let step = j/steps;
                let colourFadeRatio = 1/(i*j+i)*10-0.2;

                let linePointX = bezierPoint(firstPoint[0], firstControlPoint[0], secondControlPoint[0], secondPoint[0], step);
                let linePointY = bezierPoint(firstPoint[1], firstControlPoint[1], secondControlPoint[1], secondPoint[1], step);

                fill(lerpColor(colourA, colourB, colourFadeRatio));
                if (colourA == this.palette.dark) ellipse(linePointX, linePointY, 50/steps-j/20+2);
                else ellipse(linePointX, linePointY, 50/steps-j/10+2);
            }
        }

        pop();
    }
}