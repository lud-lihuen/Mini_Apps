const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
  emptySquare: 0,
  snakeSquare: 1,
  foodSquare: 2
};
const directions = {
  ArrowUp: -10,
  ArrowDown: 10,
  ArrowRight: 1,
  ArrowLeft: -1,
};

let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

// Función para pintar los distintos cuadrados del tablero
const drawSquare = (square, type) => {
  const [row, column] = square.split('');
  boardSquares[row][column] = squareTypes[type];
  const squareElement = document.getElementById(square);
  squareElement.setAttribute('class', `square ${type}`);

  if (type === 'emptySquare') {
    emptySquares.push(square);
  } else {
    if (emptySquares.indexOf(square) !== -1) {
      emptySquares.splice(emptySquares.indexOf(square), 1);
    }
  }
}

// Función para dibujar la viborita
const drawSnake = () => {
  snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

// Función para dibujar una comida en lugar aleatorio
const createRandomFood = () => {
  const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
  drawSquare(randomEmptySquare, 'foodSquare');
}

// Función para mover la viborita
const moveSnake = () => {
  const newSquare = String(
    Number(snake[snake.length - 1]) + directions[direction])
    .padStart(2, '0');
  const [row, column] = newSquare.split('');

  if (newSquare < 0 ||
    newSquare > boardSize * boardSize ||
    (direction === 'ArrowRight' && column == 0) ||
    (direction === 'ArrowLeft' && column == 9 ||
      boardSquares[row][column] === squareTypes.snakeSquare)) {
    gameOver();
  } else {
    snake.push(newSquare);
    if (boardSquares[row][column] === squareTypes.foodSquare) {
      addFood();
    } else {
      const emptySquare = snake.shift();
      drawSquare(emptySquare, 'emptySquare');
    }
    drawSnake();
  }
}

// Función para actualizar puntaje
const updateScore = () => {
  scoreBoard.innerText = score - 4;
}

// Función para cuando la viborita come
const addFood = () => {
  score++;
  updateScore();
  createRandomFood();
}

// Función para terminar el juego al perder
const gameOver = () => {
  gameOverSign.style.display = 'block';
  clearInterval(moveInterval)
  startButton.disabled = false;
}

// Función para cambiar de dirección de movimiento
const setDirection = newDirection => {
  direction = newDirection;
}

// Función para controlar el movimiento con las teclas de flecha
const directionEvent = key => {
  switch (key.code) {
    case 'ArrowUp':
      direction != 'ArrowDown' && setDirection(key.code)
      break;
    case 'ArrowDown':
      direction != 'ArrowUp' && setDirection(key.code)
      break;
    case 'ArrowLeft':
      direction != 'ArrowRight' && setDirection(key.code)
      break;
    case 'ArrowRight':
      direction != 'ArrowLeft' && setDirection(key.code)
      break;
  }
}

// Función para crear el tablero de juego
const createBoard = () => {
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnndex) => {
      const squareValue = `${rowIndex}${columnndex}`;
      const squareElement = document.createElement('div');
      squareElement.setAttribute('class', 'square emptySquare');
      squareElement.setAttribute('id', squareValue);
      board.appendChild(squareElement);
      emptySquares.push(squareValue);
    })
  })
}

// Función para preparar el tablero para iniciar el juego
const setGame = () => {
  snake = ['00', '01', '02', '03'];
  score = snake.length;
  direction = 'ArrowRight';
  boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
  board.innerHTML = '';
  emptySquares = [];
  createBoard();
}

// Función para iniciar el juego
const startGame = () => {
  setGame();
  gameOverSign.style.display = 'none';
  startButton.disabled = true;
  drawSnake();
  updateScore();
  createRandomFood();
  document.addEventListener('keydown', directionEvent);
  moveInterval = setInterval(() => moveSnake(), gameSpeed);
}

// Evento del botón para comenzar nuevo juego
startButton.addEventListener('click', startGame);