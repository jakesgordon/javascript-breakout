let painting = false;
document.body.addEventListener("mousedown", event => {
  if (event.target.className === "pixel") {
    painting = true;
    paint(event.target);
  }
});
document.body.addEventListener("mouseup", event => {
  painting = false;
});
document.body.addEventListener("mouseover", event => {
  if (painting && event.target.className === "pixel") {
    paint(event.target);
  }
});
function paint(pixel) {
  let brush = document.querySelector('input[name="brush"]:checked');
  let color = brush ? brush.value : "";
  let index = Math.floor(
    Array.prototype.indexOf.call(
      brush.parentNode.parentNode.childNodes,
      brush.parentNode
    ) / 2
  );
  pixel.style.backgroundColor = color;
  pixel.dataset.brush = index;
  updateTemplates();
}
function updateTemplates() {
  // Height - 22 cells
  let data = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  let columns = document.querySelectorAll("#calendar > ul > li");
  Array.prototype.forEach.call(columns, (col, x) => {
    let cells = col.querySelectorAll(".pixel");
    Array.prototype.forEach.call(cells, (cell, y) => {
      let brush = cell.dataset.brush || 0;
      data[y][x] = brush;
    });
  });
  updateGitHubBoard(data);
  updateGitfiti(data);
}
function updateGitHubBoard(data) {
  document.getElementById("github-board").value =
    data.map(row => '"' + row.join("")).join('",\n') + '"]';
}
function updateGitfiti(data) {
  let stringData = "[" + data.map(row => row.join()).join("],[") + "]";
  let arrayData = JSON.parse("[" + stringData + "]");
  convertDataArray(arrayData);
}
function convertDataArray(dataArray) {
  let finalArray = dataArray;
  let prevLetter = "";
  let currentLetter = "";

  for (x = 0; x < dataArray.length; x++) {
    let row = dataArray[x];
    for (y = 0; y < row.length; y++) {
      currentLetter = convertNumberToLetter(dataArray[x][y]);
      if (currentLetter == prevLetter)
        if (currentLetter == currentLetter.toUpperCase())
          currentLetter = currentLetter.toLowerCase();
        else currentLetter = currentLetter.toUpperCase();
      finalArray[x][y] = currentLetter;
      prevLetter = currentLetter;
    }
  }
  document.getElementById("gitfiti").value = convertArrayToPretty(finalArray);
}
function convertArrayToPretty(array) {
  let tempString = "\"";
  for (x = 0; x < array.length; x++) {
    let row = array[x];
    for (y = 0; y < row.length; y++) {
      tempString += array[x][y];
    }
    if (x+1 < array.length)
      tempString += "\",\n\"";
    else
      tempString += "\""
  }
  return tempString;
}
function convertNumberToLetter(number) {
  switch (number) {
    case 0:
      return " ";
      break;
    case 1:
      return "a";
      break;
    case 2:
      return "b";
      break;
    case 3:
      return "c";
      break;
    case 4:
      return "d";
      break;
    case 5:
      return "e";
      break;
    case 6:
      return "f";
      break;
    case 7:
      return "g";
      break;
    case 8:
      return "h";
      break;
    case 9:
      return "i";
      break;
    case 10:
      return "j";
      break;
    case 11:
      return "k";
      break;
    case 12:
      return "l";
      break;
    case 13:
      return "m";
      break;
    case 14:
      return "n";
      break;
    case 15:
      return "o";
      break;
    case 16:
      return "p";
      break;
    case 17:
      return "q";
      break;
    case 18:
      return "r";
      break;
    case 19:
      return "s";
      break;
    case 20:
      return "t";
      break;
    case 21:
      return "u";
      break;
    case 22:
      return "v";
      break;
    case 23:
      return "w";
      break;
    case 24:
      return "x";
      break;
    case 25:
      return "y";
      break;
    case 26:
      return "z";
      break;
    default:
      return " ";
  }
}
