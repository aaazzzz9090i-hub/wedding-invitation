```javascript
const opening = document.getElementById("opening");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

let opened = false;

function openEnvelope(event) {

    if (opened) {
        return;
    }

    opened = true;

    if (event) {
        event.stopPropagation();
    }

    /*
        Start the complete cinematic sequence:

        1. Camera moves closer
        2. Envelope tilts
        3. Gold seal breaks away
        4. Flap opens 180 degrees
        5. Envelope folds move
        6. Letter rises OUT of the envelope
        7. Letter comes toward the camera
        8. Final invitation appears
    */

    opening.classList.add("opening-animation");

    /*
        Wait until the envelope has completely opened
        and the letter has come toward the camera.
    */

    setTimeout(() => {

        document.body.classList.add("revealed");

    }, 7000);
}


/* Click the gold seal */

seal.addEventListener("click", openEnvelope);


/* Also allow clicking the envelope */

envelope.addEventListener("click", openEnvelope);
```
