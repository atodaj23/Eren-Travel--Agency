//Load reservations from localStorage
let reservations = localStorage.getItem('reservations');
if (reservations) {
    reservations = JSON.parse(reservations);
} else {
    reservations = [];
}

//Display all reservations
function renderReservations() {
    const container = document.getElementById('reservation-list');
    container.innerHTML = '';

    if(reservations.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted fs-5 mt-5">Nuk ka rezervime të bëra.</p></div>';
        return;
    }

    //Loop through each reservation and create HTML
    for(let i = 0; i < reservations.length; i++) {
        const res = reservations[i];
        
        //Determine status
        let statusBadge = '';
        let cardBorder = '';
        if (res.confirmed) {
            statusBadge = '<span class="badge bg-success">E Konfirmuar</span>';
            cardBorder = 'border-success';
        } else {
            statusBadge = '<span class="badge bg-warning text-dark">Në pritje</span>';
            cardBorder = 'border-light';
        }
        
        //Create card HTML
        const cardHTML = '<div class="col-lg-6 col-md-12">' +
            '<div class="card shadow ' + cardBorder + '">' +
                '<div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">' +
                    '<h5 class="mb-0">' + res.paketa + '</h5>' +
                    statusBadge +
                '</div>' +
                '<div class="card-body">' +
                    '<div class="row mb-2">' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Emri:</strong></p>' +
                            '<p class="text-muted">' + res.emri + '</p>' +
                        '</div>' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Email:</strong></p>' +
                            '<p class="text-muted">' + res.email + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row mb-2">' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Data nisjes:</strong></p>' +
                            '<p class="text-muted">' + res.dataNisjes + '</p>' +
                        '</div>' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Data kthimit:</strong></p>' +
                            '<p class="text-muted">' + res.dataKthimit + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row mb-3">' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Nr personave:</strong></p>' +
                            '<p class="text-muted">' + res.nrPersonave + '</p>' +
                        '</div>' +
                        '<div class="col-6">' +
                            '<p class="mb-1"><strong>Nr dhomave:</strong></p>' +
                            '<p class="text-muted">' + res.nrDhomave + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row mb-3">' +
                        '<div class="col-12">' +
                            '<p class="mb-1"><strong>Çmimi:</strong></p>' +
                            '<p class="text-success fw-bold fs-5">' + res.cmimi + '€</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex gap-2 justify-content-end">' +
                        '<button class="btn btn-danger btn-sm" onclick="deleteReservation(' + i + ')">Fshij</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
        
        container.innerHTML += cardHTML;
    }

    //Calculate total price
    let totalPrice = 0;
    for(let i = 0; i < reservations.length; i++) {
        totalPrice += reservations[i].cmimi;
    }

    //Add total section
    const totalHTML = '<div class="col-12 mt-4">' +
        '<div class="card shadow border-primary">' +
            '<div class="card-body">' +
                '<div class="row align-items-center">' +
                    '<div class="col-md-6">' +
                        '<h4 class="mb-0">Shuma Totale: <span class="text-primary">' + totalPrice + '€</span></h4>' +
                        '<p class="text-muted small mb-0">Total për ' + reservations.length + ' paketa</p>' +
                    '</div>' +
                    '<div class="col-md-6 text-end">' +
                        '<button class="btn btn-success btn-lg" onclick="confirmAllReservations()">Konfirmo të gjitha</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    
    container.innerHTML += totalHTML;
}

//Confirm all reservations
function confirmAllReservations() {
    if (reservations.length === 0) {
        alert('Nuk ka rezervime për të konfirmuar!');
        return;
    }

    const confirmMsg = confirm('A jeni të sigurt që doni të konfirmoni të gjitha rezervimet?');
    if (confirmMsg) {
        for(let i = 0; i < reservations.length; i++) {
            reservations[i].confirmed = true;
        }
        localStorage.setItem('reservations', JSON.stringify(reservations));
        renderReservations();
        alert('Të gjitha rezervimet u konfirmuan me sukses!');
    }
}

//Delete a reservation
function deleteReservation(index) {
    const confirmDelete = confirm("A jeni të sigurt që doni të fshini këtë rezervim?");
    if(confirmDelete) {
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        renderReservations();
    }
}

//Load reservations when page loads
$(document).ready(function() {
    renderReservations();
});