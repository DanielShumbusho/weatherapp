const apiKey = "96492335f110fa363ceacecc77c713f0";


const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (city === ''){
        weatherResult.innerHTML = `<p> Please enter a city name.</p>`;
    }
    getWeatherResult(city);
})

function getWeatherResult(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    weatherResult.innerHTML = `<p>Loading...</p>`;

    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("City not found");
            }
            response.json()
        })
        .then(data => {
            displayWeather(data);
            fetchPost();
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}