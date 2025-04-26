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
            return response.json()
        })
        .then(data => {
            displayWeather(data);
            fetchPost();
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const cityName = data.name;
    const country = data.sys.country;
    

    const flagUrl = `https://flagsapi.com/${country}/flat/64.png`;
    weatherResult.innerHTML = `
    <h2>
        ${cityName}, ${country}
        <img src="${flagUrl}" alt="Flag of ${country}" style="width: 40px; vertical-align: middle;">
    </h2>

    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}</p>

    <div id="PostResult" class="post-resut">
    <h3>Sample Posts</h3>
        <ul id="postList"></ul>
    </div>
    `;
  
}
function fetchPost() {
    const postUrl = "https://jsonplaceholder.typicode.com/posts?_limit=2";
    fetch(postUrl)
    .then (response => response.json())
    .then(posts => {
        const postsList = document.getElementById("postList");

        posts.forEach((post) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${post.title} </strong> <br> ${post.body}`;
            postsList.appendChild(li);
        });
    })
    .catch(error => {
        const PostResult = document.getElementById("PostResult");
        PostResult.innerHTML = `<p>Failed to load post ${error.message}</p>`
    })
}