// Yayoi Kusama

// https://sketchfab.com/3d-models/gourd-05197c7001b343e183e561c66134c951

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
    }

    prerun() {

        twoD.background(this.palette.mid);

        let radius = 60;
        let spacing = 2;
        twoD.noStroke();
        twoD.fill(this.palette.black);

        for (let j = 0; j < 11; j++) {

            let topOffset = random(radius);

            for (let i = -radius; i < height+radius*2; i += radius) {
                let radiusOffset = random(0.85, 1);
                twoD.ellipse(radius*j*.8+j*21, i+topOffset, radiusOffset*radius-spacing, radiusOffset*radius-spacing);
            }

            radius *= 0.85;

            if (radius < 5) break;
        }

        for (let j = 10; j < 40; j++) {

            let topOffset = random(radius);

            for (let i = -radius; i < height+radius*2; i += radius) {
                let radiusOffset = random(0.85, 1);
                twoD.ellipse(width*.35+10*.7+j*12, i+topOffset, radiusOffset*radius-spacing, radiusOffset*radius-spacing);
            }
        }
    }

    update() {

    }

    display() {

        threeD.clear();
        threeD.push();

        threeD.background(this.palette.mid);
        threeD.noStroke();
        threeD.texture(twoD);
        threeD.rotateY(frameCount*0.1);
        // threeD.sphere(430);

        // threeD.sphere(30);
        threeD.scale(80);
        threeD.rotateX(180);
        threeD.model(gourd3D);
        // this.drawSphere(180, 1, 200);
        // this.drawSphere(90, 15, 100);
        // this.drawSphere(110, 2, 300);
        // this.drawSphere(210, 25, 50);
        // this.drawSphere(70, 3, 250);


        threeD.pop();

        image(threeD, 0, 0);
    }


    drawSphere(delay, size, distance) {

        threeD.push();
        threeD.rotateX(90);
        threeD.rotateY(90);
        let s = 0.01;
        threeD.rotateZ(frameCount * s + delay);
        threeD.rotateY(frameCount * s + delay);
        threeD.rotateX(frameCount * s + delay);
        threeD.translate(distance, distance, 0);
        threeD.scale(height * 0.25);
        threeD.noStroke();
        threeD.sphere(size);
        threeD.pop();
    }

}
