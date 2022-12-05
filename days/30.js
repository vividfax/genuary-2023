// Minimalism

class Sketch30 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": 255,
            "light": 191,
            "mid": 127,
            "dark": 63,
            "black": 0,
        }

        this.complete = true;
        this.noLoop = true;

        this.blue = [0, 46, 167, 7];
    }

    update() {

    }

    display() {

        this.displayBlueBackground();

        threeD.push();
        threeD.directionalLight(255, 255, 255, 1, 1, -500)
        threeD.noStroke();
        threeD.texture(canvas);
        threeD.plane(540);
        threeD.translate(-width/2, -height/2);

        for (let i = 0; i < 30; i++) {

            threeD.push();
            threeD.translate(random(width), random(height), 0);
            threeD.rotateY(180);
            threeD.sphere(random(150, 200));
            threeD.pop();
        }

        threeD.pop();

        image(threeD, 0, 0);
    }

    displayBlueBackground() {

        push();
        translate(width/2, height/2);

        background(this.palette.white);
        background(this.blue);

        noStroke();
        fill(this.blue);

        for (let i = 0; i < 950; i++) {

            push();
            rotate(random(-1, 1));
            ellipse(random(-width, width), random(-height, height), 10000, 100);
            pop();

            let x = random(-width, width);
            let y = random(-height, height);
            let size = random(10, 50);

            ellipse(x, y, size);
            ellipse(x, y, size);
            ellipse(x, y, size);
            ellipse(random(-width, width), random(-height, height), random(10, 50));
            ellipse(random(-width, width), random(-height, height), random(10, 50));
            ellipse(random(-width, width), random(-height, height), random(10, 50));
        }

        stroke(this.palette.black);
        translate(-width/2, -height/2);
        line(0, height/2, width, height/2);

        pop();
    }
}
