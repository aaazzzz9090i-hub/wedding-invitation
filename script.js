const envelope = document.getElementById("envelope");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");

let opened = false;

function openEnvelope() {

    if (opened) return;

    opened = true;

    // Start envelope opening animation
    envelope.classList.add("open");

    /*
        Sequence:

        0.00s  → envelope starts opening
        0.15s  → flap starts opening
        0.55s  → letter starts coming out
        2.40s  → transition to invitation
    */

    setTimeout(() => {

        opening.classList.add("hide");
        invitation.classList.add("show");

    }, 2500);
}


/*
    Event delegation
    Works with:
    - Laptop
    - Desktop
    - iPhone
    - Android
*/

document.addEventListener("click", function (event) {

    const envelopeClicked =
        event.target.closest("#envelope");

    if (!envelopeClicked) return;

    openEnvelope();
});
