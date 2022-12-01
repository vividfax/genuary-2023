let day = 16;

let totalDays = 31;

let promptTexts;
let gourd3D;
let pumpkin3D;

let canvas;
let twoDSmall;
let twoD;
let threeD;

let limelightFont;

var scribble;

function preload() {

    promptTexts = loadJSON("./json/prompts.json");

    gourd3D = loadModel("./objs/gourd.obj");
    pumpkin3D = loadModel("./objs/pumpkin.obj");

    limelightFont = loadFont("./fonts/Limelight-Regular.ttf");
}

function setup() {

    canvas = createCanvas(540, 540);
    twoDSmall = createGraphics(540, 540);
    twoD = createGraphics(1080, 1080);
    threeD = createGraphics(540, 540, WEBGL);
    background("#000");

    scribble = new Scribble();

    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

    threeD.angleMode(DEGREES);

    createSketches();
    createUI();
}

function draw() {

    push();

    sketches[day-1].update();
    sketches[day-1].display();

    pop();
}

function createSketches() {

    for (let i = 0; i < totalDays; i++) {
        sketches.push(eval("new Sketch" + (i+1) + "(" + day + ")"));
    }
}

function resetSketch() {

    // sketches[day-1].init();
}

function changeSketch() {

    if (!sketches[day-1].noClear) clear();
    twoD.clear();
    twoDSmall.clear();
    threeD.clear();

    sketches[day-1].prerun();

    if (sketches[day-1].noLoop) {
        noLoop();
        draw();
    } else {
        loop();
    }
}