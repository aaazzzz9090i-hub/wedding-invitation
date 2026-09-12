const envelope = document.getElementById("envelope");
const opening = document.getElementById("opening");

let isOpened = false;

function openEnvelope(event) {
    if (isOpened) return;

    const target = event.target;

    // نتأكد إن الضغط كان على الظرف نفسه
    if (!target.closest("#envelope")) return;

    isOpened = true;

    if (event.cancelable) {
        event.preventDefault();
    }

    envelope.classList.add("open");
}


// Mouse + modern mobile
opening.addEventListener("pointerdown", openEnvelope, {
    passive: false
});


// iPhone / Safari fallback
opening.addEventListener("touchend", openEnvelope, {
    passive: false
});


// Final fallback
opening.addEventListener("click", openEnvelope);
