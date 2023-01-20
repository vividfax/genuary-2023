// Definitely not a grid

class Sketch18 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#CEB992",
            "light": "#73937E",
            "mid": "#585563",
            "dark": "#5B2E48",
            "black": "#471323",
        }

        this.circles = [];
        this.circles2 = [];
        this.numOfCircles = 1000;

        this.complete = true;
    }

    prerun() {

        this.circles = [];
        this.circles2 = [];

        background(this.palette.black);
    }

    update() {

        for (let i = 0; i < 4; i++) {
            let colour = randomColour([this.palette.mid, this.palette.dark]);

            this.circles.push(new CirclePack(width/2, height/2, width*.43, colour));
        }

        for (let i = 0; i < this.circles.length; i++) {

            let circle = this.circles[i];

            circle.update(this.circles);

            if (!circle.growing && circle.radius > 11 && circle.subCircles < circle.radius*2) {
                let colour = randomColour([this.palette.white, this.palette.light]);

                this.circles2.push(new CirclePack(circle.x, circle.y, circle.radius, colour));
                circle.subCircles++;
            }
        }

        for (let i = 0; i < this.circles2.length; i++) {
            this.circles2[i].update(this.circles2);
        }
    }

    display() {

        for (let i = 0; i < this.circles.length; i++) {

            this.circles[i].display();
        }

        for (let i = 0; i < this.circles2.length; i++) {
            this.circles2[i].display();
        }
    }
}

class CirclePack {

    constructor(centreX, centreY, centreRadius, colour) {

        this.centreX = centreX;
        this.centerY = centreY;
        this.centreRadius = centreRadius;
        this.colour = colour;

        this.x = random(centreX-centreRadius, centreX+centreRadius);
        this.y = random(centreY-centreRadius, centreY+centreRadius);
        this.radius = 0;

        this.growing = true;
        this.subCircles = 0;
    }

    update(circles) {

        if (!this.growing) return;

        let grow = true;

        if (dist(this.x, this.y, this.centreX, this.centerY) < this.centreRadius) {

            for (let i = 0; i < circles.length; i++) {

                let circle = circles[i];
                if (circle == this) continue;

                if (this.overlapping(circle.x, circle.y, circle.radius)) {
                    grow = false;
                }
            }
        } else {
            grow = false;
        }

        if (grow) this.radius++;
        else this.growing = false;
    }

    display() {

        noStroke()
        fill(this.colour);
        ellipse(this.x, this.y, this.radius*2);
    }

    overlapping(x, y, radius) {

        let distance = dist(this.x, this.y, x, y);

        if (distance < radius + this.radius) return true;
    }
}
