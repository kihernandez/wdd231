
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("LastModified").textContent = "Last Modified: " + document.lastModified;


const weatherApiKey = 'be5bee6e1eaa8f1d3dbfc9da51563537';
const city = 'Houston,us';


async function fetchWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const currentTemp = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const humidity = data.main.humidity;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        document.querySelector('.weather .current-temp').textContent = `${currentTemp.toFixed(1)}°F`;
        document.querySelector('.weather .weather-description').textContent = weatherDescription;
        document.querySelector('.weather .weather-icon').src = iconUrl;
        document.querySelector('.weather .weather-icon').alt = weatherDescription;
        document.querySelector('.weather .temp-high-low').textContent = `High: ${tempMax.toFixed(1)}°F / Low: ${tempMin.toFixed(1)}°F`;
        document.querySelector('.weather .humidity').textContent = `Humidity: ${humidity}%`;
        document.querySelector('.weather .sunrise').textContent = `Sunrise: ${sunrise}`;
        document.querySelector('.weather .sunset').textContent = `Sunset: ${sunset}`;

        fetchForecastData();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


async function fetchForecastData() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const forecastMap = new Map();
        const todayDate = new Date().toDateString();

        data.list.forEach(item => {
            const itemDate = new Date(item.dt * 1000);
            const dateStr = itemDate.toDateString();
            const hour = itemDate.getHours();

            
            
            if (dateStr !== todayDate && hour >= 11 && hour <= 14 && !forecastMap.has(dateStr)) {
                forecastMap.set(dateStr, item);
            }

        });

        const forecastContainer = document.querySelector('.forecast .forecast-items');
        forecastContainer.innerHTML = '';

        let count = 0;
        for (const [date, item] of forecastMap.entries()) {
            if (count >= 3) break;

            const temp = item.main.temp;
            const description = item.weather[0].description;
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <h3>${new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
                <img src="${iconUrl}" alt="${description}" width="50" height="50">
                <p>${temp.toFixed(1)}°F</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(forecastCard);
            count++;
        }
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}


async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const eligibleMembers = members.filter(member =>
            member.membership_level === 2 || member.membership_level === 3
        );

        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffled.slice(0, 3);

        const spotlightContainer = document.querySelector('.spotlight .spotlight-items');
        spotlightContainer.innerHTML = '';

        spotlightMembers.forEach(member => {
            const spotlightCard = document.createElement('div');
            spotlightCard.className = 'spotlight-card';
            spotlightCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" class="spotlight-logo">
                <div class="spotlight-info">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membership_level}</p>
                </div>
            `;
            spotlightContainer.appendChild(spotlightCard);
        });
    } catch (error) {
        console.error("Error loading members:", error);
    }
}


function setupBurgerMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    loadMembers();
    setupBurgerMenu();
});

