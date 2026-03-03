mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';

const travels = [
    {
        name: "Boracay",
        coords: [121.9250, 11.9674],
        image: "images/boracay.jpg",
        description: "Beautiful white sand beach experience 🌊"
    },
    {
        name: "Davao City",
        coords: [125.4553, 7.1907],
        image: "images/davao.jpg",
        description: "Durian capital and Mt. Apo adventure 🏔"
    },
    {
        name: "Makati City",
        coords: [121.0244, 14.5547],
        image: "images/makati.jpg",
        description: "City lights and business district vibes 🌃"
    }
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [122.5, 12],
    zoom: 5
});

map.on('load', () => {

    travels.forEach(place => {

        const popupContent = `
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <img src="${place.image}" class="popup-img">
        `;

        new mapboxgl.Marker({ color: "#f39c12" })
            .setLngLat(place.coords)
            .setPopup(new mapboxgl.Popup().setHTML(popupContent))
            .addTo(map);
    });

});
