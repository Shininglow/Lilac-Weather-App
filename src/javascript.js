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
  let windElement = document.querySelector("#windspeed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  document.querySelector("#cityinput").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  windElement.innerHTML = Math.round(response.data.wind.speed);

  descriptionElement.innerHTML = response.data.weather[0].description;
}



let submit = document.querySelector("#searchbutton");
submit.addEventListener("click", searchHandle);

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = ` + 66 `;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = ` + 19 `;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

//

searchCity("Sydney");

