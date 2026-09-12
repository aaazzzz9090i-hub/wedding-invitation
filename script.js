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
        event.preventDefault();
        event.stopPropagation();
    }

    // Start the real envelope opening
    opening.classList.add("opening-animation");

    // Show final invitation after animation
    setTimeout(function () {

        document.body.classList.add("revealed");

    }, 7000);
}


/* Seal */

seal.addEventListener("click", function(event) {

    event.preventDefault();
    event.stopPropagation();

    openEnvelope(event);

});


/* Envelope */

envelope.addEventListener("click", function(event) {

    openEnvelope(event);

});


/* Mobile touch */

seal.addEventListener("touchstart", function(event) {

    event.preventDefault();
    event.stopPropagation();

    openEnvelope(event);

}, { passive: false });
