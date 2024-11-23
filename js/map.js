// Shared Data Structure to Link Pins and Boundaries
const sharedLayers = {};

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

// Custom Icon Definitions
const trail_icon = L.icon({
  iconUrl: "images/arrowhead.png", // Path to the custom icon
  iconSize: [35, 50], // Size of the icon [width, height]
  iconAnchor: [17.5, 50], // Anchor point of the icon (center bottom)
  popupAnchor: [0, -40], // Anchor for the popup relative to the icon
});

const trail_icon_hover = L.icon({
  iconUrl: "images/arrowhead.png", // Path to the custom icon
  iconSize: [55, 75], // Size of the icon [width, height]
  iconAnchor: [27.5, 75], // Anchor point of the icon (center bottom)
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

parks.forEach((park) => {
  const marker = L.marker([park.lat, park.lng], { icon: trail_icon }).addTo(
    map
  );

  // Save the marker reference in sharedLayers
  sharedLayers[park.name] = sharedLayers[park.name] || {};
  sharedLayers[park.name].pin = marker;

  // Add popup to each pin
  marker.bindPopup(`
    <b>${park.name}</b><br>
    <a href="${park.url}" target="_blank">View Details</a>
  `);

  // Add hover effects for synchronization
  marker.on("mouseover", function () {
    this.setIcon(trail_icon_hover); // Highlight pin
    const boundary = sharedLayers[park.name]?.boundary; // Get associated boundary
    if (boundary) {
      if (park.name === "North Country Trail") {
        boundary.setStyle({
          color: "#2596be", // Light Blue for trail
          weight: 2,
          fillOpacity: 0.3,
        });
      } else {
        boundary.setStyle({
          color: "#006400", // Dark Green for parks
          weight: 2,
          fillOpacity: 0.3,
        });
      }
    }
  });

  marker.on("mouseout", function () {
    this.setIcon(trail_icon); // Reset pin
    const boundary = sharedLayers[park.name]?.boundary; // Get associated boundary
    if (boundary) {
      if (park.name === "North Country Trail") {
        boundary.setStyle({
          color: "#2596be", // Light Blue for trail
          weight: 1,
          fillOpacity: 0.15,
        });
      } else {
        boundary.setStyle({
          color: "#006400", // Dark Green for parks
          weight: 1,
          fillOpacity: 0.15,
        });
      }
    }
  });
});

// Load GeoJSON for park boundaries
fetch("data/parks_data.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      style: {
        color: "#006400", // Dark Green Trail
        weight: 1, // Line thickness
        fillColor: "#00B100", // Light Green FillColor
        fillOpacity: 0.15, // Fill Opacity
      },
      onEachFeature: function (feature, layer) {
        const parkName = feature.properties.name;

        // Save the layer reference in sharedLayers
        sharedLayers[parkName] = sharedLayers[parkName] || {};
        sharedLayers[parkName].boundary = layer;

        layer.bindPopup(`<b>${parkName}</b>`);

        // Add hover effects for boundaries
        layer.on("mouseover", function () {
          layer.setStyle({
            color: "#006400", // Highlight boundary
            weight: 2,
            fillOpacity: 0.3,
          });

          const pin = sharedLayers[parkName]?.pin; // Get associated pin
          if (pin) pin.setIcon(trail_icon_hover); // Highlight pin
        });

        layer.on("mouseout", function () {
          layer.setStyle({
            color: "#006400", // Reset boundary
            weight: 1,
            fillOpacity: 0.15,
          });

          const pin = sharedLayers[parkName]?.pin; // Get associated pin
          if (pin) pin.setIcon(trail_icon); // Reset pin
        });
      },
    }).addTo(map);
  })
  .catch((error) => console.error("Error loading parks GeoJSON:", error));

// Load GeoJSON for North Country Trail
fetch("data/mi_north_trail.geojson")
  .then((response) => response.json())
  .then((data) => {
    const trailLayer = L.geoJSON(data, {
      style: {
        color: "#2596be", // Light Blue Trail
        weight: 1, // Line thickness
      },
    }).addTo(map);

    // Save the trail layer reference in sharedLayers
    sharedLayers["North Country Trail"] =
      sharedLayers["North Country Trail"] || {};
    sharedLayers["North Country Trail"].boundary = trailLayer;

    // Add hover effects for the trail
    trailLayer.on("mouseover", function () {
      trailLayer.setStyle({
        color: "#2596be", // Highlight color (cyan)
        weight: 3, // Thicker line on hover
      });

      const pin = sharedLayers["North Country Trail"]?.pin; // Get associated pin
      if (pin) pin.setIcon(trail_icon_hover); // Highlight pin
    });

    trailLayer.on("mouseout", function () {
      trailLayer.setStyle({
        color: "#2596be", // Original Light Blue Trail
        weight: 1, // Original line thickness
      });

      const pin = sharedLayers["North Country Trail"]?.pin; // Get associated pin
      if (pin) pin.setIcon(trail_icon); // Reset pin
    });

    // Bind popup for the trail
    trailLayer.bindPopup(`
      <b>North Country Trail</b><br>
      <a href="https://www.nps.gov/noco/index.htm" target="_blank">View Details</a>
    `);
  })
  .catch((error) => console.error("Error loading trail GeoJSON:", error));
