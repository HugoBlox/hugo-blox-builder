/*************************************************
 *  Hugo Blox Builder
 *  https://github.com/HugoBlox/hugo-blox-builder
 *
 *  Hugo Blox Builder Maps
 **************************************************/

// Initialize Google Maps or OpenStreetMap via Leaflet.
function initMap() {
  if ($('#map').length) {
    let map_provider = $('#map-provider').val();
    let lat = $('#map-lat').val();
    let lng = $('#map-lng').val();
    let zoom = parseInt($('#map-zoom').val());
    let address = $('#map-dir').val();
    let api_key = $('#map-api-key').val();

    if (map_provider === 'google') {
      let map = new GMaps({
        div: '#map',
        lat: lat,
        lng: lng,
        zoom: zoom,
        zoomControl: true,
        zoomControlOpt: {
          style: 'SMALL',
          position: 'TOP_LEFT',
        },
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: 'cooperative',
      });

      map.addMarker({
        lat: lat,
        lng: lng,
        click: function () {
          let url = 'https://www.google.com/maps/place/' + encodeURIComponent(address) + '/@' + lat + ',' + lng + '/';
          window.open(url, '_blank');
        },
        title: address,
      });
    } else {
      let map = new L.map('map').setView([lat, lng], zoom);
      if (map_provider === 'mapbox' && api_key.length) {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: 'mapbox/streets-v11',
          accessToken: api_key,
        }).addTo(map);
      } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      }
      let marker = L.marker([lat, lng]).addTo(map);
      let url = lat + ',' + lng + '#map=' + zoom + '/' + lat + '/' + lng + '&layers=N';
      marker.bindPopup(
        address +
          '<p><a href="https://www.openstreetmap.org/directions?engine=osrm_car&route=' +
          url +
          '">Routing via OpenStreetMap</a></p>',
      );
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialise street maps if necessary.
  initMap();
});
