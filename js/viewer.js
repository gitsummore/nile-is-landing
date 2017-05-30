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
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Megabytes (MB)'
        }
      }]
    },
    "hover": {
      "animationDuration": 0
    }, "animation": {
      "duration": 1,
      "onComplete": function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index].toFixed(2);
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    legend: {
      "display": false
    },
    tooltips: {
      "enabled": false
    }
  }
});

let uploaded = 0;
let downloaded = 0;
let test = true;
let up;

window.setInterval(() => {
  let currTotals = viewer.returnTotals();

  uploaded += toMB(currTotals.uploaded / 4);

  downloaded += toMB(currTotals.downloaded / 4);
  // console.log('currTotals', currTotals);
  data.datasets[0].data[0] = downloaded;
  data.datasets[1].data[0] = uploaded;

  myBarChart.update();
}, 2000)



// convert bytes to Mega Bytes
function toMB(num) {
  return num / 1000000
}