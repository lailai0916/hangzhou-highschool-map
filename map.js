mapboxgl.accessToken =
  "pk.eyJ1IjoibGFpbGFpMDkxNiIsImEiOiJjbWdvcDRxamgxejBjMnFxNGVsYnZ4NnpwIn0.MjuRwdECag6ohYsN9VmK1Q";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: [120.12, 30.24],
  zoom: 10,
});

const schoolFeatures = schools.map(({ name, coord, type }) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [coord[1], coord[0]],
  },
  properties: { name, type },
}));

map.on("load", () => {
  map.addSource("hangzhou-schools", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: schoolFeatures,
    },
  });

  map.addLayer({
    id: "hangzhou-schools-points",
    type: "circle",
    source: "hangzhou-schools",
    paint: {
      "circle-radius": 4,
      "circle-color": [
        "match",
        ["get", "type"],
        1,
        "#941100",
        2,
        "#ff9300",
        "#ff9300",
      ],
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.addLayer({
    id: "hangzhou-schools-labels",
    type: "symbol",
    source: "hangzhou-schools",
    layout: {
      "text-field": ["get", "name"],
      "text-size": 12,
      "text-variable-anchor": [
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      "text-radial-offset": 0.6,
      "text-allow-overlap": true,
    },
  });
});
