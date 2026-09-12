
/* =========================================================
   ELEMENTS
========================================================= */

const envelopeArea = document.getElementById("envelope");
const envelope = document.querySelector(".envelope");

const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");


/* =========================================================
   STATE
========================================================= */

let isOpened = false;


/* =========================================================
   OPEN ENVELOPE
========================================================= */

function openEnvelope() {

    /*
       Prevent double opening.
       This is important especially on mobile.
    */

    if (isOpened) {
        return;
    }

    isOpened = true;


    /*
       Start the complete animation.

       The CSS handles:
       1. Envelope settles
       2. Seal leaves
       3. Flap opens
       4. Folds move slightly
       5. Letter comes out
    */

    envelope.classList.add("open");


    /*
       Wait until the letter has finished
       coming out.

       Then smoothly transition
       from the opening screen
       to the invitation.
    */

    window.setTimeout(function () {

        opening.classList.add("hide");

        invitation.classList.add("show");

    }, 2900);
}


/* =========================================================
   CLICK
========================================================= */

/*
   We listen ONLY to click.

   Do NOT add touchstart/touchend here.

   Modern mobile browsers generate click
   correctly after tapping, and using both
   can cause the animation to trigger twice.
*/

if (envelopeArea) {

    envelopeArea.addEventListener(
        "click",
        function () {

            openEnvelope();

        },
        false
    );
}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

/*
   Allows Enter or Space if the user
   focuses the envelope in a keyboard
   accessible environment.
*/

if (envelopeArea) {

    envelopeArea.setAttribute(
        "role",
        "button"
    );

    envelopeArea.setAttribute(
        "tabindex",
        "0"
    );

    envelopeArea.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openEnvelope();
            }

        }
    );
}

