const opening = document.getElementById("opening");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

let isOpened = false;

function openInvitation(event) {

    if (isOpened) return;

    isOpened = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Start the full cinematic animation
    opening.classList.add("cinematic");

    // Reveal the invitation after the envelope sequence
    setTimeout(() => {
        document.body.classList.add("revealed");
    }, 4200);
}

envelope.addEventListener("click", openInvitation);

seal.addEventListener("click", openInvitation);
