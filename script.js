const envelope = document.getElementById("envelope");

let isOpened = false;

function openEnvelope(event) {
    if (isOpened) return;

    isOpened = true;

    if (event) {
        event.preventDefault();
    }

    envelope.classList.add("open");
}

envelope.addEventListener("pointerdown", openEnvelope, {
    passive: false
});
