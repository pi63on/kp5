let leafletMap;
let canvas;
let agent;
let currentPlace;

let places = [
  {
    name: "VŠVU Hviezdoslavovo námestie",
    lat: 48.141737,
    lng: 17.107255,
  },
  {
    name: "Odraz v lúke",
    lat: 48.1556,
    lng: 17.0857,
  },
  {
    name: "VŠVU Koceľova",
    lat: 48.1542,
    lng: 17.1318,
  },
  {
    name: "Moja izba",
    lat: 48.183736,
    lng: 17.132237
  },
  {
    name: 'bunt',
    lat: 48.129502,
    lng: 17.123586
  },
  {
    name: 'cvicit',
    lat: 48.144523,
    lng: 17.102153
  },
  {
    name: 'projektik',
    lat: 48.137734,
    lng: 17.117300
  },
  {
    name: 'business',
    lat: 48.150285,
    lng: 17.109144
  },

];

let locations = [
  [
    'odraz v luke',
    48.158547007735805,
    17.08357049852339
  ],
  [
    'dvojtien',
    48.16047868364396,
    17.122342586517338
  ],
  [
    'obchodna',
    48.14888772654541,
    17.113180160522464
  ],
  [
    'corner of the eye',
    48.17564069390013,
    17.12328672409058
  ],
  [
    'tunnel',
    48.17608411529678,
    17.12354421615601
  ],
  [
    'incoming light',
    48.186467661779595,
    17.13624715805054
  ],
  [
    'tree',
    48.1851948607939,
    17.137899398803714
  ],
  [
    'washing with light',
    48.183993536487385,
    17.13255643844605
  ],
  [
    'cubus top lease',
    48.15312429910389,
    17.118201401645358
  ],
  [
    'Bajkalska',
    48.16432626784801,
    17.13847427991539
  ],
  [
    'Ruzinov podjazd',
    48.15609829356522,
    17.14542474834423
  ],
  [
    'pristavny strom',
    48.13998018565226,
    17.150530838557597
  ],
  [
    'terasa Petrzalka',
    48.12671731305597,
    17.12112133898056
  ]
]

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-layer");

  leafletMap = L.map("map").setView([48.1486, 17.1077], 13);

  let Stadia_StamenTonerLite = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
  }).addTo(leafletMap);

  agent = new Mover(width / 2, height / 2);
}

function draw() {
  clear();

  currentPlace = NaN;
  for (let i = 0; i < locations.length; i++) {
    place = locations[i]
    let myPoint = latLngToScreen(place[1], place[2]);
    let myDist = dist(myPoint.x, myPoint.y, mouseX, mouseY);

    stroke('blue');
    drawPlace(myPoint.x, myPoint.y, place);

    //checks if close to some point
    if (myDist < 30) {
      agent.applyForce(agent.seek(createVector(myPoint.x, myPoint.y))); // move marker
      currentPlace = i;
    }
  }

  console.log(currentPlace);
  // floating marker behavior
  agent.checkEdges();
  agent.update();
  agent.show();

  // show mouse position
  noFill();
  stroke('black');
  circle(mouseX, mouseY, 60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function latLngToScreen(lat, lng) {
  return leafletMap.latLngToContainerPoint([lat, lng]);
}

function drawPlace(x, y, place) {
  let r = 6;

  push();
  stroke('blue')
  noFill();
  circle(x, y, r);

  noStroke(), fill('blue');
  textSize(14);
  text(place[0], x + 18, y - 10);
  pop();
}

function mousePressed() {
  console.log('pressed', currentPlace);
  if (currentPlace == NaN) {
    console.log('nan place')
  } else if (!(isNaN(currentPlace))) {
    console.log('current place', currentPlace);
    let myAdder = currentPlace;
    document.getElementById('borderimage').src = 'images/' + myAdder + '.jpg';
    document.getElementById('imageText').innerHTML = locations[myAdder][0];
    openCenteredPopup('video-pages/' + myAdder + '.html', 500, 400, 'myNewWindow', myAdder);
  }
}

// popup details
function openCenteredPopup(url, width, height, windowName = "customPopup", vidIndex) {
  // Calculate left and top positions to center the popup
  const left = - screen.availWidth;
  const top = (screen.availHeight - height) / 2;

  // Define popup features (comma-separated, no spaces!)
  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "toolbar=no", // Hide toolbar
    "location=no", // Hide address bar
    "status=no", // Hide status bar
    "menubar=no", // Hide menu bar
    "scrollbars=yes", // Show scrollbars if needed
    "resizable=yes" // Allow resizing
  ].join(",");

  // Open the popup
  return window.open(url, windowName, features);
}
