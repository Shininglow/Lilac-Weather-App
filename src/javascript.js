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


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function populateforecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#additional-forecast");
  let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index <6) {
  forecastHTML = forecastHTML + `
    <div class="col-2">
      <div>
        <div class="additional-days">${formatDay(forecastDay.dt)}</div>
          <img
              src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt="Clear"
              width="70"
              id="icon"
              class="float-left"
            />
        </div>
      <div class="additional-temperature">
            <span class="temp-max">${Math.round(forecastDay.temp.max)}</span>° <span class="temp-min">${Math.round(forecastDay.temp.min)}</span>°
      </div>
    </div>`
  }
})
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

function getForecast (coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let secondApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(secondApiUrl).then (populateforecast);
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

  getForecast(response.data.coord);
}

let submit = document.querySelector("#searchbutton");
submit.addEventListener("click", searchHandle);

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//

//
searchCity("Tokyo");