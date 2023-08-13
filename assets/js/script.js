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

function displaySavedCities() {
  cityListContainer.innerHTML = '';
  
  const storedData = localStorage.getItem('previousCities');
  
  previousCities = storedData ? JSON.parse(storedData) : [];
  previousCities.forEach(cityObject => {
    const cityItem = document.createElement('div');
    cityItem.classList = 'city-item';
    const cityName = cityObject.sCity;
    const cityLink = document.createElement('a');
    cityLink.setAttribute('href', '#'); 
    cityLink.textContent = cityName;
    cityItem.appendChild(cityLink);
    cityListContainer.appendChild(cityItem);
  });
}
displaySavedCities();
document.getElementById("search1").addEventListener('click', searchWeather);
cityListContainer.addEventListener('click', function(event) {
    
    const clickedCityName = event.target.textContent;
    
    console.log(`Clicked city: ${clickedCityName}`);
    
    cityName = clickedCityName;
    citySearchTerm.value  = cityName;
    searchWeather();

});
function searchWeather() {
    if (citySearchTerm)   {
    var cityValue = citySearchTerm.value.trim();
    sCityValue = cityValue;
    
    const storedData = localStorage.getItem('previousCities');
    
    previousCities = storedData ? JSON.parse(storedData) : [];
    
    const existingCityIndex = previousCities.findIndex(cityObject => cityObject.sCity === sCityValue);
    if (existingCityIndex === -1) {
         
        previousCities.push({ sCity: sCityValue });
    } else {
        
        previousCities.splice(existingCityIndex, 1);
        previousCities.push({ sCity: sCityValue });
}

localStorage.setItem('previousCities', JSON.stringify(previousCities));

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
        
        const firstIcon = data.weather[0].icon;
       
        const iconElement = document.createElement('i');
        const weatherCode = firstIcon;
        const iconClass = getWeatherIconClass(weatherCode);
        
        iconElement.className = iconClass;
        
        displayCity.appendChild(iconElement);
        }
      )}
    });

    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityValue + '&units=imperial&appid=5a05d454ed62f808c0625b15e2dbd96d';
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
        var iconElement = document.createElement('i');
        var weatherCode = day1Icon;
        var iconClass = getWeatherIconClass(weatherCode);
         
         iconElement.className = iconClass;
         
         displayDay1Date.appendChild(iconElement);
         
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
         
         iconElement = document.createElement('i');
         weatherCode = day2Icon;
         iconClass = getWeatherIconClass(weatherCode);
         
         iconElement.className = iconClass;
         
         displayDay2Date.appendChild(iconElement);
         
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
          
          iconElement = document.createElement('i');
          weatherCode = day3Icon;
          iconClass = getWeatherIconClass(weatherCode);
          
          iconElement.className = iconClass;
          
          displayDay3Date.appendChild(iconElement);
         
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
          
          iconElement = document.createElement('i');
          weatherCode = day4Icon;
          iconClass = getWeatherIconClass(weatherCode);
          
          iconElement.className = iconClass;
         
          displayDay4Date.appendChild(iconElement);
       
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
      
         iconElement = document.createElement('i');
         weatherCode = day5Icon;
         iconClass = getWeatherIconClass(weatherCode);
         
         iconElement.className = iconClass;
         
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
          return "fas fa-question-circle"; 
      }
    }
    