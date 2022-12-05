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

        this.potSize = 75;
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

        let plants = ["TallPlant", "Pilea", "TallPlant", "Pilea", "Cactus"];
        plants = shuffle(plants);

        for (let i = -int(this.numberOfPots/2); i <= int(this.numberOfPots/2); i++) {
            push();
            translate(i*this.potSize*1.2, this.potSize*1);
            this.displayPotShape()
            this.displayPotPattern();

            let plantType = plants[i+2];
            let plant;

            if (plantType == "TallPlant") plant = new TallPlant(this);
            else if (plantType == "Pilea") plant = new Pilea(this);
            else if (plantType == "Cactus") plant = new Cactus(this, width/2 + i*this.potSize*1.2, height/2 + this.potSize*1.5);

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
}

class TallPlant {

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
        this.y -= random(5, 8)*(this.numberOfNodes-i);

        this.nodes.push([this.x, this.y]);
    }

    display() {

        push();

        for (let i = 1; i < this.nodes.length; i++) {

            strokeWeight(4);
            stroke(this.sketch.palette.black);

            if (i != 1) strokeCap(ROUND);
            else strokeCap(SQUARE);
            line(this.nodes[i-1][0], this.nodes[i-1][1], this.nodes[i][0], this.nodes[i][1]);

            let leaningLeft = false;
            let double = false;

            if (i == this.nodes.length-1) leaningLeft = int(random());
            else if (this.nodes[i][0] < this.nodes[i+1][0]) leaningLeft = true;

            if (leaningLeft && mod(i, 2)) double = true;
            if (!leaningLeft && mod(i, 2) == 0) double = true;

            let x;
            let y = this.nodes[i][1] - random(5, 10);

            if (leaningLeft) x = this.nodes[i][0] - random(3, 6)*(this.nodes.length-1-i);
            else x = this.nodes[i][0] - random(-6, -3)*(this.nodes.length-1-i);

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

            if (double) {
                if (!leaningLeft) x = this.nodes[i][0] - random(3, 6)*(this.nodes.length-1-i);
                else x = this.nodes[i][0] - random(-6, -3)*(this.nodes.length-1-i);

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
        }

        pop();
    }
}

class Pilea {

    constructor(sketch) {

        this.sketch = sketch;
        this.x = 0;
        this.y = -sketch.potSize/2;
        this.nodes = [];
        this.nodes.push([this.x, this.y]);
        this.numberOfNodes = random(5, 15);

        for (let i = 0; i < this.numberOfNodes; i++) {

            this.nodes.push([this.x, this.y-i*2]);
        }

        this.leaves = [];
        this.radius = 5;

        while (this.leaves.length < this.numberOfNodes) this.tryToMakeLeaf();
    }

    tryToMakeLeaf() {

        let x = random(-this.radius, this.radius);
        let y = random(-this.radius, this.radius);
        let valid = true;

        for (let j = 0; j < this.leaves.length; j++)
        {
            let distance = dist(x, y, this.leaves[j][0], this.leaves[j][1]);
            if (distance < 15) valid = false;
        }

        if (valid) this.leaves.push([x, y]);
        else if (random() < 0.1) this.radius++;
    }

    display() {

        push();

        for (let i = 1; i < this.nodes.length; i++) {

            strokeWeight(4);
            stroke(this.sketch.palette.black);

            if (i > 2) strokeCap(ROUND);
            else strokeCap(SQUARE);
            line(this.nodes[i-1][0], this.nodes[i-1][1], this.nodes[i][0], this.nodes[i][1]);

            if (i <= 1) continue;

            strokeWeight(2);
            line(this.nodes[i][0], this.nodes[i][1], this.leaves[i-1][0], this.leaves[i-1][1] + this.nodes[this.nodes.length-1][1]);
        }

        push();
        translate(0, this.nodes[this.nodes.length-1][1]);
        noStroke();

        for (let i = 0; i < this.leaves.length; i++) {

            push();
            translate(this.leaves[i][0], this.leaves[i][1]);
            rotate(random(360));

            let colours = [this.sketch.palette.dark, this.sketch.palette.black];
            colours = shuffle(colours);
            let leafColour = colours.pop();
            let detailColour = colours.pop();
            fill(leafColour);
            ellipse(0, 0, random(13, 17));
            fill(detailColour);
            ellipse(0, -3, 2);

            pop();
        }
        pop();

        pop();
    }
}

class Cactus {

    constructor(sketch, dotsX, dotsY) {

        this.sketch = sketch;
        this.x = 0;
        this.y = -sketch.potSize/2;
        this.nodes = [];
        this.nodes.push([this.x, this.y]);

        this.dotsX = dotsX;
        this.dotsY = dotsY;

        this.leaves = [];

        let startingLeaf = {
            x: this.x,
            y: -45,
            layer: 0,
            angle: 0,
            size: 20,
        }
        this.leaves.push(startingLeaf);

        this.addLeaf();
    }

    addLeaf() {

        for (let i = 0; i < this.leaves.length; i++) {

            if (this.leaves[i].layer >= 2) continue;

            if (random() < 0.5) { // add one leaf

                // let lean = random(-8, 8);
                let lean = (random(-8, 8)/((this.leaves[i].layer/3)+1));
                let x = this.leaves[i].x + lean;
                let y = this.leaves[i].y - this.leaves[i].size + abs(lean)*.5;

                let newLeaf = {

                    x: x,
                    y: y,
                    layer: this.leaves[i].layer+1,
                    angle: lean*3,
                    size: this.leaves[i].size*.7,
                }

                this.leaves.push(newLeaf);

            } else if (random() < 0.8) { // add two leaves

                for (let j = -1; j <= 1; j+=2) {

                    let lean = (random(8, 10)/((this.leaves[i].layer/3)+1)) * j;
                    let x = this.leaves[i].x*1.3 + lean;
                    let y = this.leaves[i].y - this.leaves[i].size + abs(lean)*.5;

                    let newLeaf = {

                        x: x,
                        y: y,
                        layer: this.leaves[i].layer+1,
                        angle: lean*3,
                        size: this.leaves[i].size*.7,
                    }

                    this.leaves.push(newLeaf);
                }
            } else; // no leaf
        }
    }

    display() {

        noStroke();

        for (let i = this.leaves.length-1; i > 0; i--) {
            fill(random([this.sketch.palette.dark, this.sketch.palette.black]));
            push();
            translate(this.leaves[i].x, this.leaves[i].y);
            rotate(this.leaves[i].angle)
            ellipse(0, 0, this.leaves[i].size*random(0.9, 1.1), this.leaves[i].size*1.5*random(0.9, 1.1));
            pop();
        }

        fill(random([this.sketch.palette.dark, this.sketch.palette.black]));
        arc(this.x, this.y-8, 20, 30, 135, 45, CHORD);

        loadPixels();

        resetMatrix();
        noFill();

        for (let i = this.dotsX-this.sketch.potSize*.3; i <= this.dotsX+this.sketch.potSize*.3; i += 6) {
            for (let j = this.dotsY-this.sketch.potSize*1.6; j < this.dotsY - this.sketch.potSize*1.0; j += 6) {

                let x = int(i);
                let y = int(j);

                if (mod(y, 12) == 0) x += 3;

                if (get(x, y)[0] == 32) fill(color(this.sketch.palette.dark));
                else if (get(x, y)[0] == 103) fill(color(this.sketch.palette.black));

                ellipse(x, y, 2);

                noFill();
            }
        }
    }
}