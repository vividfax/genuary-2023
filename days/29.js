// Maximalism

class Sketch29 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F0FFEE",
            "light": "#FFDD00",
            "mid": "#E738B2",
            "dark": "#D9371E",
            "black": "#112BA0"
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        background(randomColour([this.palette.light, this.palette.mid]));

        let shapes = ["flower", "waves", "star", "rainbow", "eye"];

        for (let i = 0; i < 300; i++) {

            push();
            translate(random(width), random(height));

            let shape = random(shapes);

            if (shape == "flower") this.displayFlower();
            else if (shape == "waves") this.displayWaves();
            else if (shape == "star") this.displayStar();
            else if (shape == "rainbow") this.displayRainbow();
            else if (shape == "eye") this.displayEye();

            pop();
        }

        translate(width/2, height/2);
        // this.displayEye();
    }

    displayFlower() {

        push();
        rotate(random(360));

        let size = 100;

        noStroke();

        for (let i = size; i >= 0; i-=5) {

            if (i > size-10) fill(this.palette.white);
            else fill(randomColour(this.palette));

            for (let j = 0; j < 6; j++) {

                push();
                rotate(60*j);
                ellipse(0, 40, i/2);
                pop();
            }
            ellipse(0, 0, i);
        }

        pop();
    }

    displayWaves() {

        push();
        translate(-50, -50)
        rotate(random(360));

        noFill();

        let size = 22;

        for (let i = size; i >= 0; i-=2.5) {

            if (i > size-3) stroke(this.palette.white);
            else stroke(randomColour(this.palette));

            strokeWeight(i);

            for (let j = -1; j <= 1; j++) {

                push();
                translate(15*j, 15*j);

                bezier(85, 20, 10, 10, 90, 90, 15, 80);
                pop();
            }

        }

        pop();
    }

    displayStar() {

        push();
        rotate(random(360));

        let size = 80;
        fill(randomColour(this.palette));

        for (let i = size; i >= 0; i-=2.5) {

            if (i > size-3) stroke(this.palette.white);
            else stroke(randomColour(this.palette));

            strokeWeight(i);
            strokeJoin(ROUND)
            drawStar(0, 0, 10, 5);
        }

        pop();
    }

    displayRainbow() {

        noFill();

        push();
        rotate(random(360));

        let size = 30;

        for (let i = size; i >= 0; i-=2.5) {

            if (i > size-3) stroke(this.palette.white);
            else stroke(randomColour(this.palette));

            strokeWeight(i);
            arc(0, 0, 80, 80, 180, 360);

        }

        let outlineColour = randomColour(this.palette);
        while (outlineColour == this.palette.white) outlineColour = randomColour(this.palette);

        fill(this.palette.white);
        stroke(outlineColour);
        strokeWeight(4);
        ellipse(-40, 15, 20);
        ellipse(-50, 15, 20);
        ellipse(-30, 15, 20);
        ellipse(-45, 10, 20);
        ellipse(-35, 10, 20);
        ellipse(40, 15, 20);
        ellipse(50, 15, 20);
        ellipse(30, 15, 20);
        ellipse(45, 10, 20);
        ellipse(35, 10, 20);

        noStroke();
        ellipse(-40, 15, 20);
        ellipse(-50, 15, 20);
        ellipse(-30, 15, 20);
        ellipse(-45, 10, 20);
        ellipse(-35, 10, 20);
        ellipse(40, 15, 20);
        ellipse(50, 15, 20);
        ellipse(30, 15, 20);
        ellipse(45, 10, 20);
        ellipse(35, 10, 20);

        pop();
    }

    displayEye() {

        push();
        rotate(random(360));

        let size = 20;
        let outlineColour = randomColour(this.palette);
        while (outlineColour == this.palette.white) outlineColour = randomColour(this.palette);
        stroke(outlineColour);
        strokeWeight(2)
        fill(this.palette.white);
        ellipse(0, 0, size*4);

        let lookX = random(size);

        for (let i = size; i >= 0; i-=2.5) {

            stroke(randomColour(this.palette));
            strokeWeight(i);
            strokeJoin(ROUND)
            ellipse(lookX, 0, i)
        }

        pop();
    }
}

function drawStar(x, y, radius2, npoints) {

    push();
    rotate(-90);
    var radius1 = radius2/2.6;

    var angle = Math.PI*2 / npoints;
    var halfAngle = angle/2.0;

    beginShape();
    for (var a = 0; a < Math.PI*2; a += angle) {
      var sx = x + Math.cos(a) * radius2;
      var sy = y + Math.sin(a) * radius2;
      vertex(sx, sy);
      sx = x + Math.cos(a+halfAngle) * radius1;
      sy = y + Math.sin(a+halfAngle) * radius1;
      vertex(sx, sy);
    }
    vertex(x + Math.cos(0) * radius2, y + Math.sin(0) * radius2);

    endShape(CLOSE);
    pop();
  }