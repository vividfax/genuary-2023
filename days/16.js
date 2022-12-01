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


        // this.extraCanvas = createGraphics(540, 540, WEBGL);
    }

    update() {

    }

    display() {

        threeD.lights();
        threeD.stroke(this.palette.light);
        threeD.strokeWeight(50);
        threeD.fill(this.palette.black);
        threeD.specularMaterial(250);
        threeD.shininess(20);
        threeD.sphere(440);
        threeD.sphere(500);
        threeD.strokeWeight(1);
        threeD.texture(canvas);
        threeD.torus(190, 80);

        // twoD.push();
        // let imageSize = 180;
        // twoD.clear();
        // twoD.background(this.palette.dark);
        // twoD.tint(this.palette.mid);
        // twoD.blendMode(DODGE);

        // for (let i = imageSize/2; i < width; i += imageSize) {
        //     for (let j = imageSize/2; j <= height; j += imageSize) {

        //         twoD.push();
        //         twoD.translate(width/2, height/2);
        //         twoD.imageMode(CENTER);
        //         twoD.rectMode(CENTER);
        //         twoD.translate(i, j);
        //         twoD.rotate(random(360));

        //         twoD.noStroke();
        //         twoD.fill(this.palette.light);
        //         twoD.image(threeD, 0, 0, imageSize, imageSize);

        //         twoD.pop();
        //     }
        // }
        // twoD.pop();

        // twoD.tint(this.palette.white);

        // for (let i = 0; i <= twoD.width; i += imageSize*2) {
        //     for (let j = 0; j <= twoD.height; j += imageSize*2) {

        //         twoD.push();
        //         twoD.imageMode(CENTER);
        //         twoD.rectMode(CENTER);
        //         twoD.translate(i, j);
        //         twoD.rotate(random(360));

        //         twoD.noStroke();
        //         twoD.fill(this.palette.light);
        //         twoD.image(threeD, 0, 0, imageSize*2, imageSize*2);

        //         twoD.pop();
        //     }
        // }

        // threeD.texture(twoD);
        // threeD.noStroke();
        // threeD.sphere(100);


        image(threeD, 0, 0);
    }
}
