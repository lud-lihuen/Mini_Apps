const inputs = document.querySelectorAll('.entrada, .salida');
const totalElementos = document.querySelectorAll('.horas');
const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

// Inicializar variables para guardar y cargar datos
let horasEntradaGuardadas = {};
let horasSalidaGuardadas = {};
if (localStorage.getItem('horasEntradaGuardadas')) {
  horasEntradaGuardadas = JSON.parse(localStorage.getItem('horasEntradaGuardadas'));
}
if (localStorage.getItem('horasSalidaGuardadas')) {
  horasSalidaGuardadas = JSON.parse(localStorage.getItem('horasSalidaGuardadas'));
}

// Función para calcular las horas trabajadas en un día
function calcularHorasDia(entrada, salida) {
  let horaEntrada = new Date(`2000-01-01T${entrada}`);
  let horaSalida = new Date(`2000-01-01T${salida}`);
  let diferencia = Math.abs(horaSalida - horaEntrada);
  let horasDia = new Date(diferencia).toISOString().substr(11, 5);
  return horasDia;
}

// Función para actualizar los totales
function actualizarTotales() {
  let totalHoras = 0;

  diasSemana.forEach(dia => {
    let entrada = document.querySelector(`.entrada.${dia}`).value;
    let salida = document.querySelector(`.salida.${dia}`).value;
    let totalElemento = document.querySelector(`.horas.${dia}`);

    if (entrada && salida) {
      let horasTrabajadas = calcularHorasDia(entrada, salida);
      totalElemento.textContent = horasTrabajadas;
      totalHoras += Number(horasTrabajadas.substr(0, 2)) * 60 + Number(horasTrabajadas.substr(3, 2));
    } else {
      totalElemento.textContent = '00:00';
    }
  });

  let horas = Math.floor(totalHoras / 60);
  let minutos = totalHoras % 60;
  document.getElementById('total').textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// Función para guardar datos ingresados en local storage
function guardar() {
  inputs.forEach(input => {
    if (input.classList.contains('entrada')) {
      horasEntradaGuardadas[input.classList[1]] = input.value;
    } else if (input.classList.contains('salida')) {
      horasSalidaGuardadas[input.classList[1]] = input.value;
    }
  });
  localStorage.setItem('horasEntradaGuardadas', JSON.stringify(horasEntradaGuardadas));
  localStorage.setItem('horasSalidaGuardadas', JSON.stringify(horasSalidaGuardadas));
}

// Función para cargar datos guardados en local storage
function cargar() {
  if (horasEntradaGuardadas || horasSalidaGuardadas) {
    inputs.forEach(input => {
      if (input.classList.contains('entrada') && horasEntradaGuardadas[input.classList[1]]) {
        input.value = horasEntradaGuardadas[input.classList[1]];
      } else if (input.classList.contains('salida') && horasSalidaGuardadas[input.classList[1]]) {
        input.value = horasSalidaGuardadas[input.classList[1]];
      }
    });
    actualizarTotales();
  }
}

// Función para reiniciar contadores a cero y borrar datos almacenados
function reiniciar() {
  inputs.forEach(input => {
    input.value = '';
  });
  totalElementos.forEach(elemento => {
    elemento.textContent = '00:00';
  });
  document.getElementById('total').textContent = '00:00';
  localStorage.clear();
}

document.addEventListener('DOMContentLoaded', function () {
  // Evento para cambios en los inputs
  document.querySelectorAll('.entrada, .salida').forEach(input => {
    input.addEventListener('change', actualizarTotales);
  });
  // Evento para botón guardar
  document.getElementById('guardar').addEventListener('click', guardar);
  // Evento para botón cargar
  document.getElementById('cargar').addEventListener('click', cargar);
  // Evento para botón reiniciar
  document.getElementById('reiniciar').addEventListener('click', reiniciar);
});
