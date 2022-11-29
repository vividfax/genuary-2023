// Persian Rug

class Sketch21 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#E2B49A",
            "light": "#C47B4D",
            "mid": "#5A718B",
            "dark": "#843434",
            "black": "#141E40",
        }

        this.init();
    }

    init() {

        this.w = .7;
        this.size = height;
        this.spacing = 20;

        this.border = this.palette.dark;

    }

    prerun() {

        push();
        translate(width/2, height/2);

        noStroke();

        for (let i = height%this.spacing; i < height/2; i += this.spacing*2) {

            fill(randomColour(this.palette));
            rect(0, 0, (width*this.w-i), height-i);
        }

        pop();

        for (let i = 0; i < width/2; i++) {
            this.update();
            this.display();
        }
    }

    update() {

        this.size -= 2;
        if (this.size < 10) this.size = 0;
    }

    display() {

        push();

        noStroke();

        for (let i = 0; i < height; i += this.spacing) {

            let sizeX = this.size*random(0.5, 1);
            let sizeY = this.size*random(0.5, 1);
            let weight = random(0.3, 0.9);
            fill(randomColour(this.palette));

            rect(width/2+(width*this.w)/2-i-this.spacing/2, height/2, sizeX%this.spacing*weight, (this.w-sizeY)%(width-i*2),);
            rect((width-width*this.w)/2+i+this.spacing/2, height/2, sizeX%this.spacing*weight, (this.w-sizeY)%(width-i*2),);

            rect(width/2, i+this.spacing/2, (this.w-sizeY)%(width*this.w-i*2)+this.spacing, sizeX%this.spacing*weight);
            rect(width/2, height-i-this.spacing/2, (this.w-sizeY)%(width*this.w-i*2)+this.spacing, sizeX%this.spacing*weight);
        }

        fill("#111");

        rectMode(CORNER);
        rect(0, 0, width/2- (width*this.w)/2, height);
        rect(width/2 + (width*this.w)/2, 0, width/2- (width*this.w)/2, height);

        rectMode(CENTER);
        translate(width/2, height/2);
        noFill();
        stroke(this.border);
        strokeWeight(this.spacing/4);
        rect(0, 0, width*this.w, height-this.spacing/4);

        pop();

    }
}

function randomColour(palette) {

    return random(Object.values(palette));
}