// In the style of Hilma Af Klint

class Sketch27 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": ["#FDE8EF", "#F6D9E3"],
            "light": ["#FFDA73", "#F1CC68"],
            "mid": ["#5B92AF", "#538AA8"],
            "dark": ["#E8513A", "#DB4933"],
            "black": ["#1B1F1E", "#1E2322"],
            "extra": ["#FFBDB7", "#F3B2AE"]
        }

        this.noLoop = true;
    }

    prerun() {

        this.circles = [];

        for (let i = 0; i < 300; i++) {

            let x = random(width);
            let y = random(height);

            this.circles.push(new CirclePackCircle(x, y));

            for (let k = 0; k < 80; k++) {

                let grow = true;

                if (this.circles[i].hitsEdge()) grow = false;
                else {
                    for (let j = 0; j < this.circles.length; j++) {

                        if (i == j) continue;

                        if (this.circles[i].overlap(this.circles[j])) grow = false;
                    }
                }

                if (grow) this.circles[i].grow();
            }

            if (this.circles[i].radius < 30) this.circles[i].radius = 0;
        }

        pattern(PTN.noise(0.1));
    }

    update() {

    }

    display() {

        noStroke();
        patternColors(this.palette.dark);
        rectPattern(width/2, height/2, width, height);

        for (let i = 0; i < this.circles.length; i++) {

            let circleTypes = ["sections", "sections", "shell", "shell", "strokeFlower", "strokeFlower", "spiral", "spiral", "seven"];
            let type = random(circleTypes);

            if (type == "sections") {
                this.drawSectionedCircle(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            } else if (type == "shell") {
                this.drawShell(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            } else if (type == "strokeFlower") {
                this.drawStrokeFlower(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            } else if (type == "spiral") {
                this.drawSpiral(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            } else if (type == "seven") {
                this.drawSeven(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            }
        }

        noFill();
        stroke(this.palette.light[0]);
        strokeWeight(14);
        rect(width/2, height/2, width, height);

        // filter(BLUR, 1);
    }

    drawSectionedCircle(x, y, size) {

        if (size <= 0) return;
        size *= 2;

        push();
        translate(x, y);
        rotate(random(360));

        let w = size*random(0.95, 1);
        let h = size*random(0.95, 1);

        noStroke();
        let sectionColour = randomColour(this.palette);
        while (sectionColour == this.palette.dark) sectionColour = randomColour(this.palette);
        patternColors(sectionColour);
        arcPattern(0, 0, w, h, 0, 360);
        sectionColour = randomColour(this.palette);
        while (sectionColour == this.palette.dark) sectionColour = randomColour(this.palette);
        patternColors(sectionColour);
        arcPattern(0, 0, w, h, 270, 90);
        patternColors(randomColour(this.palette));
        arcPattern(0, 0, w*2/3, h*2/3, 90, 270);
        patternColors(randomColour(this.palette));
        arcPattern(0, 0, w*2/3, h*2/3, 270, 90);
        patternColors(randomColour(this.palette));
        arcPattern(0, 0, w*1/3, h*1/3, 270, 90);
        patternColors(randomColour(this.palette));
        arcPattern(0, 0, w*1/3, h*1/3, 90, 270);

        pop();
    }

    drawShell(x, y, size) {

        if (size <= 0) return;
        size *= 2;

        push();
        translate(x, y);
        rotate(random(360));

        let fillColour = randomColour(this.palette);
        let strokeColour = randomColour(this.palette);

        while (fillColour == this.palette.dark) fillColour = randomColour(this.palette);
        while (strokeColour == fillColour || strokeColour == this.palette.dark) strokeColour = randomColour(this.palette);

        let w = size * random(0.95, 1);
        let h = size * random(0.95, 1);

        patternColors(fillColour);
        arcPattern(0, 0, w, h, 0, 360);

        strokeWeight(2);
        stroke(strokeColour[0]);

        for (let i = 0; i < 20; i+=2) {

            if (size-i*10 < 15) break;
            ellipse(0, i*5, w-i*10, h-i*10);
        }

        pop();
    }

    drawStrokeFlower(x, y , size) {

        if (size <= 0) return;
        size *= 2;

        push();
        translate(x, y);
        rotate(random(360));

        let strokeColour = randomColour(this.palette);
        while (strokeColour == this.palette.dark) strokeColour = randomColour(this.palette);

        strokeWeight(2);
        stroke(strokeColour[0]);

        ellipseMode(CORNER);

        for (let i = 0; i < 5; i++) {
            rotate(72);
            ellipse(-size*.17, 0, size*random(0.95, 1)*0.5, size*random(0.95, 1)*0.5);
        }

        pop();
    }

    drawSpiral(x, y, size) {

        if (size <= 0) return;

        size *= 2;

        let radius = 0;
        let angle = 0;

        push();
        translate(x, y);
        rotate(random(360));

        let fillColour = randomColour(this.palette);
        let strokeColour = randomColour(this.palette);

        while (fillColour == this.palette.dark) fillColour = randomColour(this.palette);
        while (strokeColour == fillColour || strokeColour == this.palette.dark) strokeColour = randomColour(this.palette);

        patternColors(fillColour);
        arcPattern(0, 0, size, size, 0, 360);

        strokeWeight(2);
        stroke(strokeColour[0]);
        ellipse(0, 0, size, size);

        noFill();

        for (let i = 0; i < 3000; i++) {

            rotate(angle);
            angle += 0.0005;
            radius += 0.015*size/60;
            point(radius, 0);

            if (radius > size/2 || radius > size/2) break;
        }

        strokeWeight(10);
        point(-4, 2);

        pop();
    }

    drawSeven(x, y, size) {

        if (size <= 0) return;

        push();
        translate(x, y);
        rotate(random(360));

        let fillColour = randomColour(this.palette);
        let strokeColour = randomColour(this.palette);

        while (fillColour == this.palette.dark) fillColour = randomColour(this.palette);
        while (strokeColour == fillColour || strokeColour == this.palette.dark) strokeColour = randomColour(this.palette);

        patternColors(fillColour);
        arcPattern(0, 0, size*.7, size*.7, 0, 360);

        noFill();
        stroke(strokeColour[0]);
        strokeWeight(2);
        ellipse(0, 0, size*.7, size*.7);

        ellipseMode(CORNER);

        for (let i = 0; i < 6; i++) {
            rotate(60);

            fillColour = randomColour(this.palette);
            while (fillColour == this.palette.dark || fillColour == strokeColour) fillColour = randomColour(this.palette);
            patternColors(fillColour);
            arcPattern(-size*.95, 0, size*.7, size*.7, 0, 360);

            noFill();
            stroke(strokeColour[0]);
            strokeWeight(2);
            ellipse(-size*.95, 0, size*.7, size*.7);
        }

        pop();
    }
}

class CirclePackCircle {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.radius = 0;
    }

    overlap(otherCircle) {

        let distance = dist(this.x, this.y, otherCircle.x, otherCircle.y);
        let radii = this.radius + otherCircle.radius;

        if (distance < radii) return true;
    }

    hitsEdge() {

        let borderWidth = 7;

        if (this.x + this.radius >= width-borderWidth) return true;
        else if (this.x - this.radius <= borderWidth) return true;
        else if (this.y + this.radius >= height-borderWidth) return true;
        else if (this.y - this.radius <= borderWidth) return true;
    }

    grow() {

        this.radius++;
    }
}

// function randPattern(t)
// {
//     const ptArr = [
//         PTN.noise(0.5),
//         PTN.noiseGrad(0.4),
//         PTN.stripe(t / int(random(6, 12))),
//         PTN.stripeCircle(t / int(random(6, 12))),
//         PTN.stripePolygon(int(random(3, 7)),  int(random(6, 12))),
//         PTN.stripeRadial(TAU /  int(random(6, 30))),
//         PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
//         PTN.dot(t / 10, t / 10 * random(0.2, 1)),
//         PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
//         PTN.cross(t / int(random(10, 20)), t / int(random(20, 40))),
//         PTN.triangle(t / int(random(5, 20)), t / int(random(5, 20)))
//     ]
//     return random(ptArr);
// }
