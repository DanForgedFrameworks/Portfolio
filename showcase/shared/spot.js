document.querySelectorAll('.carousel').forEach(function (c) {
  var track = c.querySelector('.track');
  var vp = c.querySelector('.viewport');
  var slides = Array.prototype.slice.call(c.querySelectorAll('.slide'));
  var dotsBox = c.querySelector('.dots');
  var count = c.querySelector('.count');
  var live = c.querySelector('[aria-live]');
  var prev = c.querySelector('.prev');
  var next = c.querySelector('.next');
  var i = 0;

  slides.forEach(function (s) {
    var n = 0;
    s.querySelectorAll('.card > *:not(.eyebrow):not(ul), .card > ul > li').forEach(function (p) {
      p.classList.add('rv');
      p.style.setProperty('--i', n++);
    });
  });

  var dots = slides.map(function (s, n) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot';
    d.setAttribute('aria-label', 'Go to card ' + (n + 1) + ' of ' + slides.length);
    d.addEventListener('click', function () { go(n); });
    dotsBox.appendChild(d);
    return d;
  });

  function fit() { vp.style.height = slides[i].offsetHeight + 'px'; }

  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    track.style.transform = 'translateX(' + (-100 * i) + '%)';
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
      s.inert = !on;
    });
    dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    fit();
    count.textContent = 'Card ' + (i + 1) + ' of ' + slides.length;
    live.textContent = slides[i].getAttribute('aria-label');
    prev.setAttribute('aria-disabled', i === 0 ? 'true' : 'false');
    next.setAttribute('aria-disabled', i === slides.length - 1 ? 'true' : 'false');
  }

  prev.addEventListener('click', function () { go(i - 1); });
  next.addEventListener('click', function () { go(i + 1); });
  c.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { go(i + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { go(i - 1); e.preventDefault(); }
  });

  var x0 = null;
  vp.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  go(0);
  live.textContent = '';
  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
});
