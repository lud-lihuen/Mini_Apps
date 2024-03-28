// Función para formatear la fecha
function getFormattedDate(date) {
  let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('es-UY', options);
}

// Función para actualizar la hora y fecha según la ciudad seleccionada
function updateTime() {
  let selectedCity = document.getElementById('cities').value;
  let currentTime = new Date();

  if (selectedCity === 'Wellington') {
    currentTime.setHours(currentTime.getHours() + 15);
  } else if (selectedCity === 'Sevilla') {
    currentTime.setHours(currentTime.getHours() + 5);
  }

  let cityTime = currentTime.toLocaleTimeString('es-UY');
  let cityDate = getFormattedDate(currentTime);

  let cityInfo = `En ${selectedCity} son las ${cityTime} horas del día ${cityDate}`;
  document.getElementById('current-time').textContent = cityInfo;
}

// Cuando carga el contenido de la página
document.addEventListener('DOMContentLoaded', function () {

  // Obtener fecha y hora actual en Montevideo
  let currentTime = new Date();
  let montevideoTime = currentTime.toLocaleTimeString('es-UY');
  let montevideoDate = getFormattedDate(currentTime);

  // Mostrar hora y fecha actual de Montevideo
  let montevideoInfo = `En Montevideo son las ${montevideoTime} horas del día ${montevideoDate}`;
  document.getElementById('current-time').textContent = montevideoInfo;

  // Actualizar hora y fecha cada segundo
  setInterval(updateTime, 1000);
});