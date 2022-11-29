let day = 20;

let totalDays = 31;

let promptTexts;

function preload() {

    promptTexts = loadJSON("./json/prompts.json");
}

function setup() {

    createCanvas(540, 540);
    background("#000");

    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

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

    clear();

    if (sketches[day-1].noLoop) {
        noLoop();
    } else {
        loop();
    }

    sketches[day-1].prerun();
}