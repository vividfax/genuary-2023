// Textile

let stitches = [];

class Sketch24 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#DDFFF7",
            "light": "#93E1D8",
            "mid": "#FFA69E",
            "dark": "#C15F7E",
            "black": "#861657"
        }

        this.complete = true;
        // this.noLoop = true;

        this.x = 0;
        this.y = 0;
        this.velocity = [-0.003, 0.003];

        this.stitchSize = 10;
        this.padding = 15;

        stitches = [...Array((width-this.padding*2)/this.stitchSize)].map(e => Array((width-this.padding*2)/this.stitchSize));
    }

    prerun() {

        noiseSeed(frameCount, int(random(100)));

        let x = 0;
        let y = 0;

        for (let i = this.padding; i < width-this.padding; i += this.stitchSize) {

            y = 0;

            for (let j = this.padding; j < height-this.padding; j += this.stitchSize) {

                stitches[x][y] = new Stitch(x, y);
                y++;
            }
            x++;
        }

        this.displayGrid();
    }

    update() {

        for (let i = 0; i < stitches.length; i++) {
            for (let j = 0; j < stitches[i].length; j++) {

                stitches[i][j].reset();
            }
        }
    }

    display() {

        push();

        clear();
        image(twoD, 0, 0, width, height);

        this.x += this.velocity[0];
        this.y += this.velocity[1];

        let stitchSize = 10;
        let padding = 40;

        let x = 0;
        let y = 0;

        for (let i = this.padding; i < width-this.padding; i += this.stitchSize) {

            y = 0;

            for (let j = this.padding; j < height-this.padding; j += this.stitchSize) {

                push();
                translate(i, j);

                let scale = 0.008;

                let perlin = noise(i*scale+this.x, j*scale+this.y, frameCount*0.001);

                if (dist(width/2, height/2, i,  j) > height/2-this.padding-stitchSize*2) {
                    // outside stitch radius
                    stitches[x][y].stitched = true;
                } else if (perlin < 0.4) {
                    // blank
                    stitches[x][y].stitched = false;
                } else if (perlin < 0.45) {
                    this.displayStitch(stitchSize, this.palette.light);
                    stitches[x][y].stitched = true;
                } else if (perlin < 0.55) {
                    stitches[x][y].stitched = true;
                    this.displayStitch(stitchSize, this.palette.mid);
                } else if (perlin < 0.65) {
                    stitches[x][y].stitched = true;
                    this.displayStitch(stitchSize, this.palette.dark);
                } else {
                    stitches[x][y].stitched = true;
                    this.displayStitch(stitchSize, this.palette.black);
                }

                pop();

                y++;
            }

            x++;
        }

        this.displayBackstitch();

        pop();
    }

    displayGrid() {

        twoD.background(this.palette.white);

        twoD.noStroke();
        twoD.fill(this.palette.light);

        for (let i = 4; i < width; i += this.stitchSize) {
            for (let j = 4; j < height; j += this.stitchSize) {

                twoD.push();
                twoD.translate(i, j);


                twoD.rect(i, j, 5);

                twoD.pop();
            }
        }
    }

    displayStitch(stitchSize, colour) {

        push();
        stroke(this.palette.white);
        strokeWeight(stitchSize*.4);
        line(stitchSize*.85, stitchSize*.15, stitchSize*.15, stitchSize*.85);
        stroke(colour);
        strokeWeight(stitchSize*.35);
        line(stitchSize*.85, stitchSize*.15, stitchSize*.15, stitchSize*.85);
        stroke(this.palette.white);
        strokeWeight(stitchSize*.4);
        line(stitchSize*.15, stitchSize*.15, stitchSize*.85, stitchSize*.85);
        stroke(colour);
        strokeWeight(stitchSize*.35);
        line(stitchSize*.15, stitchSize*.15, stitchSize*.85, stitchSize*.85);
        pop();
    }

    displayBackstitch() {

        stroke(this.palette.dark);
        strokeWeight(1.5);

        for (let i = 0; i < stitches.length; i++) {
            for (let h = 0; h < stitches[i].length; h++) {

                if (stitches[i][h].stitched) continue;

                for (let j = -1; j <= 1; j++) {
                    for (let k = -1; k <= 1; k++) {

                        if (j == 0 && k == 0) continue;

                        let targetX = stitches[i][h].x+j;
                        let targetY = stitches[i][h].y+k;

                        if (targetX < 0) continue;
                        if (targetX > stitches.length-1) continue;
                        if (targetY < 0) continue;
                        if (targetY > stitches.length-1) continue;

                        let targetStitch = stitches[targetX][targetY];

                        if (targetStitch.stitched) {
                            if (j == 0 && k == -1) stitches[i][h].nNeighbour = true;
                            else if (j == 1 && k == -1) stitches[i][h].neNeighbour = true;
                            else if (j == 1 && k == 0) stitches[i][h].eNeighbour = true;
                            else if (j == 1 && k == 1) stitches[i][h].seNeighbour = true;
                            else if (j == 0 && k == 1) stitches[i][h].sNeighbour = true;
                            else if (j == -1 && k == 1) stitches[i][h].swNeighbour = true;
                            else if (j == -1 && k == 0) stitches[i][h].wNeighbour = true;
                            else if (j == -1 && k == -1) stitches[i][h].nwNeighbour = true;
                        }

                    }
                }

                push();
                translate(stitches[i][h].x*this.stitchSize+this.padding, stitches[i][h].y*this.stitchSize+this.padding);

                let n = stitches[i][h].nNeighbour;
                let ne = stitches[i][h].neNeighbour;
                let e = stitches[i][h].eNeighbour;
                let se = stitches[i][h].seNeighbour;
                let s = stitches[i][h].sNeighbour;
                let sw = stitches[i][h].swNeighbour;
                let w = stitches[i][h].wNeighbour;
                let nw = stitches[i][h].nwNeighbour;

                if (n && e && s && w) {
                    line(0, 0, this.stitchSize, 0);
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                    line(0, 0, 0, this.stitchSize);
                } else if (n && e && s) {
                    line(0, 0, this.stitchSize, 0);
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                }  else if (e && s && w) {
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                    line(0, 0, 0, this.stitchSize);
                }  else if (s && w && n) {
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                    line(0, 0, 0, this.stitchSize);
                    line(0, 0, this.stitchSize, 0);
                }  else if (w && n && e) {
                    line(0, 0, 0, this.stitchSize);
                    line(0, 0, this.stitchSize, 0);
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                } else if (n && e) {
                    line(0, 0, this.stitchSize, this.stitchSize);
                } else if (e && s) {
                    line(this.stitchSize, 0, 0, this.stitchSize);
                } else if (s && w) {
                    line(0, 0, this.stitchSize, this.stitchSize);
                } else if (n && w) {
                    line(this.stitchSize, 0, 0, this.stitchSize);
                } else if (n && s) {
                    line(0, 0, this.stitchSize, 0);
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                } else if (e && w) {
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                    line(0, 0, 0, this.stitchSize);
                } else if (n) {
                    line(0, 0, this.stitchSize, 0);
                } else if (e) {
                    line(this.stitchSize, 0, this.stitchSize, this.stitchSize);
                } else if (s) {
                    line(0, this.stitchSize, this.stitchSize, this.stitchSize);
                } else if (w) {
                    line(0, 0, 0, this.stitchSize);
                }
                pop();
            }
        }
    }
}

class Stitch {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.stitched = false;
        this.outsideRadius = false;

        this.nNeighbour = false;
        this.neNeighbour = false;
        this.eNeighbour = false;
        this.sepNeighbour = false;
        this.sNeighbour = false;
        this.swpNeighbour = false;
        this.wNeighbour = false;
        this.nwNeighbour = false;
    }

    reset() {

        this.stitched = false;

        this.nNeighbour = false;
        this.neNeighbour = false;
        this.eNeighbour = false;
        this.sepNeighbour = false;
        this.sNeighbour = false;
        this.swpNeighbour = false;
        this.wNeighbour = false;
        this.nwNeighbour = false;
    }
}