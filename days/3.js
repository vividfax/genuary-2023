// Glitch Art

class Sketch3 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#9A8873",
            "light": "#754043",
            "mid": "#37423D",
            "dark": "#3A2618",
            "black": "#171614",
        }

        this.complete = true;
        this.noLoop = true;

        this.planetColours = [this.palette.white, this.palette.light, this.palette.black];
    }

    update() {

    }

    display() {

        background(this.palette.mid);

        stroke(this.palette.light);
        strokeWeight(20);
        line(0, height/17*8.5, width, height/17*8.5);
        line(0, height/17*3.5, width, height/17*3.5);
        line(0, height/17*13.5, width, height/17*13.5);

        stroke(this.palette.dark);
        noFill();

        for (let i = 0.1; i <= 1.3; i+=.2) {

            strokeWeight(2.5);
            ellipse(width/2, height/2, width*i);
            strokeWeight(1);
            ellipse(width/2, height/2, width*i+15);
            ellipse(width/2, height/2, width*i-15);
        }

        strokeWeight(0.3);
        stroke(this.palette.white);
        line(0, height/17*8.2, width, height/17*8.2);
        line(0, height/17*8.8, width, height/17*8.8);
        line(0, height/17*3.2, width, height/17*3.2);
        line(0, height/17*3.8, width, height/17*3.8);
        line(0, height/17*13.2, width, height/17*13.2);
        line(0, height/17*13.8, width, height/17*13.8);

        noStroke();

        for (let i = 0; i < 17; i++) {
            fill(randomColour(this.planetColours));
            circle(random(width), random(height), random(10, width/3));
        }

        loadPixels();

        let jump = 0;

        let size = width*height*4*pixelDensity()*2;

        for (let i = 0; i < size; i+=4) {

            if (i > size/17*8.2 && i < size/17*8.8) continue;
            if (i > size/17*3.2 && i < size/17*3.8) continue;
            if (i > size/17*13.2 && i < size/17*13.8) continue;

            jump += int(random(5));

            if (random() < 0.01) {
                jump = 0;
            }

            if (random() < 0.3) {
                continue;
            }

            pixels[i] = pixels[i+4*jump];
            pixels[i+1] = pixels[i+4*6+1];
            pixels[i+2] = pixels[i+6*jump];
            pixels[i+3] = 255;
        }

        updatePixels();
    }
}
