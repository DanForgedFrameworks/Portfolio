/* ============================================================
   Forged Frameworks — shared portal transition trigger.

   Single source of truth for the "pick a portfolio" feeling.
   The rain/word-cleanse now plays on the DESTINATION page (an
   overlay that starts opaque and dissolves to reveal the page
   underneath — exactly like the gateway's own entry rain), so
   navigation is one continuous reveal instead of a hard cut.

   This trigger just records which world we're heading to and
   navigates; the destination page reads `ff-portal-dest` before
   first paint and plays its incoming reveal:
     - 'ld'  -> #ld-intro  on the Learning Design page
     - 'iso' -> #iso-intro on the Accreditation & Quality page

   Usage:  FFTransition.fire('ld', 'index.html')
           FFTransition.fire('iso', 'accreditation-quality.html')

   prefers-reduced-motion: navigates immediately, no overlay.
   ============================================================ */
(function () {
  'use strict';

  function fire(type, dest) {
    try {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sessionStorage.setItem('ff-portal-dest', type);
      }
    } catch (e) { /* sessionStorage unavailable — navigate plainly */ }
    window.location.href = dest;
  }

  window.FFTransition = { fire: fire };
}());

/* ============================================================
   Forged Frameworks — shared background-animation preference.

   One setting, three pages. Each page draws its own #matrix
   forge-rain from its own script (app.js on the learning-design
   page, inline copies on the gateway and the accreditation page),
   and they historically disagreed about whether to run on mobile.
   This module owns the on/off state so there is ONE answer:

     - stamps `ff-bg-off` on <html> so CSS can hide every canvas
       regardless of which script drew it;
     - fires a window 'ff-bg-change' event so each drawer can stop
       or restart its own loop — hiding alone would leave the
       interval burning battery, which defeats the point;
     - binds any control marked [data-bg-toggle], so the same
       setting can be driven from the burger drawer on one page
       and a floating button on another;
     - persists to localStorage 'ff-bg-off' (the key app.js's older
       toggle already used, so an existing preference carries over).

   Loaded by all three pages. Drawers must NOT depend on this file
   having run — they read the stored key directly at start-up and
   only rely on the event for live changes, so load order is free.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'ff-bg-off';
  var root = document.documentElement;
  var off = false;

  try { off = localStorage.getItem(KEY) === '1'; } catch (e) { /* private mode — default on */ }

  function paint() {
    if (off) root.classList.add(KEY); else root.classList.remove(KEY);
    var btns = document.querySelectorAll('[data-bg-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = off ? '◍ Background: off' : '◍ Background: on';
      btns[i].setAttribute('aria-pressed', String(off));
    }
  }

  function set(next) {
    off = !!next;
    try { localStorage.setItem(KEY, off ? '1' : '0'); } catch (e) { /* ignore */ }
    paint();
    try {
      window.dispatchEvent(new CustomEvent('ff-bg-change', { detail: { off: off } }));
    } catch (e) {
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('ff-bg-change', false, false, { off: off });
      window.dispatchEvent(ev);
    }
  }

  paint();
  document.addEventListener('DOMContentLoaded', paint);

  /* Delegated, so controls added later (or on other pages) just work. */
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document) {
      if (el.hasAttribute && el.hasAttribute('data-bg-toggle')) { e.preventDefault(); set(!off); return; }
      el = el.parentNode;
    }
  });

  window.FFBackground = {
    isOff: function () { return off; },
    set: set,
    toggle: function () { set(!off); }
  };
}());
