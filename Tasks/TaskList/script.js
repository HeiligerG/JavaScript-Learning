function hinzufügenAufgabe() {
    const aufgabenListe = document.getElementById("aufgaben");
    const hinzufügenButton = document.getElementById("hinzufügenButton");
    const neueAufgabeInput = document.getElementById("neueAufgabe");

    hinzufügenButton.addEventListener("click", () => {
        const neueAufgabeText = neueAufgabeInput.value.trim();

        if (neueAufgabeText === "") {
            alert("Bitte eine Aufgabe eingeben!");
            return;
        }

        const neueAufgabe = document.createElement("li");
        neueAufgabe.innerHTML = `${neueAufgabeText} <a href="#">erledigt</a>`;

        aufgabenListe.appendChild(neueAufgabe);

        neueAufgabeInput.value = "";
    });

    aufgabenListe.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            const listItem = event.target.parentElement;
            listItem.style.textDecoration = "line-through";
        }
    });
}


function streicheAufgabe() {
    const aufgabenListe = document.getElementById("aufgaben");
    const abhakenButton = document.getElementById("abhakenButton")

    abhakenButton.addEventListener("click", () => {
        const listItems = aufgabenListe.getElementsByTagName("li");

        for (let i = 0; i < listItems.length; i++) {
            listItems[i].style.textDecoration = "line-through";
        }
    });
}


