let day = 21;

let totalDays = 31;

let promptTexts;

function preload() {

    promptTexts = loadJSON("./json/prompts.json");
}

function setup() {

    createCanvas(540, 540);
    background("#000");

    rectMode(CENTER);

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

    console.log(day)
    sketches[day-1].init();
}

function changeSketch() {

    clear();
    sketches[day-1].prerun();
}