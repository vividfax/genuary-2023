// Sine waves

class Sketch15 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#E5C2C0",
            "light": "#8FD5A6",
            "mid": "#329F5B",
            "dark": "#0C8346",
            "black": "#0D5D56",
        }

        this.complete = true;
        // this.noLoop = true;

        this.offset1 = 0;
        this.offset2 = 0;
        this.offset3 = 0;
        this.offset4 = 0;

        this.twoD2 = createGraphics(width, height);
    }

    prerun() {

        background(this.palette.mid);

        twoD.push();
        twoD.noStroke();
        twoD.angleMode(DEGREES);

        this.twoD2.push();
        this.twoD2.noStroke();
        this.twoD2.angleMode(DEGREES);

        for (let i = 0; i < 100; i++) {

            twoD.push();
            twoD.translate(random(width), random(height));
            twoD.rotate(random(360));

            twoD.fill(randomColour(this.palette));
            twoD.rect(0, 0, random(5, 10), random(5, 10), random(0, 10));

            twoD.pop();

            if (i % 4 == 1) {

                this.twoD2.push();
                this.twoD2.translate(random(width), random(height));
                this.twoD2.rotate(random(360));

                this.twoD2.fill(randomColour(this.palette));
                this.twoD2.rect(0, 0, random(10, 15), random(10, 15), random(0, 15));

                this.twoD2.pop();
            }
        }

        twoD.pop();
        this.twoD2.pop();
    }

    update() {

        this.offset1 += 1;
        this.offset2 += 1.1;
        this.offset3 += 1.2;
        this.offset4 += 1.3;
    }

    display() {

        // image(twoD, 0, 0);

        noStroke();

        for (let i = 0; i < height*1.3; i++) {

            fill(this.palette.dark);
            ellipse(height/2+sin(i-this.offset1)*height/4, i, 5+i*.1);
            fill(this.palette.white)
            ellipse(height/2+sin(i-this.offset1)*height/4, i, 5+i*.1);

            fill(this.palette.black);
            ellipse(height/2+sin(i-this.offset2)*height/3, i, 5+i*.2);
            fill(this.palette.light);
            ellipse(height/2+sin(i-this.offset2)*height/3, i, 5+i*.2);

            fill(this.palette.light)
            ellipse(height/2+sin(i-this.offset3+height/2)*height/2, i, 5+i*.3);
            fill(this.palette.black)
            ellipse(height/2+sin(i-this.offset3+height/2)*height/2, i, 5+i*.3);

            fill(this.palette.white)
            ellipse(height/2+sin(i-this.offset4+height/2)*height/1, i, 5+i*.4);
            fill(this.palette.dark)
            ellipse(height/2+sin(i-this.offset4+height/2)*height/1, i, 5+i*.4);
        }

        // image(this.twoD2, 0, 0);
    }
}
