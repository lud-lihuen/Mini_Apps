const maxWords = document.getElementById('maxWords');
const textInput = document.getElementById('textInput');
const wordCountIndicator = document.getElementById('wordCountIndicator');
const loadButton = document.getElementById('loadButton');
const saveButton = document.getElementById('saveButton');

let wordCount = 0; // Inicializo wordCount
let lastValue = maxWords.value; // Guardo el último valor válido introducido en el máximo de palabras

// Función contador de palabras
function updateWordCount() {
  let text = textInput.value.trim();
  let words = text.split(/\s+/);
  wordCount = words.length;
  let remainingWords = Math.max(maxWords.value - wordCount, 0);

  if (textInput.value) {
    wordCountIndicator.textContent = `Palabras escritas: ${wordCount} / ${maxWords.value} - Palabras restantes: ${remainingWords}`;
  } else {
    wordCountIndicator.textContent = `Palabras escritas: 0 / ${maxWords.value}`;
  }

  // Mostrar texto en rojo al superar el máximo de palabras
  textInput.classList.toggle('red', wordCount > maxWords.value);
  wordCountIndicator.classList.toggle('red', wordCount > maxWords.value);

  // Limitar el texto al máximo de palabras
  if (wordCount > maxWords.value) {
    this.value = words.slice(0, maxWords.value).join(' ');
  }
}

// Función para guardar el texto en el local storage
function saveToLocalStorage() {
  let text = textInput.value.trim();
  if (text) {
    localStorage.setItem('microrrelato', text);
    alert('Texto guardado en almacenamiento local del navegador.');
  }
}

// Función para cargar el texto desde el local storage
function loadFromLocalStorage() {
  let savedText = localStorage.getItem('microrrelato');
  if (savedText) {
    textInput.value = savedText;
    updateWordCount(); // Actualiza el contador de palabras
    alert('Texto cargado desde el almacenamiento local del navegador.');
  } else {
    alert('No hay texto guardado en el almacenamiento local del navegador.');
  }
}

// Evento input del máximo de palabras
maxWords.addEventListener('input', function () {
  updateWordCount();
});

// Evento blur del máximo de palabras
maxWords.addEventListener('blur', function () {
  if (maxWords.value >= 1 && wordCount <= maxWords.value) {
    lastValue = maxWords.value; // Actualizo el último valor válido introducido en el máximo de palabras
  }
  else {
    maxWords.value = lastValue; // Restauro el último valor válido introducido
  }
  updateWordCount();
});

// Evento input del área de texto
textInput.addEventListener('input', updateWordCount);

// Evento click para guardar el texto
saveButton.addEventListener('click', saveToLocalStorage);

// Evento click para cargar el texto
loadButton.addEventListener('click', loadFromLocalStorage);