mapboxgl.accessToken =
  "pk.eyJ1IjoibGFpbGFpMDkxNiIsImEiOiJjbWdvcDRxamgxejBjMnFxNGVsYnZ4NnpwIn0.MjuRwdECag6ohYsN9VmK1Q";

const schools = [
  { name: "杭二滨江", coord: [30.179695, 120.133755], type: 1 },
  { name: "学军西溪", coord: [30.280685, 120.134565], type: 1 },
  { name: "杭高贡院", coord: [30.268955, 120.167534], type: 1 },
  { name: "十四凤起", coord: [30.266527, 120.153968], type: 1 },
  { name: "余杭高级", coord: [30.435974, 120.288674], type: 1 },
  { name: "学军紫金港", coord: [30.300204, 120.063159], type: 1 },
  { name: "杭四下沙", coord: [30.306156, 120.374773], type: 1 },
  { name: "萧山中学", coord: [30.155861, 120.279254], type: 1 },
  { name: "浙附玉泉", coord: [30.261106, 120.127269], type: 1 },
  { name: "长河高级", coord: [30.17362, 120.181589], type: 1 },
  { name: "富阳中学", coord: [30.050764, 119.963209], type: 1 },
  { name: "杭高钱江", coord: [30.291793, 120.256058], type: 1 },
  { name: "杭师大附中", coord: [30.318211, 120.080599], type: 1 },
  { name: "学军海创园", coord: [30.252367, 119.961492], type: 2 },
  { name: "杭二钱江", coord: [30.218937, 120.247877], type: 2 },
  { name: "十四康桥", coord: [30.381437, 120.131282], type: 2 },
  { name: "余杭二高", coord: [30.423596, 120.314562], type: 2 },
  { name: "浙附丁兰", coord: [30.367076, 120.218529], type: 2 },
  { name: "天元公学", coord: [30.274514, 119.951643], type: 2 },
  { name: "源清中学", coord: [30.326106, 120.146479], type: 2 },
  { name: "萧山三中", coord: [30.176834, 120.307202], type: 2 },
  { name: "十四青山湖", coord: [30.240216, 119.81433], type: 2 },
  { name: "杭高钱塘", coord: [30.310829, 120.442107], type: 2 },
  { name: "杭高临平", coord: [30.363146, 120.298566], type: 2 },
  { name: "杭二东河", coord: [30.251602, 120.176477], type: 2 },
  { name: "临安中学", coord: [30.281741, 119.735194], type: 2 },
  { name: "余杭一中", coord: [30.355166, 120.07356], type: 2 },
  { name: "杭四江东", coord: [30.285605, 120.541391], type: 2 },
  { name: "杭二富春", coord: [30.082816, 119.877555], type: 2 },
  { name: "杭七转塘", coord: [30.151663, 120.051926], type: 2 },
  { name: "杭师大二附", coord: [30.347408, 120.023875], type: 2 },
  { name: "学军桐庐", coord: [29.775618, 119.700369], type: 2 },
  { name: "长河二高", coord: [-1, -1], type: 2 },
  { name: "源清二高", coord: [-1, -1], type: 2 },
  { name: "余杭中学", coord: [-1, -1], type: 2 },
  { name: "西湖高级", coord: [-1, -1], type: 2 },
  { name: "杭四吴山", coord: [-1, -1], type: 2 },
  { name: "萧山二中", coord: [-1, -1], type: 2 },
  { name: "富阳二中", coord: [-1, -1], type: 2 },
  { name: "萧山五中", coord: [-1, -1], type: 2 },
  { name: "杭九树范", coord: [-1, -1], type: 2 },
  { name: "杭州九中", coord: [-1, -1], type: 2 },
  { name: "十一德胜", coord: [-1, -1], type: 2 },
  { name: "夏衍中学", coord: [-1, -1], type: 2 },
  { name: "十一大关", coord: [-1, -1], type: 2 },
  { name: "长征中学", coord: [-1, -1], type: 2 },
  { name: "钱塘高级", coord: [-1, -1], type: 2 },
  { name: "杭七解放路", coord: [-1, -1], type: 2 },
  { name: "艮山中学", coord: [-1, -1], type: 2 },
  { name: "绿城育华", coord: [-1, -1], type: 2 },
  { name: "天目高级", coord: [-1, -1], type: 2 },
];

const toMapboxLngLat = ([lat, lng]) => [lng, lat];
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: toMapboxLngLat([30.248787, 120.20473]),
  zoom: 10,
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
      "circle-radius": 4,
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
      "text-offset": [0, -2],
      "text-size": 8,
      "text-font": ["Noto Sans Regular", "Arial Unicode MS Regular"],
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "rgba(255, 255, 255, 0.85)",
      "text-halo-width": 1,
    },
  });
});
