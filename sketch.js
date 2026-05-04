let leafletMap;
let canvas;
let agent;

let places = [
  {
    name: "VŠVU Hviezdoslavovo námestie",
    lat: 48.141737,
    lng: 17.107255,
  },
  {
    name: "VŠVU Drotárska",
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
    lat:48.183736 ,
    lng:  17.132237 
  },
  {
    name: 'bunt',
    lat: 48.129502 ,
    lng: 17.123586
  },
  {
    name: 'cvicit',
    lat: 48.144523 ,
    lng: 17.102153  
  },
  {
    name: 'projektik',
    lat:  48.137734 ,
    lng: 17.117300 
  },
  {
    name: 'business',
    lat:  48.150285 ,
    lng: 17.109144  
  },

];

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
  
  agent = new Mover(width/2, height/2);
}

function draw() {
    clear();

    for (let place of places){
        let myPoint = latLngToScreen(place.lat, place.lng);
        
        stroke('blue')
        // line(myPoint.x, myPoint.y, mouseX, mouseY);
        let myDist = dist(myPoint.x, myPoint.y, mouseX, mouseY);
        if (myDist < 60){
            agent.applyForce(agent.seek(createVector(myPoint.x, myPoint.y)));
            drawPlace(myPoint.x, myPoint.y, place);
        } else {
            // agent.applyForce(agent.seek(createVector(mouseX, mouseY)));
        }
    }
    
    agent.checkEdges();
    agent.update();
    agent.show();

    noFill();
    stroke('black');
    circle(mouseX, mouseY, 40);


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
  text(place.name, x + 18, y - 10);
  pop();
}