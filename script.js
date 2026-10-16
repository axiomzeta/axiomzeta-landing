// Starfield canvas — slow cosmic drift, complimentary to the E.L.L.I.A. palette
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    seed();
  }

  function seed() {
    const count = Math.min(220, Math.floor((w * h) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      // periwinkle, gold, or soft white — the E.L.L.I.A. palette
      c: Math.random() < 0.12 ? '255,212,121'
        : Math.random() < 0.45 ? '124,140,255'
        : '232,235,255',
      a: Math.random() * 0.55 + 0.15,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      tw: Math.random() * Math.PI * 2,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.x += s.vx; s.y += s.vy; s.tw += 0.01;
      if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
      const alpha = s.a * (0.7 + 0.3 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.c},${alpha.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
})();

// Scroll reveal
(function () {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-group').forEach((el) => io.observe(el));
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
