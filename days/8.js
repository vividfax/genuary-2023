// Signed Distance Functions

class Sketch8 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FCD0A1",
            "light": "#AFD2E9",
            "mid": "#B1B695",
            "dark": "#A690A4",
            "black": "#5E4B56",
        }

        this.complete = true;
        this.noLoop = true;
    }

    update() {

    }

    display() {

        // threeD.push();
        // threeD.background(this.palette.dark);

        // threeD.fill(this.palette.white);
        // threeD.sphere(450);

        // threeD.push();
        // threeD.translate(0, 40, 0);
        // threeD.fill(this.palette.black);
        // threeD.sphere(450);
        // threeD.pop();

        // threeD.push();
        // threeD.translate(-40, 0, 0);
        // threeD.fill(this.palette.light);
        // threeD.sphere(450);
        // threeD.pop();

        // threeD.push();
        // threeD.translate(0, 0, -400);
        // threeD.fill(this.palette.light);
        // threeD.sphere(150);
        // threeD.pop();

        // threeD.pop();

        // image(threeD, 0, 0);

        let palette = [this.palette.white, this.palette.light, this.palette.mid, this.palette.dark, this.palette.black];
        palette = shuffle(palette);

        background(palette.pop());
        noStroke();

        drawLeafRing(1, 70, palette.pop());
        drawLeafRing(1, 50, palette.pop());
        drawLeafRing(0, 30, palette.pop());
        drawLeafRing(1, 17, palette.pop());
    }
}

function sdSphere(vec1, vec2, r) {

    return vec1.dist(vec2) - r;
}

function drawLeafRing(rotation, size, colour) {

    let sphere1Pos = createVector(-size*2, 0);
    let sphere2Pos = createVector(size*2, 0);
    let sphereRadius = size*3;

    for (let i = -width/2; i < width/2; i+=5) {
        for (let j = -height/2; j < height/2; j+=5) {

            let hit1 = sdSphere(sphere1Pos, createVector(i, j), sphereRadius);
            let hit2 = sdSphere(sphere2Pos, createVector(i, j), sphereRadius);
            let hit = max([hit1, hit2]);

            if (hit < 0) {
                for (let l = 0; l < 6; l++) {

                    push();
                    translate(width/2, height/2);
                    rotate(60*l + 30*rotation);
                    translate(-size*4, 0);

                    fill(colour);
                    ellipse(i, j, random(3, 7))
                    pop();
                }
            }
        }
    }
}