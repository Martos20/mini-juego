const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 400, y: 500, width: 50, height: 50 };
let fruits = [];
let score = 0;
let gameOver = false;

// Genera una fruta en una posición aleatoria
function spawnFruit() {
    const x = Math.random() * (canvas.width - 30);
    fruits.push({ x: x, y: 0, width: 30, height: 30 });
}

// Dibuja el jugador
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Dibuja las frutas
function drawFruits() {
    ctx.fillStyle = 'red';
    fruits.forEach(fruit => {
        ctx.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
    });
}

// Actualiza la posición de las frutas
function updateFruits() {
    fruits.forEach(fruit => {
        fruit.y += 2; // Velocidad de caída
    });
    fruits = fruits.filter(fruit => fruit.y < canvas.height); // Elimina frutas que salieron del canvas
}

// Colisión entre el jugador y las frutas
function checkCollision() {
    fruits.forEach((fruit, index) => {
        if (fruit.x < player.x + player.width &&
            fruit.x + fruit.width > player.x &&
            fruit.y < player.y + player.height &&
            fruit.y + fruit.height > player.y) {
            score++;
            fruits.splice(index, 1); // Elimina la fruta recogida
        }
    });
}

// Actualiza el juego
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawFruits();
    updateFruits();
    checkCollision();

    if (!gameOver) {
        requestAnimationFrame(update);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Juego Terminado! Puntuación: ' + score, 100, canvas.height / 2);
    }
}

// Mueve al jugador con las teclas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= 20;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += 20;
    }
});

// Inicia el juego
setInterval(spawnFruit, 1000); // Genera una fruta cada segundo
update();
