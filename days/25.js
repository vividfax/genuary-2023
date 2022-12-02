// Yayoi Kusama

// https://sketchfab.com/3d-models/gourd-05197c7001b343e183e561c66134c951

//https://sketchfab.com/3d-models/big-pumpkin-pbr-6379a27182aa4bce8ae38465834cb068

class Sketch25 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#FFFEEA",
            "light": "#FF9090",
            "mid": "#FFEA00",
            "dark": "#FF4400",
            "black": "#0C0900"
        }

        this.complete = true;
    }

    prerun() {

        twoDSmall.background(this.palette.mid);

        let radius = 60;
        let spacing = 2;
        twoDSmall.noStroke();
        twoDSmall.fill(this.palette.black);

        for (let j = 0; j < 11; j++) {

            let topOffset = random(radius);

            for (let i = -radius; i < height+radius*2; i += radius) {
                let radiusOffset = random(0.85, 1);
                twoDSmall.ellipse(radius*j*.8+j*21, i+topOffset, radiusOffset*radius-spacing, radiusOffset*radius-spacing);
            }

            radius *= 0.85;

            if (radius < 5) break;
        }

        for (let j = 10; j < 40; j++) {

            let topOffset = random(radius);

            for (let i = -radius; i < height+radius*2; i += radius) {
                let radiusOffset = random(0.85, 1);
                twoDSmall.ellipse(width*.35+10*.7+j*12, i+topOffset, radiusOffset*radius-spacing, radiusOffset*radius-spacing);
            }
        }
    }

    update() {

    }

    display() {

        threeD.clear();
        threeD.noLights();
        threeD.push();

        threeD.background(this.palette.mid);
        threeD.noStroke();
        threeD.texture(twoDSmall);

        threeD.rotateY(frameCount*0.5);

        threeD.push();
        threeD.scale(80);
        threeD.rotateX(180);
        threeD.model(gourd3D);
        threeD.pop();

        threeD.push();
        threeD.translate(0, 50, 0);
        threeD.scale(100);
        threeD.rotateX(180);
        threeD.rotateY(frameCount*.75);
        threeD.model(pumpkin3D);
        threeD.rotateY(frameCount*-.5);
        threeD.translate(0, 1.75, 0);
        threeD.model(pumpkin3D);
        threeD.translate(0, -3.5, 0);
        threeD.rotateY(180);
        threeD.model(pumpkin3D);
        threeD.pop();

        this.drawSphere(180, 1*.8, 200);
        this.drawSphere(110, 2*.8, 300);
        this.drawSphere(70, 3*.8, 250);

        threeD.pop();

        image(threeD, 0, 0);

        noFill();
        stroke(this.palette.dark);
        strokeWeight(6);
        rect(width/2, height/2, width-40, height-40, 50);
        rect(width/2, height/2, width-40, height-40, 40);
        rect(width/2, height/2, width-40, height-40, 30);
        rect(width/2, height/2, width-40, height-40, 20);
        rect(width/2, height/2, width-40, height-40, 10);

        // stroke(this.palette.light);

        strokeWeight(20);
        rect(width/2, height/2, width, height, 30);
        rect(width/2, height/2, width, height, 0);
    }


    drawSphere(delay, size, distance) {

        threeD.push();
        threeD.rotateX(90);
        threeD.rotateY(90);
        let s = 1;
        threeD.rotateZ(frameCount * s + delay);
        threeD.rotateY(frameCount * s + delay);
        threeD.rotateX(frameCount * s + delay);
        threeD.translate(distance, distance, 0);
        threeD.scale(height * 0.25);
        threeD.noStroke();
        // threeD.sphere(size);
        threeD.scale(size);
        threeD.model(pumpkin3D);

        threeD.pop();
    }

}
