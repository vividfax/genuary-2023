// Generative poetry

class Sketch28 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#AEF6C7",
            "light": "#5B8266",
            "mid": "#3E6259",
            "dark": "#294936",
            "black": "#212922",
        }

        this.noLoop = true;
        this.complete = true;
    }

    update() {

    }

    display() {

        push();

        let lines = "";

        lines += this.randomLine(5) + "\n";
        lines += this.randomLine(7) + "\n";
        lines += this.randomLine(5) + "\n";

        lines = lines.trim();

        let backgroundColour = randomColour([this.palette.black, this.palette.dark, this.palette.light]);

        background(backgroundColour);
        noStroke();
        fill(this.palette.mid);
        ellipse(width/2, height/2, random(width*.3, width*.7));

        for (let i = 0; i < 20; i++) {
            ellipse(random(width), random(height), random(10, 50));
        }

        textFont(playfairFont);
        textAlign(CENTER, TOP);
        textSize(28);
        fill(this.palette.mid);
        text(lines, width/2+2, height/2-30*1.8+2);
        fill(this.palette.white);
        text(lines, width/2, height/2-30*1.8);

        pop();
    }

    randomLine(syllables) {

        let line = "";
        let syllableCount = 0;

        while (syllableCount < syllables) {

            let word = RiTa.randomWord();
            let stresses = RiTa.stresses(word);
            let arr = stresses.split("/");
            let count = arr.length;

            if (count >= 4) continue;
            if (count == 1 && word.length > 5) continue;

            if (syllableCount + count <= syllables) {
                line += word + " ";
                syllableCount += count;
            }
        }

        line = line.trim();
        line = line.charAt(0).toUpperCase() + line.slice(1);

        return line;
    }
}
