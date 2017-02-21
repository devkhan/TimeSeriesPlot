var drawButton = document.getElementById("draw-button");
var urlInput = document.getElementById("url-input");
var chartContainer = document.getElementById("chart");
var bar = document.getElementById("bar");

bar.style.visibility = "hidden";

function drawChart() {
  drawButton.disabled = true;
  urlInput.disabled = true;
  bar.style.visibility = "visible";

  if (urlInput.value == "") {
    alert("Invalid URL");
    drawButton.disabled = false;
    urlInput.disabled = false;
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlInput.value, true);
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      // Success!
      var data = JSON.parse(xhr.responseText);
      var list = data["list"];
      var param1List = list.map(function (item, index) {
        return item["param1"];
      });
      var param2List = list.map(function (item, index) {
        return item["param2"];
      });
      var dateTimeList = list.map(function (item, index) {
        return (new Date(item["datetime"]));
      });
      console.log(list);
      console.log(param1List);
      console.log(param2List);
      console.log(dateTimeList);

      var chart = c3.generate({
        data: {
          x: 'timestamp',
          columns: [
            ['timestamp'].concat(dateTimeList),
            ['param1'].concat(param1List),
            ['param2'].concat(param2List)
          ]
        },
        axis: {
          x: {
            type: 'timeseries'
          },
          tickFormat: '%Y-%m-%d %h:%m:%s'
        }
      });

    } else {
      console.log("Unable to fetch data.");
    }
    drawButton.disabled = false;
    urlInput.disabled = false;
    bar.style.visibility = "hidden";
  };

  xhr.send();
}

drawButton.addEventListener("click", drawChart);