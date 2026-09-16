/* ============================================================
   Forged Frameworks — shared behaviour for index.html and
   accreditation-quality.html.

   The page is complete without this file: every section is visible,
   the terminal shows a finished run. This script only adds motion,
   and only while motion is allowed:
     - prefers-reduced-motion is not set, and
     - the Motion switch is on (localStorage 'ff-bg-off', owned by
       FFBackground in transition.js, announced via 'ff-bg-change').

   Page options come from <body data-rain-glyphs data-rain-heat
   data-rain-links>.
   ============================================================ */
(function () {
  'use strict';

  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function bgOff() { try { return localStorage.getItem('ff-bg-off') === '1'; } catch (e) { return false; } }
  function allowed() { return !reduce.matches && !bgOff(); }

  /* ---------- Return to where you were ----------
     Leaving the main site for the CV or the accreditation page records the
     scroll position. Coming back by a plain link to index.html (the accreditation
     page's "← Learning design" / brand / footer links, or the CV's back button,
     which sets 'ff-to-gateway') restores it. A link with a #section still wins.
     Runs before the reveals prime, so they measure from the restored position. */
  var RETURN_KEY = 'ff-return';
  var isSite = !!document.getElementById('forgeLine');
  function store(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function drop(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  if (isSite) {
    var wantsReturn = read('ff-return-go') === '1' || read('ff-to-gateway') === '1';
    drop('ff-return-go'); drop('ff-to-gateway');
    var saved = null;
    try { saved = JSON.parse(read(RETURN_KEY) || 'null'); } catch (e) {}
    if (wantsReturn && saved && !location.hash && Date.now() - saved.t < 2 * 60 * 60 * 1000) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      var restore = function () { window.scrollTo({ top: saved.y, left: 0, behavior: 'instant' }); };
      restore();
      /* Fonts and late images can shift the page; land again once, unless the visitor has already moved */
      var moved = false;
      addEventListener('wheel', function () { moved = true; }, { once: true, passive: true });
      addEventListener('touchstart', function () { moved = true; }, { once: true, passive: true });
      addEventListener('keydown', function () { moved = true; }, { once: true });
      addEventListener('load', function () { if (!moved) restore(); });
    }
  }

  /* ---------- Matrix rain ---------- */
  var rain = (function () {
    var c = document.getElementById('matrix');
    if (!c) return { start: function () {}, stop: function () {} };
    var ctx = c.getContext('2d');
    var chars = (body.getAttribute('data-rain-glyphs') || 'FORGEDFRAMEWORKS01∆◊#&=><[]{}|~').split('');
    var heatColour = body.getAttribute('data-rain-heat') || '#a05b32';
    var fs = 15, cols = 0, drops = [], heat = [], px = -1, lastMove = 0, raf = 0, acc = 0, prev = 0;

    function resize() {
      c.width = innerWidth; c.height = innerHeight;
      cols = Math.floor(c.width / fs);
      drops = Array.from({ length: cols }, function () { return Math.random() * c.height / fs; });
      heat = new Array(cols).fill(0);
    }
    function onMove(e) {
      var now = performance.now();
      if (now - lastMove < 32) return;
      lastMove = now; px = e.clientX;
    }
    function draw(t) {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return;
      acc += t - prev; prev = t;
      if (acc < 64) return;
      acc = 0;
      ctx.fillStyle = 'rgba(252,251,249,0.09)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = fs + 'px "JetBrains Mono", monospace';
      var hc = px < 0 ? -1 : Math.floor(px / fs);
      for (var i = 0; i < cols; i++) {
        if (hc >= 0) { var d = Math.abs(i - hc); heat[i] = Math.max(heat[i] * 0.94, d < 6 ? 1 - d / 6 : 0); }
        else heat[i] *= 0.94;
        ctx.fillStyle = heat[i] > 0.05 ? heatColour : '#bc6c3c';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, drops[i] * fs);
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4 + heat[i] * 1.6;
      }
    }
    return {
      start: function () {
        if (raf) return;
        if ('ontouchstart' in window && innerWidth < 768) { c.style.display = 'none'; return; }
        c.style.display = '';
        resize();
        addEventListener('resize', resize);
        addEventListener('pointermove', onMove);
        prev = performance.now();
        raf = requestAnimationFrame(draw);
      },
      stop: function () {
        cancelAnimationFrame(raf); raf = 0;
        removeEventListener('resize', resize);
        removeEventListener('pointermove', onMove);
        ctx.clearRect(0, 0, c.width, c.height);
      }
    };
  })();

  /* ---------- Live forge terminal (index only, beside the Catalyst stages) ---------- */
  var terminal = (function () {
    var log = document.getElementById('termLog');
    var dataEl = document.getElementById('forgeScript');
    if (!log || !dataEl) return { start: function () {}, stop: function () {} };
    var script = JSON.parse(dataEl.textContent);
    var steps = Array.prototype.slice.call(document.querySelectorAll('#tracker li'));
    /* The five stage cards beside the terminal; script stages 1..6 map onto them (6, final resources, is still Publish) */
    var cards = Array.prototype.slice.call(document.querySelectorAll('#catalyst .step[data-stage]'));
    var CARD_FOR_STAGE = [-1, 0, 1, 2, 3, 4, 4, -1];
    var status = document.getElementById('termStatus');
    var caret = log.querySelector('.term__caret');
    var finished = log.innerHTML;
    var timer = 0, i = 0;

    function setStep(step, done) {
      steps.forEach(function (li, n) {
        var isDone = n < step || done, active = n === step && !done;
        li.classList.toggle('is-done', isDone);
        li.classList.toggle('is-active', active);
        li.querySelector('.tracker__dot').textContent = isDone ? '✔' : String(n);
      });
      cards.forEach(function (c, n) { c.classList.toggle('is-forging', !done && CARD_FOR_STAGE[step] === n); });
      status.classList.toggle('is-done', !!done);
      status.classList.toggle('is-busy', !done && step > 0);
      status.textContent = done ? 'Forge complete' : step === 0 ? 'Idle' : 'Forging documents…';
    }
    function addLine(l) {
      var div = document.createElement('div');
      div.className = 'l l--' + l.k;
      div.textContent = l.t;
      log.insertBefore(div, caret);
      var lines = log.querySelectorAll('.l');
      for (var n = 0; n < lines.length - 14; n++) lines[n].remove();
    }
    function clear() { log.querySelectorAll('.l').forEach(function (n) { n.remove(); }); }
    function tick() {
      var l = script[i];
      addLine(l);
      setStep(l.s, l.s === 7);
      i++;
      if (i >= script.length) {
        i = 0;
        timer = setTimeout(function () { clear(); setStep(0, false); tick(); }, l.d);
        return;
      }
      timer = setTimeout(tick, l.d);
    }
    return {
      start: function () {
        if (timer) return;
        clear(); i = 0; tick();
      },
      stop: function () {
        clearTimeout(timer); timer = 0;
        log.innerHTML = finished;
        caret = log.querySelector('.term__caret');
        setStep(7, true);
      }
    };
  })();

  /* ---------- Scroll reveals ----------
     Only elements below the fold are hidden, and only by this script,
     so a slow or blocked script can never leave content invisible. */
  var reveals = (function () {
    var io = null, sweepT = 0, primed = [];
    function show(el, delay) {
      el.style.transition = 'opacity 0.7s ease ' + delay + 'ms, transform 0.7s cubic-bezier(0.22,0.61,0.36,1) ' + delay + 'ms';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
    function hide(el, y) {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(' + y + ')';
      primed.push(el);
    }
    function release(el) {
      if (el.__words) el.__words.forEach(function (w, n) { show(w, n * 60); });
      else show(el, 0);
      el.__pending = false;
    }
    function below(el) { return el.getBoundingClientRect().top > innerHeight * 0.9; }
    function sweep() {
      document.querySelectorAll('[data-reveal],h1,h2').forEach(function (el) {
        if (el.__pending && el.getBoundingClientRect().top <= innerHeight * 0.92) { if (io) io.unobserve(el); release(el); }
      });
    }
    function onScroll() { clearTimeout(sweepT); sweepT = setTimeout(sweep, 80); }
    return {
      start: function () {
        if (io || document.hidden) return;
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            io.unobserve(en.target);
            release(en.target);
          });
        }, { rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll('h1,h2').forEach(function (h) {
          var words = Array.prototype.slice.call(h.querySelectorAll('.w'));
          if (!words.length || !below(h)) return;
          words.forEach(function (w) { hide(w, '60%'); });
          h.__words = words; h.__pending = true;
          io.observe(h);
        });
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
          if (!below(el)) return;
          hide(el, '24px');
          el.__pending = true;
          io.observe(el);
        });
        void document.body.offsetHeight;
        addEventListener('scroll', onScroll, { passive: true });
      },
      stop: function () {
        if (io) { io.disconnect(); io = null; }
        removeEventListener('scroll', onScroll);
        primed.forEach(function (el) { el.style.transition = ''; el.style.opacity = ''; el.style.transform = ''; el.__pending = false; });
        primed = [];
      }
    };
  })();

  /* ---------- Stage / role highlight ---------- */
  var lights = (function () {
    var io = null;
    return {
      start: function () {
        if (io) return;
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { en.target.classList.toggle('is-lit', en.isIntersecting); });
        }, { rootMargin: '-40% 0px -40% 0px' });
        document.querySelectorAll('[data-stage]').forEach(function (el) { io.observe(el); });
      },
      stop: function () {
        if (io) { io.disconnect(); io = null; }
        document.querySelectorAll('[data-stage].is-lit').forEach(function (el) { el.classList.remove('is-lit'); });
      }
    };
  })();

  /* ---------- Forge line (index only) ----------
     Primes the line to its start state, then runs it once the section is a
     third of the way into view: the line draws, and each document drops in
     as the line reaches it (delays come from each item's --d). */
  var forgeLine = (function () {
    var ol = document.getElementById('forgeLine');
    if (!ol) return { start: function () {}, stop: function () {} };
    var io = null;
    return {
      start: function () {
        if (io || ol.classList.contains('is-run') || ol.classList.contains('is-ran')) return;
        ol.classList.add('is-primed');
        void ol.offsetHeight;
        io = new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          io.disconnect(); io = null;
          ol.classList.add('is-run');
          ol.classList.remove('is-primed');
          /* Once finished, drop the staggered transitions so card hover is instant again */
          setTimeout(function () { ol.classList.remove('is-run'); ol.classList.add('is-ran'); }, 2600);
        }, { threshold: 0.35 });
        io.observe(ol);
      },
      stop: function () {
        if (io) { io.disconnect(); io = null; }
        ol.classList.remove('is-primed');
      }
    };
  })();

  /* ---------- Silver rain page transitions ----------
     Pour: silver glyph rain fills a dark overlay. Rain-off: no new drops
     start at the top; every column already falling carries on at its own
     slightly different pace with a gentle pull, its trail fading behind it,
     so the screen empties column by column the way rain stops. When the last
     trail has faded the next page loads and fades in from that dark
     (transition.js reads 'ff-rain-in', forge.css plays the fade). Hard cap so
     a throttled tab still navigates. Mirrored in adaptable-cv assets/back-link.html. */
  var POUR_MS = 750, CAP_MS = 4200;
  function rainOut(done) {
    var ov = document.createElement('div');
    ov.setAttribute('aria-hidden', 'true');
    ov.setAttribute('data-ff-rain', '');
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#1a1a1a;';
    var cvs = document.createElement('canvas');
    ov.appendChild(cvs);
    document.body.appendChild(ov);
    var ctx = cvs.getContext('2d'), fs = 16;
    var w = cvs.width = innerWidth, h = cvs.height = innerHeight;
    var chars = 'FORGEDFRAMEWORKS01∆◊#&=><[]{}|~'.split('');
    var cols = Math.floor(w / fs);
    var drops = Array.from({ length: cols }, function () { return Math.random() * h / fs; });
    var speeds = drops.map(function () { return 0.65; });
    var raf = 0, stopping = false, clearAt = 0, finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      try { sessionStorage.setItem('ff-rain-in', '1'); } catch (e) {}
      done();
    }
    function frame(t) {
      /* Trails fade a touch faster once the rain is stopping, so the screen truly clears */
      ctx.fillStyle = stopping ? 'rgba(26,26,26,0.12)' : 'rgba(26,26,26,0.09)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = fs + 'px "JetBrains Mono", monospace';
      var falling = 0;
      for (var i = 0; i < cols; i++) {
        if (drops[i] * fs > h + fs) {
          if (!stopping && Math.random() > 0.975) drops[i] = 0;
          else continue;
        }
        falling++;
        ctx.fillStyle = Math.random() > 0.4 ? '#cccccc' : '#ffffff';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, drops[i] * fs);
        if (stopping) speeds[i] = Math.min(speeds[i] + 0.0065, 1.25);
        drops[i] += speeds[i];
      }
      if (stopping && falling === 0) {
        /* Canvas trails never fade to exactly black, so fade the rain layer itself to leave a clean dark ground */
        if (!clearAt) { clearAt = t + 420; cvs.style.transition = 'opacity 0.4s ease'; cvs.style.opacity = '0'; }
        else if (t >= clearAt) { finish(); return; }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    setTimeout(function () {
      stopping = true;
      /* Each column keeps its own pace, so they leave at different moments */
      speeds = speeds.map(function () { return 0.42 + Math.random() * 0.33; });
    }, POUR_MS);
    setTimeout(finish, CAP_MS);
  }

  var linkPattern = body.getAttribute('data-rain-links');
  if (linkPattern) {
    var re = new RegExp(linkPattern);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (!re.test(href) || a.target === '_blank') return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (isSite) store(RETURN_KEY, JSON.stringify({ y: Math.round(window.scrollY), t: Date.now() }));
      else if (/(^|\/)index\.html$/.test(href)) store('ff-return-go', '1');
      if (!allowed()) return;
      e.preventDefault();
      rainOut(function () { location.href = href; });
    });
    /* Returning via the back button restores this page from cache with the overlay still up */
    addEventListener('pageshow', function (e) {
      if (e.persisted) document.querySelectorAll('[data-ff-rain]').forEach(function (n) { n.remove(); });
    });
  }

  /* ---------- Motion on / off ---------- */
  var running = false;
  function apply() {
    var go = allowed();
    if (go === running) return;
    running = go;
    [rain, terminal, reveals, lights, forgeLine].forEach(function (m) { go ? m.start() : m.stop(); });
  }
  function boot() {
    if (document.hidden) {
      var once = function () { if (!document.hidden) { document.removeEventListener('visibilitychange', once); apply(); } };
      document.addEventListener('visibilitychange', once);
      return;
    }
    apply();
  }
  addEventListener('ff-bg-change', apply);
  if (reduce.addEventListener) reduce.addEventListener('change', apply);
  boot();
})();
