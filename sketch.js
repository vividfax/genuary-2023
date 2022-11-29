let day = 25;

let totalDays = 31;

let promptTexts;
let gourd3D;
let pumpkin3D;

let canvas;
let twoD;
let threeD;

function preload() {

    promptTexts = loadJSON("./json/prompts.json");

    gourd3D = loadModel("./objs/gourd.obj");
    pumpkin3D = loadModel("./objs/pumpkin.obj");
}

function setup() {

    canvas = createCanvas(540, 540);
    twoD = createGraphics(540, 540);
    threeD = createGraphics(540, 540, WEBGL);
    background("#000");

    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

    threeD.angleMode(DEGREES);

    createSketches();
    createUI();
}

function draw() {

    sketches[day-1].update();
    sketches[day-1].display();
}

function createSketches() {

    for (let i = 0; i < totalDays; i++) {
        sketches.push(eval("new Sketch" + (i+1) + "(" + day + ")"));
    }
}

function resetSketch() {

    sketches[day-1].init();
}

function changeSketch() {

    threeD.clear();
    clear();

    if (sketches[day-1].noLoop) {
        noLoop();
    } else {
        loop();
    }

    sketches[day-1].prerun();
}