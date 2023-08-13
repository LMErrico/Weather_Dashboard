var citySearchTerm = document.querySelector('#city-search-term');
var displayCity = document.querySelector('#list-city');
var displayTemperature = document.querySelector('#temperature');
var displayWind = document.querySelector('#wind');
var displayHumidity = document.querySelector('#humidity');
var displayDay1Date = document.querySelector('#day1date');
var displayDay1Temperature = document.querySelector('#day1temperature');
var displayDay1Wind = document.querySelector('#day1wind');
var displayDay1Humidity = document.querySelector('#day1humidity');
var displayDay2Date = document.querySelector('#day2date');
var displayDay2Temperature = document.querySelector('#day2temperature');
var displayDay2Wind = document.querySelector('#day2wind');
var displayDay2Humidity = document.querySelector('#day2humidity');
var displayDay3Date = document.querySelector('#day3date');
var displayDay3Temperature = document.querySelector('#day3temperature');
var displayDay3Wind = document.querySelector('#day3wind');
var displayDay3Humidity = document.querySelector('#day3humidity');
var displayDay4Date = document.querySelector('#day4date');
var displayDay4Temperature = document.querySelector('#day4temperature');
var displayDay4Wind = document.querySelector('#day4wind');
var displayDay4Humidity = document.querySelector('#day4humidity');
var displayDay5Date = document.querySelector('#day5date');
var displayDay5Temperature = document.querySelector('#day5temperature');
var displayDay5Wind = document.querySelector('#day5wind');
var displayDay5Humidity = document.querySelector('#day5humidity');
var cityListContainer = document.getElementById('citiescontainer');
var cityName = "";
var sCityValue = "";
var todayFormattedDate = "";
var previousCities = [];
//var previousCities = [{
//  sCity: sCityValue,
//}];
function displaySavedCities() {
  cityListContainer.innerHTML = '';
  // Retrieve existing data from local storage
  const storedData = localStorage.getItem('previousCities');
  // Parse existing data from JSON or initialize an empty array if it doesn't exist
  previousCities = storedData ? JSON.parse(storedData) : [];
  previousCities.forEach(cityObject => {
    const cityItem = document.createElement('div');
    cityItem.classList = 'city-item';
    const cityName = cityObject.sCity;
    const cityLink = document.createElement('a');
    cityLink.setAttribute('href', '#'); // Set the appropriate link or action
    cityLink.textContent = cityName;
    cityItem.appendChild(cityLink);
    cityListContainer.appendChild(cityItem);
  });
}
displaySavedCities();
document.getElementById("search1").addEventListener('click', searchWeather);
cityListContainer.addEventListener('click', function(event) {
    // Check if the clicked element is a city-item
 // if (event.target.classList.contains('city-item')) {
    // Get the text content of the clicked city
    const clickedCityName = event.target.textContent;
    // Perform actions based on the clicked city
    console.log(`Clicked city: ${clickedCityName}`);
    // Update the selected city and perform the weather search
    cityName = clickedCityName;
    citySearchTerm.value  = cityName;
    searchWeather();
//  }
});
function searchWeather() {
    if (citySearchTerm)   {
    var cityValue = citySearchTerm.value.trim();
    sCityValue = cityValue;
    // Add a new item at the end of the array
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('previousCities');
    // Parse existing data from JSON or initialize an empty array if it doesn't exist
    previousCities = storedData ? JSON.parse(storedData) : [];
    // Check if the current city is already in the previousCities array
    const existingCityIndex = previousCities.findIndex(cityObject => cityObject.sCity === sCityValue);
    if (existingCityIndex === -1) {
         // If the city is not already in the array, create a new city object and push it
        previousCities.push({ sCity: sCityValue });
    } else {
        // If the city is already in the array, remove it from its current position
        // and push it to the end to make it the most recent entry
        previousCities.splice(existingCityIndex, 1);
        previousCities.push({ sCity: sCityValue });
}
// Update the local storage with the updated array
localStorage.setItem('previousCities', JSON.stringify(previousCities));
// Display the saved cities
displaySavedCities();
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + '&units=imperial&appid=5a05d454ed62f808c0625b15e2dbd96d';
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        cityName = data.name;
        const weatherList = data.list;
        var i=0;
        var firstDate = data.dt;
        const dtInMilliseconds = firstDate * 1000;
        const newDate = new Date(dtInMilliseconds);
        todayFormattedDate = newDate.toLocaleDateString();
        displayCity.innerHTML = cityName + ' (' + todayFormattedDate + ') ';
        displayTemperature.innerHTML = data.main.temp + 'F';
        displayWind.innerHTML = data.wind.speed + 'MPH';
        displayHumidity.innerHTML = data.main.humidity + '%';
        //Get icon
        const firstIcon = data.weather[0].icon;
        // Create an i element for the weather icon
        const iconElement = document.createElement('i');
        const weatherCode = firstIcon;
        const iconClass = getWeatherIconClass(weatherCode);
        // Set the class attribute for the weather icon
        iconElement.className = iconClass;
        // Append the icon element to the list city element
        displayCity.appendChild(iconElement);
        }
      )}
    });

    apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityValue + '&units=imperial&appid=5a05d454ed62f808c0625b15e2dbd96d';
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        const weatherList = data.list;
        var i=0;
        for (var j = 0; j < 39; j++) {
        var firstDate = weatherList[j].dt;
        const dtInMilliseconds = firstDate * 1000;
        const newDate = new Date(dtInMilliseconds);
        const formattedDate = newDate.toLocaleDateString();
          if (todayFormattedDate !== formattedDate) {
            var i = j;
              j = 40;
            } ;
        }
        var firstDate = weatherList[i].dt;
        var dtInMilliseconds = firstDate * 1000;
        var newDate = new Date(dtInMilliseconds);
        var formattedDate = newDate.toLocaleDateString();
        displayDay1Date.innerHTML =formattedDate;
        displayDay1Temperature.innerHTML = weatherList[i].main.temp + 'F';
        displayDay1Wind.innerHTML = weatherList[i].wind.speed + 'MPH';
        displayDay1Humidity.innerHTML = weatherList[i].main.humidity + '%';
        var day1Icon = weatherList[i].weather[0].icon;
         // Create an i element for the weather icon
         var iconElement = document.createElement('i');
         var weatherCode = day1Icon;
         var iconClass = getWeatherIconClass(weatherCode);
         // Set the class attribute for the weather icon
         iconElement.className = iconClass;
         // Append the icon element to the list city element
         displayDay1Date.appendChild(iconElement);
         //Day2
         i=i+8
         firstDate = weatherList[i].dt;
         dtInMilliseconds = firstDate * 1000;
         newDate = new Date(dtInMilliseconds);
         formattedDate = newDate.toLocaleDateString();
         displayDay2Date.innerHTML =formattedDate;
         displayDay2Temperature.innerHTML = weatherList[i].main.temp + 'F';
         displayDay2Wind.innerHTML = weatherList[i].wind.speed + 'MPH';
         displayDay2Humidity.innerHTML = weatherList[i].main.humidity + '%';
        var day2Icon = weatherList[i].weather[0].icon;
         // Create an i element for the weather icon
         iconElement = document.createElement('i');
         weatherCode = day2Icon;
         iconClass = getWeatherIconClass(weatherCode);
         // Set the class attribute for the weather icon
         iconElement.className = iconClass;
         // Append the icon element to the list city element
         displayDay2Date.appendChild(iconElement);
         //Day3
         i=i+8
         firstDate = weatherList[i].dt;
         dtInMilliseconds = firstDate * 1000;
         newDate = new Date(dtInMilliseconds);
         formattedDate = newDate.toLocaleDateString();
         displayDay3Date.innerHTML =formattedDate;
         displayDay3Temperature.innerHTML = weatherList[i].main.temp + 'F';
         displayDay3Wind.innerHTML = weatherList[i].wind.speed + 'MPH';
         displayDay3Humidity.innerHTML = weatherList[i].main.humidity + '%';
         var day3Icon = weatherList[i].weather[0].icon;
          // Create an i element for the weather icon
          iconElement = document.createElement('i');
          weatherCode = day3Icon;
          iconClass = getWeatherIconClass(weatherCode);
          // Set the class attribute for the weather icon
          iconElement.className = iconClass;
          // Append the icon element to the list city element
          displayDay3Date.appendChild(iconElement);
         //Day4
         i=i+8
         firstDate = weatherList[i].dt;
         dtInMilliseconds = firstDate * 1000;
         newDate = new Date(dtInMilliseconds);
         formattedDate = newDate.toLocaleDateString();
         displayDay4Date.innerHTML =formattedDate;
         displayDay4Temperature.innerHTML = weatherList[i].main.temp + 'F';
         displayDay4Wind.innerHTML = weatherList[i].wind.speed + 'MPH';
         displayDay4Humidity.innerHTML = weatherList[i].main.humidity + '%';
         var day4Icon = weatherList[i].weather[0].icon;
          // Create an i element for the weather icon
          iconElement = document.createElement('i');
          weatherCode = day4Icon;
          iconClass = getWeatherIconClass(weatherCode);
          // Set the class attribute for the weather icon
          iconElement.className = iconClass;
          // Append the icon element to the list city element
          displayDay4Date.appendChild(iconElement);
        //Day5
        i=i+8
        firstDate = weatherList[i].dt;
         dtInMilliseconds = firstDate * 1000;
         newDate = new Date(dtInMilliseconds);
         formattedDate = newDate.toLocaleDateString();
         displayDay5Date.innerHTML =formattedDate;
         displayDay5Temperature.innerHTML = weatherList[i].main.temp + 'F';
         displayDay5Wind.innerHTML = weatherList[i].wind.speed + 'MPH';
         displayDay5Humidity.innerHTML = weatherList[i].main.humidity + '%';
         var day5Icon = weatherList[i].weather[0].icon;
        // Create an i element for the weather icon
         iconElement = document.createElement('i');
         weatherCode = day5Icon;
         iconClass = getWeatherIconClass(weatherCode);
         // Set the class attribute for the weather icon
         iconElement.className = iconClass;
         // Append the icon element to the list city element
         displayDay5Date.appendChild(iconElement);
          }
    )}else {
        alert('Error: Please try again - ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Error, please try again');
    })}};
     function getWeatherIconClass(weatherCode) {
      switch (weatherCode) {
        case "01d":
          return "fas fa-sun"; // Sunny
        case "01n":
            return "fas fa-moon"; // clear night
        case "02d":
          return "fas fa-cloud-sun"; // Partly cloudy
        case "02n":
          return "fas fa-cloud-moon"; // Partly cloudy night
        case "03d":
        case "03n":
          return "fas fa-cloud"; // Cloudy
        case "04d":
        case "04n":
          return "fas fa-cloud"; // Cloudy
        case "09d":
        case "09n":
          return "fas fa-cloud-showers-heavy"; // Showers
        case "10d":
        case "10n":
          return "fas fa-cloud-sun-rain"; // Rain
        case "11d":
        case "11n":
          return "fas fa-bolt"; // Thunderstorm
        case "13d":
        case "13n":
          return "fas fa-snowflake"; // Snow
        case "50d":
        case "50n":
          return "fas fa-smog"; // Mist or fog
        default:
          return "fas fa-question-circle"; // Unknown weather code, use a question mark icon
      }
    }
    /*function getWeatherIconClass(weatherCode) {
      switch (weatherCode) {
            case "01d":
          return "wi wi-day-sunny"; // Sunny
        case "01n":
          return "wi wi-night-clear"; // clear night
        case "02d":
          return "wi wi-day-cloudy"; // Partly cloudy
        case "02n":
          return "wi wi-night-alt-cloudy"; // Partly cloudy night
        case "03d":
        case "03n":
          return "wi wi-cloud"; // Cloudy
        case "04d":
        case "04n":
          return "wi wi-cloudy"; // Cloudy
        case "09d":
        case "09n":
          return "wi wi-showers"; // Showers
        case "10d":
        case "10n":
          return "wi wi-day-rain-mix"; // Rain
        case "11d":
        case "11n":
          return "wi wi-thunderstorm"; // Thunderstorm
        case "13d":
        case "13n":
          return "wi wi-snow"; // Snow
        case "50d":
        case "50n":
          return "wi wi-fog"; // Mist or fog
        default:
          return "wi wi-na"; // Unknown weather code, use a "not available" icon
      }
    }
      */