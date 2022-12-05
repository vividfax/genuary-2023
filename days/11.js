// Suprematism

class Sketch11 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F1F4FF",
            "light": "#F5CE0D",
            "mid": "#58A3DC",
            "dark": "#CB491D",
            "black": "#01020A",

            "extra1": "#165529",
            "extra2": "#353CC6",
            "extra3": "#E5C5E3",
            "extra4": "#D77A0F",
            "extra5": "#9B48B3"
        }

        this.complete = true;
        this.noLoop = true;

        this.padding = 80;
    }

    prerun() {

        this.angle = random(360);
    }

    update() {

        this.size = random(540*2);
    }

    display() {

        background(this.palette.white);

        let layers = 3;
        let size = layers*20;

        for (let i = 0; i < layers; i++) {
            this.displayQuad(size);
            this.displayLines(size);

            if (random() < 0.5) {
                this.displayCircle(size);
            }
            if (random() < 0.5) {
                this.displayCurve(size);
            }
            if (random() < 0.5) {
                this.displayArrows(size);
            }
            if (random() < 0.5) {
                this.displayTriangle(size);
            }

            size *= 0.2;
        }

        this.addNoise();
    }

    displayQuad(size) {

        let position = [random(this.padding, width-this.padding), random(this.padding, height-this.padding)];

        push();
        translate(position[0], position[1]);
        rotate(random(360));
        noStroke();

        loadPixels();
        let pix = get(position[0], position[1]);

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        fill(colour);

        let w = random(20+size, 90+size);
        let h = random(20+size, 90+size);
        let topLeft = [-w + random(-10, 10), -h + random(-10, 10)];
        let topRight = [w + random(-10, 10), -h + random(-10, 10)];
        let bottomRight = [w + random(-10, 10), h + random(-10, 10)];
        let bottomLeft = [-w + random(-10, 10), h + random(-10, 10)];

        quad(topLeft[0], topLeft[1], topRight[0], topRight[1], bottomRight[0], bottomRight[1], bottomLeft[0], bottomLeft[1]);

        pop();
    }

    displayLines(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(this.angle);
        rotate(random(-4, 4));
        if (random() < 0.1) rotate(90);

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        strokeCap(SQUARE);
        stroke(colour);

        let numberOfLines = random([1, 2, 3]);
        if (random() < 0.5) numberOfLines = 1;

        for (let i = 0; i < numberOfLines; i++) {

            strokeWeight(random(5, 20));
            let length = random(30+size, 300+size);

            push();
            translate(0, i*random(20, 40));
            line(-length/2, 0, length/2, 0);
            pop();
        }


        pop();
    }

    displayCircle(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(random(360));

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        fill(colour);
        noStroke();

        arc(0, 0, random(185+size, 190+size), random(185+size, 190+size), 0, random([90, 180, 360]));

        pop();
    }

    displayCurve(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(random(360));

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        noFill();
        strokeWeight(random(20, 40));
        strokeCap(SQUARE);
        stroke(colour);

        arc(0, 0, random(80+size, 120+size), random(80+size, 120+size), 0, random(90, 180));

        pop();
    }

    displayEye(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(random(360));
        noStroke();

        let w = random(180+size, 200+size);
        let h = random(85+size, 90+size);

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        fill(colour);
        arc(0, 0, w, h, 0, 360);

        let colour2 = randomColour(this.palette);
        while (colour2 == this.palette.white || colour2 == colour) colour2 = randomColour(this.palette);
        fill(colour2);
        arc(0, 0, w, h, 0, 180);

        pop();
    }

    displayArrows(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(this.angle + 45);

        let length = random(15+size, 40+size);
        let spacing = random(20+size, 40+size);

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);
        stroke(colour);
        strokeCap(PROJECT);
        strokeWeight(length/3);

        for (let i = 0; i < int(random(1, 4)); i++) {

            push();
            translate(i*spacing, -i*spacing);
            rotate(random(-14, 14));
            line(0, 0, length, 0);
            line(length, 0, length, length);
            pop();
        }

        pop();
    }

    displayTriangle(size) {

        push();
        translate(random(this.padding, width-this.padding), random(this.padding, height-this.padding));
        rotate(this.angle-90);

        loadPixels();
        let pix = get(random(this.padding, width-this.padding), random(this.padding, height-this.padding));

        let colour = randomColour(this.palette);
        while (colour == this.palette.white || pix[0] == red(color(colour))) colour = randomColour(this.palette);

        noStroke();
        fill(colour);

        let h = random(10+size, 40+size);
        let length = random(20+size, 80+size);

        triangle(-h/2, 0, h/2, 0, 0, length);

        pop();
    }

    addNoise() {

        loadPixels();

        for (let i = 0; i < pixels.length; i++) {

            if (mod(i, 4) == 3) pixels[i] += random(-20, 20);
            // pixels[i] += random(-30, 30);
        }

        updatePixels();
    }
}
