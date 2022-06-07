// display the current date and time using JavaScript: Tuesday 16:00

let currentDay = new Date();
let currentDate = currentDay.getDate(); // day of the month
let currentTimeHour = currentDay.getHours();
let currentTimeMinute = currentDay.getMinutes();

if (currentTimeMinute < 10) {
	currentTimeMinute = `0${currentTimeMinute}`;
}

let weekDaysCurrent = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let weekDayCurrent = weekDaysCurrent[currentDay.getDay()];

/* let monthsCurrent = [
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
	"December",
];
let monthCurrent = monthsCurrent[currentDay.getMonth()];*/
let messageDate = `${currentTimeHour}:${currentTimeMinute}, ${weekDayCurrent}`;

let outputDate = document.querySelector(".date");
outputDate.innerHTML = messageDate;

let firstDay = document.querySelector("#first-day");
firstDay.innerHTML = weekDaysCurrent[(currentDay.getDay() + 1) % 7];

let secondDay = document.querySelector("#second-day");
secondDay.innerHTML = weekDaysCurrent[(currentDay.getDay() + 2) % 7];

let thirdDay = document.querySelector("#third-day");
thirdDay.innerHTML = weekDaysCurrent[(currentDay.getDay() + 3) % 7];

let fourthDay = document.querySelector("#fourth-day");
fourthDay.innerHTML = weekDaysCurrent[(currentDay.getDay() + 4) % 7];

let fifthDay = document.querySelector("#fifth-day");
fifthDay.innerHTML = weekDaysCurrent[(currentDay.getDay() + 5) % 7];

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page and weather
function displayWeatherCondition(response) {
	console.log(response.data);
	document.querySelector(
		"#city"
	).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
	document.querySelector("#today-temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#sky").innerHTML =
		response.data.weather[0].description;
	document.querySelector("#wind").innerHTML = `wind: ${Math.round(
		response.data.wind.speed
	)}km/h`;

	document.querySelector(
		"#humidity"
	).innerHTML = `humidity: ${response.data.main.humidity}%`;
}

// функція для пошуку по назві міста, викликається для дефолтного міста при запуску та після пошуку
function search(city) {
	let apiKey = "15b17c39bc6708ab7518942a1ffb9aca";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

//отримує назву міста, що введена в пошуку, та викликає функцію пошуку за назвою
function searchEngine(event) {
	event.preventDefault();
	let city = document.querySelector("#inputCityName").value;
	search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

search("Kyiv"); // запускаємо функцію search для дефолтного міста

// показуємо погоду для поточного розташування
function showPositionWeather(position) {
	let apiKey = "15b17c39bc6708ab7518942a1ffb9aca";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

// отримуємо поточне розташування за натисканням кнопки та передаємо розташування у функцію showPositionWeather
function getCurrentLocation(event) {
	event.preventDefault;
	navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let currentLocationPin = document.querySelector("#current-location");
currentLocationPin.addEventListener("click", getCurrentLocation);

// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
/*
function toFahrenheit() {
	let temperatureString = document.querySelector("#today-temperature");
	let temperature = Number(temperatureString) * 1.8 + 32;
	temperatureString.innerHTML = `${temperature}`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelsius() {
	let temperatureString = document.querySelector("#today-temperature");
	let temperature = (Number(temperatureString) - 32) / 1.8;
	temperatureString.innerHTML = `${temperature}`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);
*/
