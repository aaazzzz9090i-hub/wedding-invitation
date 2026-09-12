
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

let isOpened = false;

function openEnvelope(event) {

    if (isOpened) return;

    isOpened = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    envelope.classList.add("open");
}

envelope.addEventListener("click", openEnvelope);

seal.addEventListener("click", openEnvelope);

