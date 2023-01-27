let nextButton;
let previousButton;
let regenerateButton;
let dayText;

function createUI() {

    nextButton = createButton("Next");
    nextButton.id("next")
    nextButton.mousePressed(nextDay);

    previousButton = createButton("Previous");
    previousButton.id("previous")
    previousButton.mousePressed(previousDay);

    regenerateButton = createButton("Regenerate");
    regenerateButton.id("regenerate")
    regenerateButton.mousePressed(regenerate);

    dayText = createDiv();
    dayText.id("dayText")

    updateUI();
    changeSketch();
}

function nextDay() {

    let prospectiveDay = day;
    prospectiveDay++;
    while (prospectiveDay < totalDays && !sketches[prospectiveDay-1].complete) prospectiveDay++;
    if (prospectiveDay > totalDays) return;

    day = prospectiveDay;

    updateUI();
    changeSketch();
}

function previousDay() {

    let prospectiveDay = day;
    prospectiveDay--;
    while (prospectiveDay > 0 && !sketches[prospectiveDay-1].complete) prospectiveDay--;
    if (prospectiveDay <= 0) return;

    day = prospectiveDay;

    updateUI();
    changeSketch();
}

function regenerate() {

    // resetSketch();
    // loop();
    changeSketch();
}

function updateUI() {

    if (day <= 1) previousButton.style("visibility", "hidden");
    else previousButton.style("visibility", "visible");

    if (day >= totalDays) nextButton.style("visibility", "hidden");
    else nextButton.style("visibility", "visible");

    dayText = dayText.html((["Day ", day, ": ", promptTexts.days[day-1].title]).join(""));
}
