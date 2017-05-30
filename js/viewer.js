const viewer = new Viewer('video');

document.getElementById('player1').setAttribute("class", "embed-responsive-item")
document.getElementById('player2').setAttribute("class", "embed-responsive-item")
document.getElementById('player3').setAttribute("class", "embed-responsive-item")

document.getElementById('video').firstChild.setAttribute("class", "embed-responsive embed-responsive-16by9")

// Add chart to visualize data recieved
var ctx = document.getElementById("myChart");


let data = {
  labels: ["Bandwidth"],
  datasets: [{
    label: 'downloaded',
    data: [0],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [
      'rgba(255, 206, 86, 1)',
    ],
    borderWidth: 1
  }, {
    label: 'uploaded',
    data: [0],
    backgroundColor: [
      'rgba(0, 162, 235, 0.2)'
    ],
    borderColor: [
      'rgba(75, 192, 192, 1)'
    ],
    borderWidth: 1
  }]
}

var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    scales: {
      yAxes: [{
        // type: 'logarithmic',
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Megabytes (MB)'
        }
      }]
    }
  }
});

let uploaded = 0;
let downloaded = 0;

window.setInterval(() => {
  let currTotals = viewer.returnTotals();

  uploaded += prettyBytes(currTotals.uploaded / 4);

  downloaded += prettyBytes(currTotals.downloaded / 4);
  // console.log('currTotals', currTotals);
  data.datasets[0].data[0] = downloaded;
  data.datasets[1].data[0] = uploaded;

  myBarChart.update();
}, 2000)



// convert bytes to Mega Bytes
function prettyBytes(num) {
  return num / 1000000
}