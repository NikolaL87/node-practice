/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoibmlrb2xhbDg3IiwiYSI6ImNqeWc0bXlxejAwOWszbXF3NGZkZW4zOXAifQ.3maGskC89RNzRc4RrNJWcw';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nikolal87/cjyg4zsqw02xm1cmk3eh7pe9r',
  scrollZoom: false
  // center: [-118.113491, 34.111745],
  // zoom: 7,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(location => {
  // Create marker
  const element = document.createElement('div');
  element.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element,
    anchor: 'bottom'
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
