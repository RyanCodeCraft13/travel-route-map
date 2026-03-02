// Initialize map (Philippines Center)
var map = L.map('map').setView([12.8797, 121.7740], 6);

// Dark tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Travel Data
var travels = [
    {
        name: "Manila",
        coords: [14.5995, 120.9842],
        date: "Jan 2024",
        desc: "Business trip and city tour."
    },
    {
        name: "Baguio",
        coords: [16.4023, 120.5960],
        date: "Dec 2024",
        desc: "Cold weather escape."
    },
    {
        name: "Cebu",
        coords: [10.3157, 123.8854],
        date: "March 2025",
        desc: "Island adventure."
    }
];

// Add Markers
travels.forEach(function(place) {
    L.marker(place.coords)
        .addTo(map)
        .bindPopup(
            "<h3>" + place.name + "</h3>" +
            "<p><b>Date:</b> " + place.date + "</p>" +
            "<p>" + place.desc + "</p>"
        );
});

// Draw Route Line
var routeCoords = travels.map(place => place.coords);

var polyline = L.polyline(routeCoords, {
    color: '#f39c12',
    weight: 4,
    opacity: 0.8
}).addTo(map);

map.fitBounds(polyline.getBounds());

// Calculate Distance
function calculateDistance(coords) {
    let total = 0;

    for (let i = 0; i < coords.length - 1; i++) {
        total += map.distance(coords[i], coords[i + 1]);
    }

    return (total / 1000).toFixed(2); // meters to KM
}

// Update Stats
document.getElementById("totalPlaces").innerText = travels.length;
document.getElementById("totalDistance").innerText = calculateDistance(routeCoords);
