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

// Custom Pin Icon Definitions
const trailIcon = L.icon({
  iconUrl: "../images/arrowhead.png", // Default pin icon
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const trailIconHover = L.icon({
  iconUrl: "../images/arrowhead_hover.png", // Hovered pin icon
  iconSize: [35, 45],
  iconAnchor: [17.5, 45],
  popupAnchor: [0, -45],
});

// Parks and Trails Data
const parksAndTrails = [
  {
    name: "North Country Trail",
    pinCoords: [45.8174, -84.7278], // Pin location
    trailGeoJSON: "../data/mi_north_trail.geojson", // Trail GeoJSON
    popupContent: `<b>North Country Trail</b><br>Click <a href="https://www.nps.gov/noco/index.htm" target="_blank">here</a> for details.`,
  },
  {
    name: "Pictured Rocks National Lakeshore",
    pinCoords: [46.548994, -86.45635], // Pin location
    trailGeoJSON: "../data/pictured_rocks.geojson", // Trail GeoJSON
    popupContent: `<b>Pictured Rocks National Lakeshore</b><br>Visit the <a href="https://www.nps.gov/piro/index.htm" target="_blank">official site</a>.`,
  },
];

// Load Pins and Trails
parksAndTrails.forEach((park) => {
  // Add Pin
  const pin = L.marker(park.pinCoords, { icon: trailIcon }).addTo(map);

  // Load Trail/Area GeoJSON
  fetch(park.trailGeoJSON)
    .then((response) => response.json())
    .then((data) => {
      const trailLayer = L.geoJSON(data, {
        style: {
          color: "#2596be", // Default trail color
          weight: 1, // Default thickness
        },
      }).addTo(map);

      // Unified Popup
      const popup = L.popup().setContent(park.popupContent);
      pin.bindPopup(popup);
      trailLayer.bindPopup(popup);

      // Synchronize Hover Effects
      pin.on("mouseover", () => {
        trailLayer.setStyle({ color: "#00FFFF", weight: 2 }); // Highlight trail
        pin.setIcon(trailIconHover); // Highlight pin
      });
      pin.on("mouseout", () => {
        trailLayer.setStyle({ color: "#2596be", weight: 1 }); // Reset trail
        pin.setIcon(trailIcon); // Reset pin
      });

      trailLayer.on("mouseover", () => {
        trailLayer.setStyle({ color: "#00FFFF", weight: 2 }); // Highlight trail
        pin.setIcon(trailIconHover); // Highlight pin
      });
      trailLayer.on("mouseout", () => {
        trailLayer.setStyle({ color: "#2596be", weight: 1 }); // Reset trail
        pin.setIcon(trailIcon); // Reset pin
      });
    })
    .catch((error) =>
      console.error(`Error loading GeoJSON for ${park.name}:`, error)
    );
});
