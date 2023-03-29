const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Shape {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function randomColor() {
  return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
}

function glitchEffect() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const shift = Math.floor(Math.random() * 10) - 5;
    data[i] = data[i + shift] || data[i];
    data[i + 1] = data[i + 1 + shift] || data[i + 1];
    data[i + 2] = data[i + 2 + shift] || data[i + 2];
  }

  ctx.putImageData(imageData, 0, 0);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = new Shape(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * 50,
    randomColor()
  );

  shape.draw();
  glitchEffect();
  setTimeout(() => requestAnimationFrame(animate), 333); // Add delay here (500ms)

}

animate();
