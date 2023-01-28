let day = 1;

let totalDays = 31;

let promptTexts;
let gourd3D;
let pumpkin3D;

let canvas;
let twoDSmall;
let twoD;
let threeD;

let limelightFont;
let balooTamma2Font;
let silkscreenFont;
let playfairFont;

var scribble;

let portraitImage;

let musicPlaying = false;

function preload() {

    promptTexts = loadJSON("./json/prompts.json");

    gourd3D = loadModel("./objs/gourd.obj");
    pumpkin3D = loadModel("./objs/pumpkin.obj");

    limelightFont = loadFont("./fonts/Limelight-Regular.ttf");
    balooTamma2Font = loadFont("./fonts/BalooTamma2-Regular.ttf");
    silkscreenFont = loadFont("./fonts/Silkscreen-Regular.ttf");
    playfairFont = loadFont("./fonts/PlayfairDisplay-VariableFont_wght.ttf");

    portraitImage = loadImage("./images/portrait.jpg");
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

    musicPlaying = false;
}

function mousePressed() {

    if (day == 10) {
        if ((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
            musicPlaying = true;
        }
    }
}