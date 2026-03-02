mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';

const travels = [
    { name: "Kidapawan City", coords: [125.0897, 7.0083] },
    { name: "Mabuhay, President Roxas", coords: [124.7000, 7.1500] },
    { name: "Marbel (Koronadal)", coords: [124.8500, 6.5000] },
    { name: "Davao City", coords: [125.4553, 7.1907] },
    { name: "Digos City", coords: [125.3581, 6.7492] },
    { name: "Mlang, Cotabato", coords: [124.8800, 6.9500] },
    { name: "Antique", coords: [122.0800, 11.0000] },
    { name: "Tibiao, Antique", coords: [122.0500, 11.2833] },
    { name: "Malumpati, Pandan", coords: [122.1167, 11.7333] },
    { name: "Kalibo, Aklan", coords: [122.3750, 11.7000] },
    { name: "Boracay", coords: [121.9250, 11.9674] },
    { name: "Iloilo City", coords: [122.5644, 10.7202] },
    { name: "Makati City", coords: [121.0244, 14.5547] },
    { name: "MOA (Pasay)", coords: [120.9816, 14.5350] },
    { name: "BGC Taguig", coords: [121.0450, 14.5547] },
    { name: "Arakan, North Cotabato", coords: [125.0500, 7.3500] }
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [122.5, 11.5],
    zoom: 4,
    pitch: 60,
    bearing: -20,
    projection: 'globe',
    antialias: true
});

map.on('style.load', () => {
    map.setFog({
        color: 'rgb(10,10,20)',
        "high-color": 'rgb(36, 92, 223)',
        "horizon-blend": 0.2
    });
});

map.on('load', () => {

    // Add markers
    travels.forEach(place => {
        new mapboxgl.Marker({ color: "#f39c12" })
            .setLngLat(place.coords)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
            .addTo(map);
    });

    // Route Line
    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: travels.map(p => p.coords)
            }
        }
    });

    map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#f39c12',
            'line-width': 4
        }
    });

    // Stats
    document.getElementById("places").innerText = travels.length;

    let totalDistance = 0;
    for (let i = 0; i < travels.length - 1; i++) {
        const from = turf.point(travels[i].coords);
        const to = turf.point(travels[i + 1].coords);
        totalDistance += turf.distance(from, to);
    }

    document.getElementById("distance").innerText = totalDistance.toFixed(2);
});
