document.addEventListener('DOMContentLoaded', function () {
  // Obtiene la fecha y hora actual en Montevideo
  var currentTime = new Date();
  var montevideoTime = currentTime.toLocaleTimeString('es-UY');
  var montevideoDate = getFormattedDate(currentTime);

  // Muestra la hora y fecha actual de Montevideo
  var montevideoInfo = `En Montevideo son las ${montevideoTime} horas del día ${montevideoDate}`;
  document.getElementById('current-time').textContent = montevideoInfo;

  // Actualiza la hora y fecha cada segundo
  setInterval(updateTime, 1000);
});

// Actualiza la hora y fecha según la ciudad seleccionada
function updateTime() {
  var selectedCity = document.getElementById('cities').value;
  var currentTime = new Date();

  if (selectedCity === 'Wellington') {
    currentTime.setHours(currentTime.getHours() + 15);
  } else if (selectedCity === 'Sevilla') {
    currentTime.setHours(currentTime.getHours() + 5);
  }

  var cityTime = currentTime.toLocaleTimeString('es-UY');
  var cityDate = getFormattedDate(currentTime);

  var cityInfo = `En ${selectedCity} son las ${cityTime} horas del día ${cityDate}`;
  document.getElementById('current-time').textContent = cityInfo;
}

// Función auxiliar para formatear la fecha en el formato deseado
function getFormattedDate(date) {
  var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('es-UY', options);
}  