// Initialize the map
const map = L.map("map", {
  center: [45, -86.35], // Center Michigan
  zoom: 6, // Initial zoom level
  minZoom: 6, // Minimum zoom level
  maxZoom: 100, // Maximum zoom level
  zoomControl: false, // Disable default zoom control
});

// Add the tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  minZoom: 6,
  maxZoom: 100,
}).addTo(map);

// Add zoom controls to the bottom left
L.control
  .zoom({
    position: "bottomleft",
  })
  .addTo(map);

// Restrict scrolling to Michigan's bounds
const bounds = [
  [55, -75], // Northeast corner
  [35, -95], // Southwest corner
];
map.setMaxBounds(bounds);

// Custom Icon Defintions
const trail_icon = L.icon({
  iconUrl: "../images/arrowhead.png", // Path to the custom icon
  iconSize: [30, 40], // Size of the icon [width, height]
  iconAnchor: [15, 40], // Anchor point of the icon (center bottom)
  popupAnchor: [0, -40], // Anchor for the popup relative to the icon
});

const trail_icon_hover = L.icon({
  iconUrl: "../images/arrowhead.png", // Path to the custom icon
  iconSize: [55, 65], // Size of the icon [width, height]
  iconAnchor: [27.5, 65], // Anchor point of the icon (center bottom)
  popupAnchor: [0, -40], // Anchor for the popup relative to the icon
});

// Add pins for parks
const parks = [
  {
    name: "Isle Royale National Park",
    lat: 47.913954,
    lng: -89.050962,
    url: "parks/isle_royale/isle_royale.html",
  },
  {
    name: "Keweenaw National Historical Park",
    lat: 47.252385,
    lng: -88.447573,
    url: "parks/keweenaw/keweenaw.html",
  },
  {
    name: "Pictured Rocks National Lakeshore",
    lat: 46.548994,
    lng: -86.45635,
    url: "parks/pictured_rocks/pictured_rocks.html",
  },
  {
    name: "North Country Trail",
    lat: 45.8174, // Near Mackinac Bridge
    lng: -84.7278,
    url: "data/north_country_trail.geojson", // Link to GeoJSON or information page
  },
  {
    name: "Sleeping Bear Dunes National Lakeshore",
    lat: 44.8828,
    lng: -86.0515,
    url: "parks/sleeping_bear/sleeping_bear.html",
  },
  {
    name: "River Raisin National Battlefield Park",
    lat: 41.915797,
    lng: -83.38125,
    url: "parks/river_raisin/river_raisin.html",
  },
];

// Add pins with popups to the map
parks.forEach((park) => {
  const marker = L.marker([park.lat, park.lng], { icon: trail_icon }).addTo(
    map
  );

  // Add popup to each pin
  marker.bindPopup(`
    <b>${park.name}</b><br>
    <a href="${park.url}" target="_blank">View Details</a>
  `);

  // Add hover effects
  marker.on("mouseover", function () {
    this.setIcon(trail_icon_hover); // Change to hover icon
  });

  marker.on("mouseout", function () {
    this.setIcon(trail_icon); // Revert to original icon
  });
});
