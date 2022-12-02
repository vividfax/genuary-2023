// Reflection of a reflection

class Sketch16 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F0A7A0",
            "light": "#947BD3",
            "mid": "#F26CA7",
            "dark": "#5E4AE3",
            "black": "#05299E"
        }

        this.complete = true;
        this.noLoop = true;
        this.noClear = true;
    }

    update() {

    }

    display() {

        threeD.clear();
        this.displayCircles();
        this.display3D();

        push();
        stroke(this.palette.light);
        noFill();
        strokeWeight(25);
        ellipse(width/2, height/2, 240, 240);
        pop();
    }

    display3D() {

        threeD.lights();
        threeD.push();
        threeD.stroke(this.palette.light);
        threeD.strokeWeight(50);
        threeD.specularMaterial(250);
        threeD.shininess(20);
        threeD.sphere(440);
        threeD.sphere(500);
        threeD.strokeWeight(1);
        threeD.noStroke();
        threeD.texture(canvas);
        threeD.angleMode(DEGREES)
        threeD.rotateZ(-90);
        threeD.torus(280, 180);
        threeD.pop();

        image(threeD, 0, 0);
    }

    displayCircles() {

        noFill();

        for (let i = 0; i < 500; i++) { //500

            let x = random(width);
            let y = random(height);
            let r = random(5, 100)/2;

            stroke(randomColour(this.palette));
            ellipse(x, y, r*2);

            if (x-r*2 < 0) ellipse(width+x, y, r*2);
            if (x+r*2 > width) ellipse(-x, y, r*2);
            if (y-r*2 < 0) ellipse(x, height+y, r*2);
            if (y+r*2 > height) ellipse(x, -y, r*2);
        }
    }
}
