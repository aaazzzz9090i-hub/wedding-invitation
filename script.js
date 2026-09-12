const envelope = document.getElementById("envelope");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");

let opened = false;

function openEnvelope() {
    if (opened) return;

    opened = true;

    envelope.classList.add("open");

    setTimeout(() => {
        opening.classList.add("hide");
        invitation.classList.add("show");
    }, 2500);
}


// الضغط على الظرف
envelope.addEventListener("click", openEnvelope);


// منع الضغط على الختم من عمل أي حاجة مختلفة
const seal = document.getElementById("seal");

if (seal) {
    seal.addEventListener("click", function (event) {
        event.stopPropagation();
        openEnvelope();
    });
}
