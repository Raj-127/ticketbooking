document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        userName: formData.get('userName'),
        event: formData.get('event'),
        seatNumber: formData.get('seatNumber')
    };

    fetch('/api/tickets/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(ticket => {
            // Check if ticket.id is a valid number
            if (ticket.id && !isNaN(ticket.id)) {
                document.getElementById('downloadLink').style.display = 'block';
                const downloadButton = document.getElementById('downloadButton');
                downloadButton.href = `/api/tickets/download/${ticket.id}`;
                downloadButton.textContent = `Download Ticket #${ticket.id}`;
            } else {
                console.error('Invalid ticket ID:', ticket.id);
            }
        })
        .catch(error => console.error('Error booking ticket:', error));
});
