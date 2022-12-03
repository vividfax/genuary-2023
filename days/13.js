// Something you’ve always wanted to learn

class Sketch13 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F5E0B7",
            "light": "#D6BA73",
            "mid": "#6EAF87",
            "dark": "#857E7B",
            "black": "#59344F"
        }

        this.complete = true;

        this.dA = random(0.5, 0.9);
        this.dB = random(0.05, 0.4);
        this.dA = 0.9;
        this.dB = 0.4;
        this.f = 0.055; // feed
        this.k = 0.062; // kill

        this.centreWeight = -1;
        this.sideWeight = 0.2;
        this.diagonalWeight = 0.05;

        this.canvasSize = 90;
        this.smallCanvas = createGraphics(this.canvasSize, this.canvasSize);
    }

    prerun() {

        this.grid = [...Array(this.canvasSize)].map(e => Array(this.canvasSize));

        for (let x = 0; x < this.canvasSize; x++) {
            for (let y = 0; y < this.canvasSize; y++) {

                this.grid[x][y] = { a: 1, b: 0 };
            }
        }

        for (let i = 0; i < int(random(1, 5)); i++) {
            this.seed();
        }

        background(this.palette.white);
    }

    update() {

        this.updateGrid();
        this.updateGrid();
        this.updateGrid();
    }

    display() {

        noStroke();

        for (let x = 0; x < this.canvasSize; x++) {
            for (let y = 0; y < this.canvasSize; y++) {

                let a = this.grid[x][y].a;
                let b = this.grid[x][y].b;
                let difference = a-b;

                if (difference < 0.01) {
                    fill(this.palette.white);
                } else if (difference < 0.2) {
                    fill(this.palette.black);
                } else if (difference < 0.3) {
                    fill(this.palette.dark);
                } else if (difference < 0.4) {
                    fill(this.palette.mid);
                } else if (difference < 0.5) {
                    fill(this.palette.light);
                } else if (difference < 0.6) {
                    fill(this.palette.white);
                } else if (difference < 0.7) {
                    fill(this.palette.black);
                } else if (difference < 0.8) {
                    fill(this.palette.dark);
                } else if (difference < 0.9) {
                    fill(this.palette.mid);
                } else if (difference < 0.95) {
                    fill(this.palette.light);
                } else {
                    fill(this.palette.white);
                }

                rect(x*(width/this.canvasSize)+width/this.canvasSize/2, y*(height/this.canvasSize)+height/this.canvasSize/2, (width/this.canvasSize));
            }
        }
    }

    seed() {

        let start = [int(random(this.canvasSize)), int(random(this.canvasSize))];

        let xSize = int(random(1, 5));
        let ySize = int(random(1, 1));

        for (let i = -xSize; i <= xSize; i++) {
            for (let j = -ySize; j <= ySize; j++) {

                let targetCell = [mod(start[0] + i, this.canvasSize), mod(start[1]+j, this.canvasSize)];

                this.grid[targetCell[0]][targetCell[1]] = { a: 0, b: 1 };
            }
        }
    }

    updateGrid() {

        let cache = this.grid;

        for (let x = 0; x < this.canvasSize; x++) {
            for (let y = 0; y < this.canvasSize; y++) {

                let a = cache[x][y].a;
                let b = cache[x][y].b;
                let neighbours = this.getNeighbours(x, y, cache);

                let newA = a + (this.dA*neighbours[0]) - (a*b*b) + (this.f * (1-a));
                let newB = b + (this.dB*neighbours[1]) + (a*b*b) - ((this.k+this.f) * b);
                newA = constrain(newA, 0, 1);
                newB = constrain(newB, 0, 1);

                this.grid[x][y] = { a: newA, b: newB };
            }
        }

        this.grid = cache;
    }

    getNeighbours(x, y, grid) {

        let aNeighbours = 0;
        let bNeighbours = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                let targetCell = grid[mod(x+i, this.canvasSize)][mod(y+j, this.canvasSize)];
                let a = targetCell.a;
                let b = targetCell.b;

                if (i == 0 && j == 0) {
                    aNeighbours += this.centreWeight * a;
                    bNeighbours += this.centreWeight * b;
                } else if (abs(i+j) == 1) {
                    aNeighbours += this.sideWeight * a;
                    bNeighbours += this.sideWeight * b;
                } else {
                    aNeighbours += this.diagonalWeight * a;
                    bNeighbours += this.diagonalWeight * b;
                }
            }
        }

        return [aNeighbours, bNeighbours];
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}
