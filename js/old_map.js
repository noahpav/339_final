const parks = [
  {
    name: "Isle Royale National Park",
    lat: 47.9959,
    lng: -88.9093,
    url: "parks/isle_royale/isle_royale.html",
  },
  {
    name: "Keweenaw National Historical Park",
    lat: 47.1158,
    lng: -88.5694,
    url: "parks/keweenaw/keweenaw.html",
  },
  {
    name: "Pictured Rocks National Lakeshore",
    lat: 46.5615,
    lng: -86.4592,
    url: "parks/pictured_rocks/pictured_rocks.html",
  },
  {
    name: "Sleeping Bear Dunes National Lakeshore",
    lat: 44.8828,
    lng: -86.0515,
    url: "parks/sleeping_bear/sleeping_bear.html",
  },
  {
    name: "River Raisin National Battlefield Park",
    lat: 41.9111,
    lng: -83.3846,
    url: "parks/river_raisin/river_raisin.html",
  },
  {
    name: "North Country National Scenic Trail",
    lat: 45.124,
    lng: -84.983,
    url: "parks/north_country/north_country.html",
  },
];

// Initialize Map
const map = L.map("map", {
  center: [45.15, -86.35], // Center Michigan
  zoom: 6, // Initial zoom level
  minZoom: 6, // Minimum zoom level
  maxZoom: 10, // Maximum zoom level
  //   dragging: true,
  //   scrollWheelZoom: false,
  //   zoomSnap: 1,
  //   zoomDelta: 1,
});

// Add Tile Laayer (OpenStreeMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  minZoom: 6,
  maxZoom: 10,
}).addTo(map); // ^^^^^ Double check the copyright requirments here ^^^^^

// Set Maximum bounds for Map
const bounds = [
  [41.7, -90], // SW Corner
  [48.5, -82], // NE Corner
];
map.setMaxBounds(bounds);
// map.fitBounds(bounds);

// Add Marker for Each Park
parks.forEach((park) => {
  L.marker([park.lat, park.lng])
    .addTo(map)
    .bindPopup(`<b>${park.name}</b><br><a href="${park.url}">View Details</a>`);
});
