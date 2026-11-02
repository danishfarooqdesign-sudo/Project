// Twinkling star field shared by every page
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = Array.from({ length: Math.floor(innerWidth * innerHeight / 9000) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    t: Math.random() * Math.PI * 2,
    s: Math.random() * 0.02 + 0.005
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const st of stars) {
    st.t += st.s;
    ctx.globalAlpha = 0.3 + Math.abs(Math.sin(st.t)) * 0.7;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

addEventListener("resize", resize);
resize();
draw();
