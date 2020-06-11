function enableCopy() {
  const spanArray = document.querySelectorAll("span");
  spanArray.forEach(function (span) {
    span.onclick = function () {
      document.execCommand("copy");
    };
    span.addEventListener("copy", function (event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", span.textContent);
        displayTooltip(span.textContent);
        // console.log(event.clipboardData.getData("text"));
      }
    });
  });
}
function displayTooltip(text) {
  var x = document.getElementById("tooltip");
  x.innerHTML = `Coppied Text: ${text}`;
  x.style.position = "absolute";
  // x.innerHTML = ``;
  // x.style.display = "none";
}
// get emoji_1 from api
// https://jsonblob.com/c906edc3-a271-11ea-baec-f9684ababada
// https://jsonblob.com/api/jsonBlob/c906edc3-a271-11ea-baec-f9684ababada

// get emoji_2 from api
// https://jsonblob.com/da8b77c7-a1bf-11ea-9d9c-3d7cac6148e5
// https://jsonblob.com/api/jsonBlob/da8b77c7-a1bf-11ea-9d9c-3d7cac6148e5

// get emoji_3 from api
// https://jsonblob.com/8cb419ad-a9fb-11ea-a88a-ef8eae575a9b
// https://jsonblob.com/api/jsonBlob/8cb419ad-a9fb-11ea-a88a-ef8eae575a9b

function Get(apiUrl) {
  let Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", apiUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}
let emoji_1 = JSON.parse(
  Get("https://jsonblob.com/api/jsonBlob/c906edc3-a271-11ea-baec-f9684ababada")
);
let emoji_2 = JSON.parse(
  Get("https://jsonblob.com/api/jsonBlob/da8b77c7-a1bf-11ea-9d9c-3d7cac6148e5")
);
let emoji_3 = JSON.parse(
  Get("https://jsonblob.com/api/jsonBlob/8cb419ad-a9fb-11ea-a88a-ef8eae575a9b")
);

function loadJSON2(json) {
  var ele_bread = document.getElementById("emoji-bread");
  while (ele_bread.firstChild) ele_bread.removeChild(ele_bread.firstChild);
  let frag = document
    .createRange()
    .createContextualFragment(
      `<li><select id="emoji-0" onchange="onchangeJSON2_0()"></select></li><li><select id="emoji-1" onchange="onchangeJSON2_1()"></select></li>`
    );
  ele_bread.appendChild(frag);
  var select1 = document.getElementById("emoji-0");
  var options1 = Object.keys(json);
  select1.options.length = 0;
  for (let i = 0; i < options1.length; i++) {
    let opt = options1[i];
    let el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select1.add(el);
  }
  onchangeJSON2_0(json);
}
function onchangeJSON2_0(json = emoji_2) {
  var sel_0 = document.getElementById("emoji-0");
  var opt_0 = sel_0.options[sel_0.selectedIndex].text;
  var select = document.getElementById("emoji-1");
  var options = Object.keys(json[opt_0]);
  select.options.length = 0;
  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.add(el);
  }
  onchangeJSON2_1();
}
function onchangeJSON2_1(json = emoji_2) {
  var sel_0 = document.getElementById("emoji-0");
  var opt_0 = sel_0.options[sel_0.selectedIndex].text;
  var sel_1 = document.getElementById("emoji-1");
  var opt_1 = sel_1.options[sel_1.selectedIndex].text;
  loadEmoji(json[opt_0][opt_1]);
}
function loadJSON1(json) {
  var ele_bread = document.getElementById("emoji-bread");
  while (ele_bread.firstChild) ele_bread.removeChild(ele_bread.firstChild);
  let frag = document
    .createRange()
    .createContextualFragment(
      `<li><select id="emoji-0" onchange="onchangeJSON1_0()"></select></li>`
    );
  ele_bread.appendChild(frag);
  var select1 = document.getElementById("emoji-0");
  var options1 = Object.keys(json);
  select1.options.length = 0;
  for (let i = 0; i < options1.length; i++) {
    let opt = options1[i];
    let el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select1.add(el);
  }
  onchangeJSON1_0();
}
function onchangeJSON1_0(json = emoji_1) {
  var sel_0 = document.getElementById("emoji-0");
  var opt_0 = sel_0.options[sel_0.selectedIndex].text;
  loadEmoji(json[opt_0]);
}
function loadEmoji(listOfEmoji) {
  var ele_entries = document.getElementById("container");
  while (ele_entries.firstChild)
    ele_entries.removeChild(ele_entries.firstChild);

  listOfEmoji.forEach(function (data, i) {
    let frag = document
      .createRange()
      .createContextualFragment(`<span>${data}</span>`);
    ele_entries.appendChild(frag);
  });
  enableCopy();
}
function loadJSON3(json) {
  var searchText = document.getElementById("emoji-search").value;
  var newJson = getObjects(json, "", searchText);
  var listOfEmoji = [];
  if (searchText == "") {
    newJson = newJson.splice(0, newJson.length / 10);
  }
  newJson.forEach((i) => {
    listOfEmoji.push(i.char);
  });
  loadEmoji(listOfEmoji);
}
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if ((i == key && obj[i].includes(val)) || (i == key && val == "")) {
      objects.push(obj);
    } else if (obj[i].includes(val) && key == "") {
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}
function chooseJSON(num) {
  switch (num) {
    case 1:
      document.getElementById("emoji-bread").classList.remove("hide");
      document.getElementById("emoji-search").classList.add("hide");
      loadJSON1(emoji_1);
      break;
    case 2:
      document.getElementById("emoji-bread").classList.remove("hide");
      document.getElementById("emoji-search").classList.add("hide");
      loadJSON2(emoji_2);
      break;
    case 3:
      document.getElementById("emoji-bread").classList.add("hide");
      document.getElementById("emoji-search").classList.remove("hide");
      loadJSON3(emoji_3);
      break;
    default:
      console.log("how bro :O");
  }
}

chooseJSON(3);
