// Perfect loop / Infinite loop / endless GIFs

class Sketch1 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FCDE9C",
            "light": "#C4D6B0",
            "mid": "#FFA552",
            "dark": "#BA5624",
            "black": "#381D2A",
        }

        this.complete = true;
        // this.noLoop = true;
    }

    prerun() {

        this.movers = [];

        for (let i = 0; i < 25; i++) {

            this.movers.push(new Mover(randomColour(this.palette)));
        }

        this.backgroundColour = randomColour(this.palette);
        background(this.backgroundColour);

        for (let i = 0; i < 1440; i++) {
            this.update();
            this.display();
        }
    }

    update() {

        for (let i = 0; i < this.movers.length; i++) {

            this.movers[i].update();
        }
    }

    display() {

        for (let i = 0; i < this.movers.length; i++) {

            this.movers[i].display();
        }
    }
}

class Mover {

    constructor(colour) {

        this.colour = colour;
        this.radius = random(5, 100);
        this.distanceFromCentre = random(1, 3);
        this.rotation = random(360);

        this.positionDegree = random(360);
        this.positionDirection = random([-1, 1]);
        this.positionRadius = 0;
        this.movementSpeed = 0.25;

        this.x = 150;
        this.y = -150;
    }

    update() {

        this.positionRadius = sin(this.positionDegree*2) * 150;

        this.positionDegree += this.movementSpeed * this.positionDirection;

        this.x = this.positionRadius * sin(this.positionDegree)*this.distanceFromCentre;
        this.y = this.positionRadius * cos(this.positionDegree)*this.distanceFromCentre;
    }

    display() {

        push();
        translate(width/2, height/2);
        rotate(this.rotation);

        noStroke();
        fill(this.colour);
        ellipse(this.x, this.y, this.radius);

        pop();
    }
}