function zeichneSchachbrett(whitecolor = "white", blackcolor = "black") {
    let result = '<div style="display: grid; grid-template-columns: repeat(8, 65px); grid-template-rows: repeat(8, 65px); gap: 0; padding: 20px;">';
    const rows = 8;
    const columns = 8;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const isBlack = (i + j) % 2 === 0 ? whitecolor : blackcolor;

            result += `<div style="border: 1px solid black; height: 65px; width: 65px; background-color: ${isBlack};"></div>`;
        }
    }

    result += '</div>';

    document.getElementsByTagName("body")[0].innerHTML = result;
}

zeichneSchachbrett();

let isWhiteFirst = true;

setInterval(() => {
    if (isWhiteFirst){
        zeichneSchachbrett("white", "black");
    } else {
        zeichneSchachbrett("black", "white");
    }
    isWhiteFirst = !isWhiteFirst;

},1500);

/* Wird nur einmal ausgeführt und beendet, deshalb setInterval. */

/*
setTimeout(() => {
    zeichneSchachbrett("black","white");
}, 1500);
*/
