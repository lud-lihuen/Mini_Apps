const resultElement = document.getElementById('result');
let currentResult = '';

// Escribir en pantalla
function appendNumber(number) {
  currentResult += number;
  resultElement.value = currentResult;
}

// Borrar último caracter en pantalla
function deleteLast() {
  currentResult = currentResult.slice(0, -1);
  resultElement.value = currentResult;
}

// Borrar pantalla
function clearResult() {
  currentResult = '';
  resultElement.value = '';
}

// Calcular resultado
function calculate() {
  try {
    const result = eval(currentResult);
    currentResult = result.toString();
    resultElement.value = currentResult;
  } catch (error) {
    currentResult = '';
    resultElement.value = 'Error';
  }
}