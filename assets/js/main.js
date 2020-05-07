/* let map = ""; */
let markersAll = [];
let map = '';
let prevInfoWindow = '';
window.initMap = () => {
    // The location of Caba
    const caba = {
        lat: -34.6068,
        lng: -58.4358
    };
    // The map, centered at Caba
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 13,
            center: caba,
            styles: styles,
            fullscreenControl: false,
            mapTypeControlOptions: {
                mapTypeIds: []
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
        });
    // The marker, positioned at Caba
    /* const marker = new google.maps.Marker({
        position: caba,
        map: map
    }); */
    fetchMarkers(map)
    let infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                icon: './assets/location.png',
                map: map,
                title: 'Tu ubicación'

            });
            marker.setMap(map);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Su ubicación');
            infoWindow.open(map);

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
const addMarker = (map, marker) => {
    console.log(marker);
    const {
        lat,
        lng,
        name,
        description,
        address,
        category,
        horarios,
        type
    } = marker;
    const contentString = `<div><h2>${name}</h2>
    <h3>${type}</h3>
    <p>${description}</p>
    <p>Categoría: ${category}</p>
    <p>Dirección: ${address}</p>
    <p>Horarios: ${horarios}</p>
    </div>`;
    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    const icons = {
        'Librería': './assets/libreria.png',
        'Librería y Café': './assets/libreria_cafe.png',
        'Librería y Disquería': './assets/libreria_disq.png',
        'Librería Café y Disquería': './assets/libreria_cafe_disq.png'
    };
    const markerItem = new google.maps.Marker({
        position: {
            lat,
            lng
        },
        icon: icons[type],
        map: map,
        customInfo: type
    });
    markerItem.setMap(map);
    markerItem.addListener('click', function () {
        if (prevInfoWindow !== '') {
            prevInfoWindow.close();
        }
        infoWindow.open(map, markerItem);
        prevInfoWindow = infoWindow;
    });
    markersAll.push(markerItem);
}

const fetchMarkers = async (map) => {
    try {
        const response = await fetch('https://librerias-api-rest.now.sh/librerias_caba');
        const json = await response.json();
        json.forEach(marker => {
            addMarker(map, marker);
        });
    } catch (error) {
        console.log(error);
    }
}
const handleFilterAll = document.querySelector('.todos');
const handleFilterLibreria = document.querySelector('.libreria');
const handleFilterLibreriaCafe = document.querySelector('.libreria_cafe');
const handleFilterLibreriaCafeDisq = document.querySelector('.libreria_cafe_disq');
const handleFilterLibreriaDisq = document.querySelector('.libreria_disq');

handleFilterAll.addEventListener('click', (e) => {
    e.preventDefault();
    fetchMarkers(map);
})
handleFilterLibreria.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('Librería');
})
handleFilterLibreriaCafe.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('Librería y Café');
})
handleFilterLibreriaCafeDisq.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('Librería Café y Disquería');
})
handleFilterLibreriaDisq.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('Librería y Disquería');
})
const addMarkerFiltered = (markerType) => {
    markersAll.forEach((marker) => {
        //console.log(marker);
        marker.setMap(null); //Delete all markers from map
    });

    const markerFiltered = markersAll.filter((markerItem) =>
        markerItem.customInfo === markerType
    );
    console.log(markerFiltered);
    markerFiltered.forEach((marker) => {
        marker.setMap(map)
    });
}