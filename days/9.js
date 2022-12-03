// Plants

class Sketch9 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": color(239, 214, 210), // #EFD6D2
            "whiteTransparent": color(239, 214, 210, 5), // #EFD6D2
            "light": "#E5A89A",
            "mid": "#BA9E8B",
            "dark": "#678E74",
            "black": "#20523B",
        }

        this.complete = true;
        this.noLoop = true;

        this.potSize = 60;
        this.numberOfPots = 5;

        this.plantY = this.potSize/2;
    }

    prerun() {

    }

    update() {

    }

    display() {

        background(this.palette.white);

        push();
        translate(width/2, height/2);

        for (let i = -int(this.numberOfPots/2); i <= int(this.numberOfPots/2); i++) {
            push();
            translate(i*this.potSize*1.2, this.potSize*1.5);
            this.displayPotShape()
            this.displayPotPattern();
            let plant = new Plant(this);
            plant.display();
            pop();
        }

        pop();
    }

    displayPotPattern() {

        let size = this.potSize;

        push();

        noStroke();
        fill(this.palette.whiteTransparent);

        for (let i = 0; i < 100; i++) {

            push();
            rotate(random(-2, 2));
            ellipse(0, random(-this.potSize/2, this.potSize/2), this.potSize*1.2, this.potSize*.1);
            pop();

            ellipse(random(-this.potSize/2, this.potSize/2), random(-this.plantY, this.potSize/2), random(this.potSize*.2));
        }

        pop();
    }

    displayPotShape() {

        let size = this.potSize;

        push();
        noStroke();
        fill(random([this.palette.mid, this.palette.light]));

        let pots = ["quad", /*"semicircle",*/ "ushaped", "topntail"];
        let pot = random(pots);
        // pot = "semicircle";

        if (pot == "quad") {
            let topW = size;
            let botomW = size*.8;
            let h = size;
            quad(-topW/2, -h/2, topW/2, -h/2, botomW/2, h/2, -botomW/2, h/2);

        } else if (pot == "semicircle") {
            arc(0, -size/15, size, size*1.1, 0, 180);
            ellipse(-size/4, size/2-size/15, size/7.5);
            ellipse(size/4, size/2-size/15, size/7.5);

        } else if (pot == "ushaped") {
            rect(0, 0, size, size, 0, 0, size, size);
            rect(0, 0, size*.6, size, 0, 0, size*.1, size*.1);

        } else if (pot == "topntail") {
            arc(-size/3, 0, size*.4, size, 90, 270);
            arc(size/3, 0, size*.4, size, 270, 90);
            rect(0, 0, size/3*2, size);
        }

        pop();
    }

    displayPlant() {

        push();

        strokeWeight(4);
        strokeCap(SQUARE);
        stroke(this.palette.black);

        line(0, -this.potSize/2, 0, -this.potSize*.6);

        pop();
    }
}

class Plant {

    constructor(sketch) {

        this.sketch = sketch;
        this.x = 0;
        this.y = -sketch.potSize/2;
        this.nodes = [];
        this.nodes.push([this.x, this.y]);
        this.nodes.push([this.x, this.y-random(3, 13)]);

        this.numberOfNodes = random(3, 7);

        for (let i = 0; i < this.numberOfNodes; i++) {

            this.createNodes(i);
        }
    }

    createNodes(i) {

        this.x -= random(-3, 3)*(this.numberOfNodes-i);
        this.y -= random(5, 10)*(this.numberOfNodes-i);

        this.nodes.push([this.x, this.y]);
    }

    display(x, y) {

        push();

        for (let i = 1; i < this.nodes.length; i++) {

            strokeWeight(4);
            stroke(this.sketch.palette.black);

            if (i == this.nodes.length-1) strokeCap(ROUND);
            else strokeCap(SQUARE);
            line(this.nodes[i-1][0], this.nodes[i-1][1], this.nodes[i][0], this.nodes[i][1]);

            let leaningLeft = false;

            if (i == this.nodes.length-1) leaningLeft = int(random());
            else if (this.nodes[i][0] < this.nodes[i+1][0]) leaningLeft = true;

            let x;
            let y = this.nodes[i][1] - random(5, 10);

            if (leaningLeft) x = this.nodes[i][0] - random(3, 5)*(this.nodes.length-i);
            else x = this.nodes[i][0] - random(-5, -3)*(this.nodes.length-i);

            let angle = atan2(y-this.nodes[i][1], x-this.nodes[i][0]);

            strokeCap(ROUND);
            line(this.nodes[i][0], this.nodes[i][1], x, y);

            push();
            translate(x, y);
            rotate(angle);
            let colours = [this.sketch.palette.dark, this.sketch.palette.black];
            colours = shuffle(colours);
            let leafColour = colours.pop();
            let detailColour = colours.pop();
            fill(leafColour);
            noStroke();
            ellipse(0, 0, (this.nodes.length-i)*2*2+3, (this.nodes.length-i)*2+3);
            fill(detailColour);
            rect(0, 0, (this.nodes.length-i)*2*2-3, 1, 2);
            pop();

        }

        pop();
    }
}
