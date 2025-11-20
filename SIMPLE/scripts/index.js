$(document).ready(function () {
    //Destinacion dropdown
    const packages = [
        { name: 'Budapest – Hungari', id: 'budapest' },
        { name: 'Pragë – Çeki', id: 'prague' },
        { name: 'Dubai – Emiratet', id: 'dubai' },
        { name: 'Paris – Francë', id: 'paris' },
        { name: 'DisneyLand Paris – Francë', id: 'disneyland' },
        { name: 'Venecia, Verona – Itali', id: 'venecia' },
        { name: 'Firence – Itali', id: 'florence' },
        { name: 'Bruge – Belgjikë', id: 'bruge' },
        { name: 'Stockholm – Suedi', id: 'stockholm' },
        { name: 'Strasburg - Francë • Zyrih - Zvicërr', id: 'strasburg' },
        { name: 'Arabi Saudite', id: 'saudi' },
        { name: 'Jordani', id: 'jordan' },
        { name: 'Bukuresht – Rumani', id: 'bucharest' },
        { name: 'Paris – Francë (Oferta fundviti)', id: 'paris-newyear' },
        { name: 'Barcelonë – Spanjë', id: 'barcelona' },
        { name: 'Alberobello – Itali', id: 'alberobello' },
        { name: 'Korçë – Shqipëri', id: 'korce' }
    ];

    const destinationSelect = $('#destinationSelect');
    for(let i = 0; i < packages.length; i++) {
        destinationSelect.append('<option value="' + packages[i].id + '">' + packages[i].name + '</option>');
    }

    //Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    $('#departDate, #returnDate').attr('min', today);

    //Search form submission
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        
        const selectedDestination = $('#destinationSelect').val();
        const departDate = $('#departDate').val();
        const returnDate = $('#returnDate').val();
        
        if (!selectedDestination || !departDate || !returnDate) {
            alert('Ju lutem plotësoni të gjitha fushat e kërkimit!');
            return;
        }
        
        if (departDate > returnDate) {
            alert('Data e nisjes nuk mund të jetë pas datës së kthimit!');
            return;
        }
        
        //Save search data to sessionStorage
        sessionStorage.setItem('searchDestination', selectedDestination);
        
        //Redirect to Paketa Turistike with anchor
        window.location.href = 'paketatTuristike.html#package-' + selectedDestination;
    });

    //Booking form validation
    $(".booking-bar").on("submit", function (e) {
        const destination = $(this).find("select:first");
        const dates = $(this).find("input[type='date']");
        const depart = dates.eq(0).val();
        const ret = dates.eq(1).val();

        if (!destination.val() || !depart || !ret) {
            e.preventDefault();
            alert("Ju lutem plotësoni të gjitha fushat e kërkimit!");
            return;
        }

        if (depart > ret) {
            e.preventDefault();
            alert("Data e nisjes nuk mund të jetë pas datës së kthimit!");
        }
    });

    //Carousel autoplay
    $(".carousel").carousel({
        interval: 3000,
        ride: "carousel"
    });

});