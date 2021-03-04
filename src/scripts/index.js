const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.querySelector(".main");
const form = document.querySelector(".form");
const search = document.querySelector(".search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;



async function getWeatherByLocation(city) {

  const resp = await fetch(url(city), { origin: "cors" });
  try {
    const respData = await resp.json();
    addWeatherToPage(respData);
  }
  catch (err) {
    err = new Error();
    main.innerHTML = `
      <small>City not found</small>
    `;
    console.log(err + ' City not found');
  }
}


function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");

  weather.classList.add("weather");

  if (!temp) {
    main.innerHTML = `
      <small>City not found</small>
    `;
  }

  weather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>

  `;

  main.innerHTML = '';

  main.appendChild(weather);
}


function KtoC(k) {
  return Math.floor(k - 273.15);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }


})
