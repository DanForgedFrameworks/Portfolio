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
