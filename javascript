const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
const fruit = new Fruit();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw(ctx);
    drawScore();
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Puntuación: ' + score, 10, 30);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (fruit.isClicked(mouseX, mouseY)) {
        score++;
        fruit.reset();
    }
});

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
