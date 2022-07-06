// Task 1
let now = new Date();
function showDate() {
  let minutes = (`0` + now.getMinutes()).slice(-2);
  let hours = now.getHours();
  let dayNum = now.getDate();
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = monthName[now.getMonth()];
  let secondHeading = document.querySelector("#dates");
  secondHeading.innerHTML = `${month}, ${dayNum}`;

  let timer = document.querySelector("#timer");
  timer.innerHTML = `${hours}:${minutes}`;

  let firstDay = document.querySelector("#firstday");
  let firstDate = dayNum + 1;
  firstDay.innerHTML = `${month}, ${firstDate}`;

  let secondDay = document.querySelector("#secondday");
  let secondDate = firstDate + 1;
  secondDay.innerHTML = `${month}, ${secondDate}`;

  let thirdDay = document.querySelector("#thirdday");
  let thirdDate = secondDate + 1;
  thirdDay.innerHTML = `${month}, ${thirdDate}`;

  let fourthDay = document.querySelector("#fourthday");
  let fourthDate = thirdDate + 1;
  fourthDay.innerHTML = `${month}, ${fourthDate}`;

  let fifthDay = document.querySelector("#fifthday");
  let fifthDate = fourthDate + 1;
  fifthDay.innerHTML = `${month}, ${fifthDate}`;
}

showDate();

//

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchHandle(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#cityfield");
  let city = cityinput.value;
  searchCity(city);
}

function showWeather(response) {
  document.querySelector("#cityinput").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
}

let submit = document.querySelector("#searchbutton");
submit.addEventListener("click", searchHandle);

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sydney");
