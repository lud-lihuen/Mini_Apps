let currentResult = '';
const resultElement = document.getElementById('result');

function appendNumber(number) {
  currentResult += number;
  resultElement.value = currentResult;
}

function clearResult() {
  currentResult = '';
  resultElement.value = '';
}

function deleteLast() {
  currentResult = currentResult.slice(0, -1);
  resultElement.value = currentResult;
}

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