// Sample a color palette from your favorite movie/album cover

// Grand Budapest Hotel

let snowParticles = [];

class Sketch7 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFF0F4",
            "light": "#FFC7C4",
            "mid": "#FC90A7",
            "dark": "#C9A156",
            "black": "#313D58",
            "extra": "#BA3333"
        }

        for (let i = 0; i < 1500; i++) {
            snowParticles.push(new SnowParticle());
        }
    }

    prerun() {

        twoD.rectMode(CENTER);
        twoD.push();
        twoD.rectMode(CORNER);
        twoD.noStroke();
        twoD.fill(this.palette.light);
        twoD.background(this.palette.mid);
        twoD.rect(0, 0, width, 430);
        twoD.pop();

        this.displayWindows();
        this.displayColumns();
        this.displayRoof();
        this.displayRailing();
        this.displayDormers();
    }

    update() {

    }

    display() {

        image(twoD, 0, 0);

        for (let i = 0; i < snowParticles.length; i++) {
            snowParticles[i].update();
            snowParticles[i].display();
        }
    }

    displayWindows() {

        twoD.push();
        twoD.translate(0, 6);

        let windowW = 19;
        let windowH = windowW*2.3;

        let rows = 10;
        let padding = 41;

        let pinkWindow = false;
        let pinkWindowChance = 66;

        for (let j = 0; j < rows; j++) {

            twoD.push();
            twoD.translate(0, -windowH/2);
            twoD.rectMode(CORNER);
            twoD.noStroke();
            if (j < 6) twoD.fill(this.palette.mid);
            else (twoD.fill(this.palette.dark));
            twoD.rect(0, j*windowH*1.7-windowH*.1, width, windowH*.25);
            twoD.rect(0, j*windowH*1.7+windowH, width, windowH*.25);
            twoD.fill(this.palette.white);
            twoD.rect(0, j*windowH*1.7-windowH*.1, width, windowH*.12);
            twoD.rect(0, j*windowH*1.7+windowH, width, windowH*.14);

            twoD.pop();

            for (let i = padding; i <= width-padding; i += windowW*2.4) {

                let windowColour, barColour;
                if (random() < 0.85) {
                    windowColour = this.palette.black;
                    barColour = this.palette.dark;
                } else {
                    windowColour = this.palette.dark;
                    barColour = this.palette.black;
                }
                if (!pinkWindow && pinkWindowChance < 44 && random() < 1/pinkWindowChance) {
                    pinkWindow = true;
                    windowColour = this.palette.extra;
                    barColour = this.palette.dark;
                } else {
                    pinkWindowChance--;
                }

                twoD.push();
                twoD.translate(i-windowW/2, j*windowH*1.7);
                twoD.translate(0, -windowH/2);
                twoD.rectMode(CORNER);
                twoD.noStroke();
                twoD.fill(this.palette.white);
                twoD.quad(-windowW*0.3, -windowH*.1, 0, windowH*.4, windowW, windowH*.4, windowW+windowW*0.3, -windowH*.1);

                twoD.fill(windowColour);
                twoD.rect(0, 0, windowW, windowH, windowW, windowW, 0, 0);
                twoD.stroke(barColour);
                twoD.strokeWeight(windowW*.1);
                twoD.line(windowW/2, 0, windowW/2, windowH);
                twoD.strokeWeight(windowW*.15);
                twoD.stroke(this.palette.white);
                twoD.line(0, windowH*.25, windowW, windowH*.25);
                twoD.stroke(this.palette.white);
                twoD.strokeWeight(windowH*.12);
                twoD.noFill();
                twoD.rect(0, 0, windowW, windowH, windowW, windowW, 0, 0);

                twoD.pop();
            }
        }

        twoD.pop();
    }

    displayColumns() {

        twoD.push();

        twoD.noStroke();
        twoD.fill(this.palette.white);

        for (let i = 108; i < height+5; i += 6) {

            twoD.push();
            twoD.rect(0, i, 25 + random(0, 10), random(5, 6));
            twoD.rect(width, i, 25 + random(0, 10), random(5, 6));
            twoD.pop();
        }

        twoD.pop();
    }

    displayRoof() {

        twoD.push();

        twoD.rectMode(CORNER);
        twoD.noStroke();
        twoD.fill(this.palette.mid);
        twoD.rect(0, 0, width, 128);
        twoD.fill(this.palette.white);
        twoD.rect(0, 0, width, 110);

        twoD.push();
        twoD.translate(0, 110);
        twoD.noStroke();
        twoD.fill(this.palette.white);

        for (let i = 6; i < width; i+=15) {

            twoD.rect(i, 0, 4, 6);
        }
        twoD.pop();

        twoD.fill(this.palette.black);
        twoD.rect(0, 0, width, 100);

        twoD.strokeWeight(1.5);
        twoD.stroke(this.palette.white);
        twoD.fill(this.palette.dark);
        twoD.triangle(-2, 0, -2, 80, 160, 0);
        twoD.triangle(width+2, 0, width+2, 80, width-160, 0);
        twoD.noStroke();
        twoD.rect(0, 0, width, 45)

        twoD.pop();
    }

    displayRailing() {

        twoD.push();
        twoD.translate(0, 5);

        twoD.stroke(this.palette.white);
        twoD.strokeWeight(1.5);
        twoD.line(70, 25-1, width-70, 25-1);

        twoD.noFill();
        twoD.strokeWeight(1.5);
        twoD.stroke(this.palette.black);

        for (let i = 70; i < width-70; i+=20) {

            twoD.line(i, 20, i, 50);
            twoD.ellipse(i, 25, 6);
            twoD.ellipse(i+10, 33, 14);
            twoD.ellipse(i+10, 42, 20);
        }
        twoD.line(width-70, 20, width-70, 50);
        twoD.ellipse(width-70, 25, 6);

        twoD.line(70, 25, width-70, 25);

        twoD.fill(this.palette.dark);
        twoD.noStroke();
        twoD.rectMode(CORNER);
        twoD.rect(0, 0, 70-1, 30);
        twoD.rect(width-70+1, 0, width-70+1, 30);

        twoD.stroke(this.palette.white);
        twoD.strokeWeight(1.5);
        twoD.line(70-1, 40, width-70+1, 40);

        twoD.pop();
    }

    displayDormers() {

        twoD.push();

        let w = 19;
        let h = w*2.3;
        let padding = 41;

        for (let i = padding; i <= width-padding; i+= w*2.4) {

            twoD.strokeWeight(h*.18)
            twoD.fill(this.palette.white);
            twoD.stroke(this.palette.white);
            twoD.rect(i, 80, w, h, 25, 25, 0, 0);
            twoD.strokeWeight(h*.12)
            twoD.stroke(this.palette.black);
            twoD.fill(this.palette.black);
            twoD.rect(i, 80, w, h, 25, 25, 0, 0);

            if (random() < 0.15) {
                twoD.fill(this.palette.white);
            }
            twoD.rect(i, 91, w, h*.8);
            twoD.stroke(this.palette.dark);

            twoD.strokeWeight(w*.1);
            twoD.noFill();
            twoD.line(i, 75, i, 100);
            twoD.line(i-5, 85, i+5, 85);
            twoD.rect(i, 87.5, 12, 22);
            twoD.stroke(this.palette.light);
            twoD.strokeWeight(h*.12)
            twoD.rect(i, 91, w, h*.8);
        }

        twoD.pop();

        twoD.rectMode(CORNER);
        twoD.noStroke();
        twoD.fill(this.palette.white);
        twoD.rect(0, 99, width, 13);
    }
}

class SnowParticle {

    constructor() {

        this.x = random(width);
        this.y = random(height/2);
        this.size = random(2, 5);
    }

    update() {

        this.y += random(0.5, 1.5);

        if (random() < 0.25) this.x += 0.8;
        else this.x -= 0.8;

        if (this.y > height/2) {
            this.x = random(width);
            this.y = 0;
            this.size = random(2, 5);
        }

        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
    }

    display() {

        push();
        translate(this.x, this.y);

        noStroke();
        ellipse(this.x, this.y, this.size);

        pop();
    }
}