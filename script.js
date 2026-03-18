const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const size = 20;
const rows = 20;
const cols = 20;

canvas.width = cols * size;
canvas.height = rows * size;

let maze = [];
let player = { x: 0, y: 0 };
let goal = { x: cols - 1, y: rows - 1 };
let score = 0;
let time = 0;

// Timer
setInterval(() => {
time++;
document.getElementById("time").textContent = time;
}, 1000);

// Generate maze (ensures path exists)
function generateMaze() {
maze = [];

for (let y = 0; y < rows; y++) {
let row = [];
for (let x = 0; x < cols; x++) {
row.push(Math.random() < 0.25 ? 1 : 0); // walls
}
maze.push(row);
}

// Ensure start & goal are open
maze[0][0] = 0;
maze[goal.y][goal.x] = 0;
}

// Draw everything
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw maze
for (let y = 0; y < rows; y++) {
for (let x = 0; x < cols; x++) {
if (maze[y][x] === 1) {
ctx.fillStyle = "#00ffcc";
ctx.fillRect(x * size, y * size, size, size);
}
}
}

// Draw goal
ctx.fillStyle = "red";
ctx.fillRect(goal.x * size, goal.y * size, size, size);

// Draw player
ctx.fillStyle = "yellow";
ctx.fillRect(player.x * size, player.y * size, size, size);
}

// Movement
document.addEventListener("keydown", (e) => {
let nx = player.x;
let ny = player.y;

if (e.key === "ArrowUp") ny--;
else if (e.key === "ArrowDown") ny++;
else if (e.key === "ArrowLeft") nx--;
else if (e.key === "ArrowRight") nx++;
else return;

// Check boundaries + walls
if (
nx >= 0 &&
ny >= 0 &&
nx < cols &&
ny < rows &&
maze[ny][nx] === 0
) {
player.x = nx;
player.y = ny;
}

// Psychological twist (rare maze shift)
if (Math.random() < 0.08) {
generateMaze();
}

// Win condition
if (player.x === goal.x && player.y === goal.y) {
score++;
document.getElementById("score").textContent = score;

```
player = { x: 0, y: 0 };
generateMaze();
```

}

draw();
});

// Start game
generateMaze();
draw();
