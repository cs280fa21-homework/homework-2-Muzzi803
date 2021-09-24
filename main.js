import "./style.css";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const img = new Image(50, 50);
img.src = "./assets/tank.png";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
  window.requestAnimationFrame(draw);
}

draw();
