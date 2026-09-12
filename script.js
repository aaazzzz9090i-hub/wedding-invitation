const envelope = document.getElementById("envelope");

let isOpened = false;

function openEnvelope() {
    if (isOpened) return;

    isOpened = true;
    envelope.classList.add("open");
}

envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("touchend", openEnvelope, { passive: true });
