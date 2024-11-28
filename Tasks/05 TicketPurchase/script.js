document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('ticketsError').style.display = 'none';

    const email = document.getElementById('email').value;
    const tickets = document.getElementById('tickets').value;

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    if (!tickets) {
        document.getElementById('ticketsError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        this.submit();
    }
});
