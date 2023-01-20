// Black and white

class Sketch19 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": 255,
            "light": 191,
            "mid": 127,
            "dark": 63,
            "black": 0
        }

        this.noLoop = true;
        this.complete = true;
    }

    prerun() {

    }

    update() {

    }

    display() {

        let w = width*2;
        let h = height*2;

        twoD.push();
        twoD.background(this.palette.white);
        twoD.stroke(this.palette.black);
        twoD.strokeWeight(50);
        twoD.noFill();
        twoD.ellipse(w/2, h/2, w*.9);
        twoD.ellipse(w/2, h/2, w*.5);
        twoD.ellipse(w/2, h/2, w*.3);

        for (let i = 0; i < 400; i++) {
            twoD.noStroke();
            twoD.fill(this.palette.black);
            twoD.ellipse(random(w), random(h), random(5, 15));
            noStroke();
            fill(this.palette.black);
            ellipse(random(w), random(h), random(5, 15));
            ellipse(random(w), random(h), random(5, 15));
        }
        twoD.pop();

        threeD.clear();
        threeD.background(this.palette.white);
        threeD.directionalLight(250, 250, 250, 1, 1, -1);
        threeD.noStroke();
        threeD.texture(canvas);
        threeD.plane(540);
        threeD.texture(twoD);

        for (let i = 0; i < 7; i++) {
            this.randomSphere();
        }

        image(threeD, 0, 0);
        filter(THRESHOLD);
    }

    randomSphere() {

        let distance = 500;

        threeD.push();
        threeD.translate(random(-distance/2, distance/2), random(-distance/2, distance/2), 0);
        threeD.angleMode(DEGREES);
        threeD.rotateZ(-90);
        threeD.rotateY(-90-45);
        threeD.rotateX(90);
        threeD.sphere(random(20, 150));
        threeD.pop();
    }
}
