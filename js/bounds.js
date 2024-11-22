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
        layer.bindPopup(`<b>${feature.properties.name}</b>`);

        // Add hover effects
        layer.on("mouseover", function () {
          layer.setStyle({
            color: "#006400", // Dark Green Trail
            weight: 2, // Line thickness
            fillColor: "#00B100", // Light Green FillColor
            fillOpacity: 0.3, // Fill Opacity
          });
        });

        layer.on("mouseout", function () {
          layer.setStyle({
            color: "#006400", // Dark Green Trail
            weight: 1, // Line thickness
            fillColor: "#00B100", // Light Green FillColor
            fillOpacity: 0.15, // Fill Opacity
          });
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

    // Add hover effects to the entire trail
    trailLayer.on("mouseover", function () {
      trailLayer.setStyle({
        color: "#268DB2", // Highlight color (cyan)
        weight: 3, // Thicker line on hover
      });
    });

    trailLayer.on("mouseout", function () {
      trailLayer.setStyle({
        color: "#2596be", // Original Light Blue Trail
        weight: 2, // Original line thickness
      });
    });
  })
  .catch((error) => console.error("Error loading trail GeoJSON:", error));
