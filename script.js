mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';

// All your existing travel locations
const travels = [
    { name: "Kidapawan City, North Cotabato", coords: [125.0897, 7.0083], type:"land" },
    { name: "Mabuhay, President Roxas, North Cotabato", coords: [124.7000, 7.1500], type:"land" },
    { name: "Marbel (Koronadal), Cotabato", coords: [124.8500, 6.5000], type:"land" },
    { name: "Davao City", coords: [125.4553, 7.1907], type:"land" },
    { name: "Digos City", coords: [125.3581, 6.7492], type:"land" },
    { name: "Mlang, Cotabato", coords: [124.8800, 6.9500], type:"land" },
    { name: "Antique, Western Visayas", coords: [122.0800, 11.0000], type:"land" },
    { name: "Tibiao, Antique", coords: [122.0500, 11.2833], type:"land" },
    { name: "Malumpati, Pandan, Antique", coords: [122.1167, 11.7333], type:"land" },
    { name: "Kalibo, Aklan", coords: [122.3750, 11.7000], type:"sea" },
    { name: "Boracay", coords: [121.9250, 11.9674], type:"sea" },
    { name: "Iloilo City", coords: [122.5644, 10.7202], type:"sea" },
    { name: "Makati City, Manila", coords: [121.0244, 14.5547], type:"land" },
    { name: "MOA, Pasay", coords: [120.9816, 14.5350], type:"land" },
    { name: "BGC, Taguig", coords: [121.0450, 14.5547], type:"land" },
    { name: "Arakan, North Cotabato", coords: [125.0500, 7.3500], type:"land" }
];

// Initialize 3D globe
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [122.5, 11.5],
    zoom: 4,
    pitch: 60,
    bearing: 0,
    projection: 'globe',
    antialias: true
});

// Fog for realism
map.on('style.load', () => {
    map.setFog({
        color: 'rgb(10,10,20)',
        "high-color": 'rgb(36,92,223)',
        "horizon-blend": 0.2
    });
});

// Add all pins and route
map.on('load', () => {

    // Add markers
    travels.forEach(place => {
        new mapboxgl.Marker({ color: place.type==="sea"?"#00BFFF":"#f39c12" })
            .setLngLat(place.coords)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
            .addTo(map);
    });

    // Route line connecting all travels
    const routeCoords = travels.map(p=>p.coords);
    map.addSource('route', {
        type:'geojson',
        data:{ type:'Feature', geometry:{ type:'LineString', coordinates:routeCoords } }
    });
    map.addLayer({
        id:'route-line',
        type:'line',
        source:'route',
        layout:{ 'line-join':'round','line-cap':'round' },
        paint:{ 'line-color':'#f39c12','line-width':4 }
    });

    // Stats
    document.getElementById("places").innerText = travels.length;
    let totalDistance = 0;
    for(let i=0;i<travels.length-1;i++){
        totalDistance += turf.distance(turf.point(travels[i].coords), turf.point(travels[i+1].coords));
    }
    document.getElementById("distance").innerText = totalDistance.toFixed(2);

    // Rotate globe slowly for 360 view
    let rotate = 0;
    function spinGlobe() {
        rotate += 0.1;
        if(rotate>360) rotate=0;
        map.rotateTo(rotate, { duration: 50 });
        requestAnimationFrame(spinGlobe);
    }
    spinGlobe();
});
