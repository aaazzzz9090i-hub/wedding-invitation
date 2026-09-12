const opening = document.getElementById("opening");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

let isOpened = false;

function openInvitation() {

    if (isOpened) return;

    isOpened = true;

    // Start the cinematic 3D sequence
    opening.classList.add("cinematic");

    // After the complete envelope animation,
    // reveal the final invitation
    setTimeout(() => {
        document.body.classList.add("revealed");
    }, 4200);
}


// Click anywhere on the envelope
envelope.addEventListener("click", openInvitation);


// Click directly on the seal
seal.addEventListener("click", function (event) {

    event.stopPropagation();

    openInvitation();
});
