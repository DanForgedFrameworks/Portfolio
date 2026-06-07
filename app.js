/* Forged Frameworks portfolio — interactions */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(max-width: 900px)').matches || window.matchMedia('(pointer: coarse)').matches;

  /* Safety net: never let .reveal elements stay invisible if anything below throws. */
  setTimeout(function () {
    var hidden = document.querySelectorAll('.reveal:not(.in)');
    for (var i = 0; i < hidden.length; i++) hidden[i].classList.add('in');
  }, 1400);

  /* Global safety: if a script fails on this device, surface a way to reach a human. */
  (function crashGuard() {
    var shown = false;
    function showHelp() {
      if (shown || !document.body) return; shown = true;
      var bar = document.createElement('div');
      bar.className = 'crash-help';
      bar.setAttribute('role', 'alert');
      bar.innerHTML = '<div class="crash-help__inner">'
        + '<strong>Trouble loading on this device?</strong>'
        + '<span>Some interactive parts may not run on every phone or browser — you can still reach me directly.</span>'
        + '<span class="crash-help__btns">'
        + '<a class="btn btn--primary" href="mailto:dan.boyland@forgedframeworks.co.uk?subject=Portfolio%20enquiry%20(from%20mobile)">Email me</a>'
        + '<a class="btn btn--ghost" href="tel:+447878602772">Call</a>'
        + '<button type="button" class="crash-help__x" aria-label="Dismiss">\u2715</button>'
        + '</span></div>';
      document.body.appendChild(bar);
      var x = bar.querySelector('.crash-help__x');
      if (x) x.addEventListener('click', function () { bar.parentNode && bar.parentNode.removeChild(bar); });
    }
    /* Only real uncaught JS errors / rejections (resource 404s don't bubble here). */
    window.addEventListener('error', function (e) { if (e && e.message) showHelp(); });
    window.addEventListener('unhandledrejection', function () { showHelp(); });
  })();

  /* ---------- Matrix-rain forge texture ---------- */
  (function matrix() {
    try {
    var c = document.getElementById('matrix');
    if (!c) return;
    /* Skip the animated canvas on phones / touch devices — it's a memory &
       battery drain and a frequent cause of mobile Safari tab crashes. */
    if (isTouch) { c.style.display = 'none'; return; }
    var ctx = c.getContext('2d');
    var glyphs = 'FORGEDFRAMEWORKS01<>{}/\\|=+*forging01'.split('');
    var fontSize = 16, cols, drops;
    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cols = Math.floor(c.width / fontSize);
      drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.random() * -50;
    }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      ctx.fillStyle = 'rgba(252,251,249,0.08)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#bc6c3c';
      ctx.font = fontSize + "px 'JetBrains Mono', monospace";
      for (var i = 0; i < drops.length; i++) {
        var t = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(t, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
    }
    if (reduceMotion) { draw(); return; }
    setInterval(draw, 70);
    } catch (e) { /* never let the background animation kill the page */ }
  })();

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Work dropdown ---------- */
  document.querySelectorAll('.nav__dd').forEach(function (dd) {
    var btn = dd.querySelector('.nav__ddbtn');
    if (!btn) return;
    var isDesktop = function () { return window.matchMedia('(min-width: 861px)').matches; };
    function open() { dd.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dd.classList.contains('open') ? close() : open();
    });
    if (isDesktop()) {
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
    }
    dd.querySelectorAll('.nav__menu a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  });

  /* ---------- Pause/play the pipeline GIF (canvas-freeze trick) ---------- */
  (function pipeGif() {
    var gif = document.getElementById('pipeGif');
    var btn = document.querySelector('.pipe-pause');
    if (!gif || !btn) return;
    var liveSrc = gif.getAttribute('src');
    btn.addEventListener('click', function () {
      var playing = btn.getAttribute('data-playing') === 'true';
      if (playing) {
        try {
          var c = document.createElement('canvas');
          c.width = gif.naturalWidth || gif.clientWidth;
          c.height = gif.naturalHeight || gif.clientHeight;
          c.getContext('2d').drawImage(gif, 0, 0, c.width, c.height);
          gif.src = c.toDataURL('image/png');
        } catch (e) { /* if tainted, just leave it */ }
        btn.setAttribute('data-playing', 'false');
        btn.setAttribute('aria-label', 'Play animation');
        btn.textContent = '► Play';
      } else {
        gif.src = liveSrc + (liveSrc.indexOf('?') > -1 ? '&' : '?') + 'r=' + Date.now();
        btn.setAttribute('data-playing', 'true');
        btn.setAttribute('aria-label', 'Pause animation');
        btn.textContent = '❚❚ Pause';
      }
    });
  })();

  /* ---------- In-page block preview modal (avoids new-tab preview-token) ---------- */
  (function blockModal() {
    var modal = document.getElementById('blockModal');
    if (!modal) return;
    var frame = document.getElementById('blockModalFrame');
    var titleEl = document.getElementById('blockModalTitle');
    var newtab = document.getElementById('blockModalNewtab');
    var closeBtn = document.getElementById('blockModalClose');
    function open(src, label, opts) {
      opts = opts || {};
      if (opts.video) {
        frame.removeAttribute('sandbox');
        frame.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
        frame.setAttribute('allowfullscreen', '');
        newtab.href = opts.viewUrl || src;
      } else {
        frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
        frame.removeAttribute('allow');
        frame.removeAttribute('allowfullscreen');
        newtab.href = src;
      }
      frame.src = src;
      titleEl.textContent = label || 'Preview';
      modal.classList.add('open'); document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('open'); frame.src = 'about:blank';
      document.body.style.overflow = '';
    }
    /* Local interactive blocks → sandboxed preview on desktop. On touch we let
       the link open natively in a new tab — the in-page modal is too cramped on
       phones and several blocks render better full-screen. */
    document.querySelectorAll('a[href^="patterns/"]').forEach(function (a) {
      if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
      if (isTouch) return;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        open(a.getAttribute('href'), a.getAttribute('href').split('/').pop());
      });
    });
    /* Show & tell walkthroughs (Google Drive). On touch, open Drive's own /view
       page in a new tab — native player, reliable playback, no cramped modal. */
    document.querySelectorAll('[data-video]').forEach(function (b) {
      b.addEventListener('click', function () {
        var src = b.getAttribute('data-video');
        var viewUrl = src.replace('/preview', '/view');
        if (isTouch) { window.open(viewUrl, '_blank', 'noopener'); return; }
        open(src, b.getAttribute('data-title') || 'Walkthrough', { video: true, viewUrl: viewUrl });
      });
    });
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  })();

  /* ---------- Heavy iframe demos → tap-to-load mini panels ----------
     Booting 6 live iframes + Drive players on first paint is what crashes
     mobile Safari. Convert each to a lightweight "facade": a labelled panel
     with a play button. On touch we load on tap; on desktop we auto-load as
     it scrolls into view, one at a time. */
  (function embedFacades() {
    var embeds = Array.prototype.slice.call(
      document.querySelectorAll('.demo > iframe[src], .video-embed > iframe[src]')
    );
    if (!embeds.length) return;
    var facades = [];
    embeds.forEach(function (f) {
      var src = f.getAttribute('src');
      if (!src) return;
      f.setAttribute('data-src', src);
      f.removeAttribute('src');
      f.style.display = 'none';
      var wrap = f.parentNode;
      var bar = wrap.querySelector ? wrap.querySelector('.demo__title') : null;
      var label = (bar && bar.textContent.trim()) || f.getAttribute('title') || 'Interactive demo';
      var fac = document.createElement('button');
      fac.type = 'button';
      fac.className = 'embed-facade';
      fac.innerHTML = '<span class="embed-facade__play" aria-hidden="true">▶</span>'
        + '<span class="embed-facade__label">Load live demo</span>'
        + '<span class="embed-facade__sub"></span>';
      fac.querySelector('.embed-facade__sub').textContent = label;
      fac.setAttribute('aria-label', 'Load live demo: ' + label);
      function loadIt() {
        if (f.getAttribute('src')) return;
        fac.classList.add('is-loading');
        var lbl = fac.querySelector('.embed-facade__label');
        if (lbl) lbl.textContent = 'Loading…';
        f.src = f.getAttribute('data-src');
        f.style.display = '';
        f.addEventListener('load', function () { if (fac.parentNode) fac.parentNode.removeChild(fac); });
        setTimeout(function () { if (fac.parentNode) fac.parentNode.removeChild(fac); }, 8000);
      }
      fac.addEventListener('click', loadIt);
      wrap.insertBefore(fac, f);
      facades.push({ el: fac, load: loadIt });
    });
    /* Desktop only: auto-load as each scrolls near the viewport. */
    if (!isTouch && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          for (var i = 0; i < facades.length; i++) {
            if (facades[i].el === en.target) { facades[i].load(); break; }
          }
        });
      }, { rootMargin: '250px 0px' });
      facades.forEach(function (o) { io.observe(o.el); });
    }
  })();

  /* ---------- Background-animation toggle (front page) ---------- */
  (function bgToggle() {
    var m = document.getElementById('matrix');
    var btn = document.getElementById('bgToggle');
    if (!m) return;
    var off = localStorage.getItem('ff-bg-off') === '1';
    function apply() {
      m.style.display = off ? 'none' : '';
      if (btn) { btn.textContent = off ? '◍ Background: off' : '◍ Background: on'; btn.setAttribute('aria-pressed', String(off)); }
    }
    apply();
    if (btn) btn.addEventListener('click', function () { off = !off; localStorage.setItem('ff-bg-off', off ? '1' : '0'); apply(); });
  })();

  /* ---------- Secret-page egg smash ---------- */
  (function egg() {
    var el = document.getElementById('egg');
    var opts = document.getElementById('rewardOptions');
    if (!el || !opts) return;
    function crack() {
      if (el.classList.contains('smashed')) return;
      el.classList.add('smashed');
      setTimeout(function () {
        var em = el.querySelector('.egg__emoji'); if (em) em.textContent = '🐣';
        var hint = el.querySelector('.egg__hint'); if (hint) hint.textContent = 'Cracked it — pick your sample:';
        opts.hidden = false;
      }, 430);
    }
    el.addEventListener('click', crack);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); crack(); } });
  })();

  /* ---------- Flip cards ---------- */  document.querySelectorAll('.flip').forEach(function (btn) {
    function flip() {
      var pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
    }
    btn.addEventListener('click', flip);
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = '#' + en.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---------- Forged mark watermark on every section ---------- */
  (function sectionMarks() {
    document.querySelectorAll('main > section:not(.hero)').forEach(function (sec) {
      var span = document.createElement('span');
      span.className = 'sec-mark';
      span.setAttribute('aria-hidden', 'true');
      var im = document.createElement('img');
      im.src = 'assets/forge-mark.png';
      im.alt = '';
      span.appendChild(im);
      sec.appendChild(span);
    });
  })();

  /* ---------- Lucide pictograms ---------- */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  /* ---------- Testimonials river (JS-driven: auto-roll + pause + step) ---------- */
  (function quoteRiver() {
    var river = document.querySelector('.quote-river');
    var track = document.querySelector('.quote-track');
    var controls = document.querySelector('.quote-controls');
    if (!track || !river) return;

    var toggleBtn = controls && controls.querySelector('[data-q="toggle"]');
    var prevBtn = controls && controls.querySelector('[data-q="prev"]');
    var nextBtn = controls && controls.querySelector('[data-q="next"]');

    /* Reduced motion: no auto-roll. Prev/next just scroll natively; hide pause. */
    if (reduceMotion) {
      if (toggleBtn) toggleBtn.style.display = 'none';
      function stepNative(dir) {
        var card = track.querySelector('.quote');
        var gap = parseFloat(getComputedStyle(track).gap) || 20;
        var dist = (card ? card.getBoundingClientRect().width : 340) + gap;
        track.scrollBy({ left: dir * dist, behavior: 'smooth' });
      }
      if (prevBtn) prevBtn.addEventListener('click', function () { stepNative(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { stepNative(1); });
      return;
    }

    /* Clone the set once for a seamless loop. */
    Array.prototype.slice.call(track.children).forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    var x = 0;            /* current offset in px */
    var speed = 0.62;     /* auto-roll px per frame */
    var half = track.scrollWidth / 2;
    var userPaused = false, hovered = false, tweening = false;

    function measure() { half = track.scrollWidth / 2; }
    window.addEventListener('resize', measure);

    function wrap() { if (x >= half) x -= half; if (x < 0) x += half; }
    function paint() { track.style.transform = 'translateX(' + (-x) + 'px)'; }

    function frame() {
      if (!userPaused && !hovered && !tweening) { x += speed; wrap(); paint(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function setPaused(p) {
      userPaused = p;
      if (!toggleBtn) return;
      toggleBtn.setAttribute('aria-pressed', String(p));
      var ico = toggleBtn.querySelector('.qbtn__ico');
      var lbl = toggleBtn.querySelector('.qbtn__lbl');
      if (ico) ico.textContent = p ? '►' : '❚❚';
      if (lbl) lbl.textContent = p ? 'Play' : 'Pause';
    }

    function step(dir) {
      setPaused(true);
      var card = track.querySelector('.quote');
      var gap = parseFloat(getComputedStyle(track).gap) || 20;
      var dist = (card ? card.getBoundingClientRect().width : 340) + gap;
      var start = x, target = x + dir * dist, t0 = null, dur = 480;
      tweening = true;
      function tw(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        x = start + (target - start) * e; wrap(); paint();
        if (p < 1) requestAnimationFrame(tw); else tweening = false;
      }
      requestAnimationFrame(tw);
    }

    river.addEventListener('mouseenter', function () { hovered = true; });
    river.addEventListener('mouseleave', function () { hovered = false; });
    if (toggleBtn) toggleBtn.addEventListener('click', function () { setPaused(!userPaused); });
    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
  })();

  /* ---------- Accurate in-page anchor scrolling ----------
     Lands exactly on the target despite the sticky nav and any lazy-loaded
     media above it that shifts layout after the jump. Re-aims only when the
     target's document position actually moves, so it never fights the in-
     progress smooth scroll. */
  (function anchorScroll() {
    var navEl = document.querySelector('.nav');
    function offset() { return (navEl ? navEl.offsetHeight : 68) + 14; }
    function targetY(el) {
      return Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - offset());
    }
    function jumpTo(el) {
      var smooth = !reduceMotion;
      window.scrollTo({ top: targetY(el), behavior: smooth ? 'smooth' : 'auto' });
      var last = targetY(el), tries = 0;
      var iv = setInterval(function () {
        tries++;
        var now = targetY(el);
        if (Math.abs(now - last) > 2) {     /* layout shifted above the target */
          window.scrollTo({ top: now, behavior: smooth ? 'smooth' : 'auto' });
          last = now;
        }
        if (tries >= 10) clearInterval(iv);
      }, 200);
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) return;
      var el;
      try { el = document.querySelector(href); } catch (_) { el = null; }
      if (!el) return;
      e.preventDefault();
      if (window.history && history.replaceState) history.replaceState(null, '', href);
      jumpTo(el);
    });
    if (location.hash.length > 1) {
      var initEl;
      try { initEl = document.querySelector(location.hash); } catch (_) { initEl = null; }
      if (initEl) setTimeout(function () { jumpTo(initEl); }, 250);
    }
  })();

  /* ---------- Contact actions ----------
     - Phone: on desktop, tel: does nothing useful, so copy the number and
       confirm inline. On touch devices the tel: link dials natively.
     - LinkedIn / map: force a dependable new-window open (some embedded or
       preview contexts swallow target="_blank"). */
  (function contactActions() {
    var list = document.querySelector('.contact-list');
    if (!list) return;

    function copyText(text, done) {
      function fallback() {
        try {
          var ta = document.createElement('textarea');
          ta.value = text; ta.setAttribute('readonly', '');
          ta.style.position = 'fixed'; ta.style.left = '-9999px';
          document.body.appendChild(ta); ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          done(ok);
        } catch (_) { done(false); }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      } else { fallback(); }
    }

    var phoneLi = list.querySelector('[data-phone]');
    if (phoneLi && !isTouch) {
      var link = phoneLi.querySelector('a[href^="tel:"]');
      var note = phoneLi.querySelector('#phoneCopied');
      var pretty = '+44 7878 602772';
      var raw = phoneLi.getAttribute('data-phone');
      var timer;
      if (link) link.addEventListener('click', function (e) {
        e.preventDefault();
        copyText(raw, function (ok) {
          if (!note) return;
          note.textContent = ok ? '\u2713 Copied ' + pretty + ' to clipboard' : 'Could not copy \u2014 dial ' + pretty;
          note.classList.add('show');
          clearTimeout(timer);
          timer = setTimeout(function () { note.classList.remove('show'); }, 4000);
        });
      });
    }

    list.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        e.preventDefault();
        var win = window.open(href, '_blank', 'noopener');
        if (!win) window.location.href = href;   /* popup blocked → same tab */
      });
    });
  })();
})();
