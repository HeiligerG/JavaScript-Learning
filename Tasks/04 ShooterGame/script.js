document.addEventListener('DOMContentLoaded', function() {
    const baelle = document.querySelectorAll('.ball');

    baelle.forEach(ball => {
        ball.addEventListener('click', handleClick);
    });
});

function handleClick(event) {
    const bild = event.target;

    if (bild.src.endsWith('ball.png')) {
        bild.src = 'kreuz.png';
        bild.alt = 'Kreuz';
    }
    else if (bild.src.endsWith('kreuz.png')) {
        bild.style.display = 'none';

        checkGameOver();
    }
}

function checkGameOver() {
    const sichtbareBilder = document.querySelectorAll('.ball:not([style*="display: none"])');

    if (sichtbareBilder.length === 0) {
        const p = document.createElement('p');
        p.innerHTML = '<strong>GAME OVER</strong>';
        p.style.color = 'red';
        p.style.fontSize = '24px';

        document.getElementById('baelle').after(p);
    }
}