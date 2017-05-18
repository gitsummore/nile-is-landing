const broadcaster = new Broadcaster(8000, 'video', 'play', 'stop');

document.getElementById('broadcaster').setAttribute("class", "embed-responsive-item")

// send message to server that disconnecting
window.onbeforeunload = function (event) {
  // create get request to tell about disconnect
  const req = new XMLHttpRequest();
  req.open('GET', '/broadcaster-disconnect', false);
  req.send();
};
