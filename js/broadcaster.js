const broadcaster = new Broadcaster(6000, 'video', 'play', 'stop');

document.getElementById('broadcaster').setAttribute("class", "embed-responsive-item");

// Limit user's session if inactive
var pageTimer;

var playBtn = document.getElementById('play');
var stopBtn = document.getElementById('stop');

var inactiveTime = 5000;
var inactiveFunc = () => {
  window.close();
};

playBtn.addEventListener('click', (event) => {
  // create timer
  pageTimer = window.setTimeout(inactiveFunc, inactiveTime);
});

// send message to server that disconnecting
window.onbeforeunload = function (event) {
  // create get request to tell about disconnect
  const req = new XMLHttpRequest();
  req.open('GET', '/broadcaster-disconnect', false);
  req.send();
};
