mapboxgl.accessToken =
  "pk.eyJ1IjoibGFpbGFpMDkxNiIsImEiOiJjbWdvcDRxamgxejBjMnFxNGVsYnZ4NnpwIn0.MjuRwdECag6ohYsN9VmK1Q";

const hangzhouCenter = [30.2741, 120.1551];
const toMapboxLngLat = ([lat, lng]) => [lng, lat];

const schools = [
  { name: "杭二滨江", coord: [30.1785503, 120.1323586], type: 1 },
  { name: "学军西溪", coord: [30.280919, 120.134296], type: 1 },
  { name: "杭高贡院", coord: [30.269094, 120.167738], type: 1 },
  { name: "十四凤起", coord: [-1, -1], type: 1 },
  { name: "余杭高级", coord: [-1, -1], type: 1 },
  { name: "学军紫金港", coord: [-1, -1], type: 1 },
  { name: "杭四下沙", coord: [-1, -1], type: 1 },
  { name: "萧山中学", coord: [-1, -1], type: 1 },
  { name: "浙附玉泉", coord: [-1, -1], type: 1 },
  { name: "长河高级", coord: [-1, -1], type: 1 },
  { name: "富阳中学", coord: [-1, -1], type: 1 },
  { name: "杭高钱江", coord: [-1, -1], type: 1 },
  { name: "杭师大附中", coord: [-1, -1], type: 1 },
  { name: "学军海创园", coord: [-1, -1], type: 2 },
  { name: "杭二钱江", coord: [-1, -1], type: 2 },
  { name: "十四康桥", coord: [-1, -1], type: 2 },
  { name: "余杭二高", coord: [-1, -1], type: 2 },
  { name: "浙附丁兰", coord: [-1, -1], type: 2 },
  { name: "杭师大未来科技城", coord: [-1, -1], type: 2 },
  { name: "源清中学", coord: [-1, -1], type: 2 },
  { name: "萧山三中", coord: [-1, -1], type: 2 },
  { name: "十四青山湖", coord: [-1, -1], type: 2 },
];

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: toMapboxLngLat(hangzhouCenter),
  zoom: 12,
});

const schoolFeatures = schools.map(({ name, coord, type }) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: toMapboxLngLat(coord),
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
      "circle-radius": 6,
      "circle-color": [
        "match",
        ["get", "type"],
        1,
        "#ef4444",
        2,
        "#1d4ed8",
        3,
        "#16a34a",
        "#6b7280",
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
      "text-anchor": "top",
      "text-offset": [0, 0.6],
      "text-size": 12,
      "text-font": ["Noto Sans Regular", "Arial Unicode MS Regular"],
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "rgba(255, 255, 255, 0.85)",
      "text-halo-width": 1,
    },
  });
});
