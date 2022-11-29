// In the style of Hilma Af Klint

class Sketch27 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FDE8EF",
            "light": "#FFDA73",
            "mid": "#5B92AF",
            "dark": "#E8513A",
            "black": "#1B1F1E",
            "extra": "#FFBDB7"
        }

        this.noLoop = true;
    }

    prerun() {

        this.circles = [];

        for (let i = 0; i < 200; i++) {

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

            if (this.circles[i].radius < 40) this.circles[i].radius = 0;
        }
    }

    update() {

    }

    display() {

        background(this.palette.dark);

        for (let i = 0; i < this.circles.length; i++) {

            let circleTypes = ["sections", "shell"];
            let type = random(circleTypes);

            if (type == "sections") {
                this.drawSectionedCircle(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            } else if (type == "shell") {
                this.drawShell(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            }
        }

        noFill();
        stroke(this.palette.light);
        strokeWeight(14);
        rect(width/2, height/2, width, height);
    }

    drawSectionedCircle(x, y, size) {

        if (size <= 0) return;
        size *= 2;


        push();
        translate(x, y);
        rotate(random(360));

        noStroke();
        fill(randomColour(this.palette));
        arc(0, 0, size, size, 90, 270);
        fill(randomColour(this.palette));
        arc(0, 0, size, size, 270, 90);
        fill(randomColour(this.palette));
        arc(0, 0, size*2/3, size*2/3, 90, 270);
        fill(randomColour(this.palette));
        arc(0, 0, size*2/3, size*2/3, 270, 90);
        fill(randomColour(this.palette));
        arc(0, 0, size*1/3, size*1/3, 270, 90);
        fill(randomColour(this.palette));
        arc(0, 0, size*1/3, size*1/3, 90, 270);

        pop();
    }

    drawShell(x, y, size) {

        if (size <= 0) return;
        size *= 2;

        push();
        translate(x, y);
        rotate(random(360));

        let strokeColour = randomColour(this.palette);
        let fillColour = randomColour(this.palette);

        while (strokeColour == fillColour || strokeColour == this.palette.dark) strokeColour = randomColour(this.palette);

        stroke(strokeColour);
        fill(fillColour);

        for (let i = 0; i < 20; i++) {

            if (size-i*10 < 0) break;
            ellipse(0, i*5, size-i*10, size-i*10);
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