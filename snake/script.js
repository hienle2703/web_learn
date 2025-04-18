const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
const totalCells = gridSize * gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let score = 0;
let gameLoop;

for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
}

const cells = grid.children;

const draw = () => {
    for (let i = 0; i < totalCells; i++) {
        cells[i].className = '';
    }

    snake.forEach(segment => {
        const index = segment.y * gridSize + segment.x;
        cells[index].classList.add('snake');
    });

    const foodIndex = food.y * gridSize + food.x;
    cells[foodIndex].classList.add('food');
};

const generateFood = () => {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
};

const moveSnake = () => {
    const head = { ...snake[0] };

    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        gameOver();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();    
    }

    draw();
};

const gameOver = () => {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    location.reload();
};

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

const startGame = () => {
    draw();
    gameLoop = setInterval(moveSnake, 100);
};

startGame();