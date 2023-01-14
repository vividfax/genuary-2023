// Generative music

class Sketch10 extends Sketch {

    constructor(dayNumber) {

        super(dayNumber);

        this.palette = {
            "white": "#F5B0CB",
            "light": "#DC6ACF",
            "mid": "#89619E",
            "dark": "#745C97",
            "black": "#39375B",
        }

        this.complete = true;
        // this.noLoop = true;


        this.crusher = new Tone.BitCrusher(4).toDestination();
        this.synthCrush = new Tone.MembraneSynth().connect(this.crusher);
        this.synth = new Tone.MembraneSynth().toDestination();
        this.vol = new Tone.Volume(-5).toDestination();
        this.fmSynth = new Tone.FMSynth().connect(this.vol);
    }

    prerun() {

        background(this.palette.mid);
        textFont(silkscreenFont);
    }

    update() {

    }

    display() {

        if (frameCount % 15 != 0) return;

        this.now = Tone.now()

        if (frameCount % (15*8) == 15) this.fmSynth.triggerAttackRelease(this.randomNote(this.palette.black, 2), "1n");

        this.synth.triggerAttackRelease(this.randomNote(this.palette.dark, 0), "8n", this.now);

        if (frameCount % (15*4) == 15) this.synthCrush.triggerAttackRelease(this.randomNote(this.palette.light, 0), "8n", this.now);
        if (frameCount % (15*4) == 45 && random() < 0.5) this.synthCrush.triggerAttackRelease(this.randomNote(this.palette.white, 0), "8n", this.now);
    }

    randomNote(colour, sizeOffset) {

        let note = random(["A", "B", "C", "D", "E", "F", "G"]);
        let noteSize = int(random(3, 5)) - sizeOffset;

        push();
        stroke(this.palette.mid);
        strokeWeight(10);
        textAlign(CENTER, CENTER);
        fill(colour);
        textSize((6-noteSize) * 50);
        text(note, random(width), random(height)-(6-noteSize)*50/4);
        pop();

        return note + noteSize;
    }
}