document.addEventListener('DOMContentLoaded', function () {

  // Función para obtener los datos del clima desde la API
  function getWeather(location) {
    let apiKey = '86490bffd4b84419909233839230507';
    let apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + location;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener el clima: ' + response.status);
        }
      })
      .then(function (data) {
        displayWeather(data);
      })
      .catch(function (error) {
        console.log('Error al obtener el clima:', error);
      });
  }

  // Función para mostrar los datos del clima en el HTML
  function displayWeather(data) {
    let weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '';

    let location = data.location.name + ', ' + data.location.country;
    let temperature = data.current.temp_c;
    let condition = data.current.condition.text;

    weatherResult.innerHTML += '<h3>Clima en ' + location + '</h3>';
    weatherResult.innerHTML += '<p>Temperatura: ' + temperature + '°C<br>Condición: ' + condition + '</p>';

    weatherResult.style.display = 'block';
  }

  // Evento del submit ver clima
  document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let location = document.getElementById('locationInput').value;
    getWeather(location);
  });
});