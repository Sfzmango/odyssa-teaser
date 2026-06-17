/* ============================================================
   ODYSSA CATACOMBS — ASCII GRADIENT FIELD
   The signature background motif: a full-bleed field of monospace
   glyphs whose density traces a gradient — a radial "tunnel" that
   darkens toward the edges, echoing the first-person descent.
   1-bit: ink glyphs on paper, low opacity, pixel-snapped.

   Usage:
     <div id="bg" class="ascii-field"></div>
     AsciiField.mount(document.getElementById('bg'), { shape:'tunnel' });

   Options:
     shape   'tunnel' (radial, default) | 'vertical' | 'diagonal'
     ramp    glyph density string, light→dense
     cell    px per glyph cell (font size driver), default 14
     drift   animate a slow breathing drift (default true)
     accent  fraction (0..1) of brightest cells tinted with --accent
   ============================================================ */
(function (global) {
  const DEFAULT_RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

  function mount(el, opts) {
    opts = opts || {};
    const ramp = opts.ramp || " .:-=+*#%@";
    const shape = opts.shape || 'tunnel';
    const cell = opts.cell || 14;
    const drift = opts.drift !== false;
    const accent = opts.accent != null ? opts.accent : 0.04;
    const invert = !!opts.invert;

    const pre = document.createElement('pre');
    pre.setAttribute('aria-hidden', 'true');
    pre.style.cssText =
      'margin:0;font-family:var(--font-body,monospace);line-height:1em;' +
      'font-size:' + cell + 'px;white-space:pre;letter-spacing:1px;' +
      'user-select:none;pointer-events:none;color:var(--ink-100,#E9E2CF);';
    el.appendChild(pre);

    // accent flecks layered over the base via a second <pre>
    const acc = document.createElement('pre');
    acc.setAttribute('aria-hidden', 'true');
    acc.style.cssText = pre.style.cssText +
      'position:absolute;inset:0;color:var(--accent,#C8341F);';
    el.appendChild(acc);
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';

    let cols = 0, rows = 0, t = 0, raf = 0, adv = cell * 0.6;

    // Measure the TRUE per-glyph advance (real font metrics + letter-spacing)
    // so the field fills the viewport exactly — no blank gutter on the right.
    // The hardcoded estimate underfilled for narrow faces like VT323.
    function measure() {
      const probe = document.createElement('span');
      probe.textContent = '0000000000000000000000000000000000000000';
      probe.style.cssText = pre.style.cssText +
        'position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0;';
      el.appendChild(probe);
      const w = probe.getBoundingClientRect().width / probe.textContent.length;
      el.removeChild(probe);
      if (w > 0) adv = w;
    }

    function brightness(nx, ny) {
      // nx, ny in [-1, 1]
      let b;
      if (shape === 'vertical') b = 1 - (ny + 1) / 2;            // bright at top
      else if (shape === 'diagonal') b = 1 - ((nx + ny) / 2 + 1) / 2;
      else {
        // tunnel: bright center, dark edges
        const d = Math.sqrt(nx * nx + ny * ny) / Math.SQRT2;
        b = 1 - d;
      }
      return invert ? 1 - b : b;
    }

    function resize() {
      const r = el.getBoundingClientRect();
      measure();
      cols = Math.max(1, Math.ceil(r.width / adv) + 1);
      rows = Math.max(1, Math.ceil(r.height / cell) + 1);
    }

    function render() {
      const breathe = drift ? (Math.sin(t / 60) * 0.06 + Math.sin(t / 23) * 0.02) : 0;
      let base = '', fleck = '';
      for (let y = 0; y < rows; y++) {
        const ny = (y / (rows - 1)) * 2 - 1;
        for (let x = 0; x < cols; x++) {
          const nx = (x / (cols - 1)) * 2 - 1;
          let b = brightness(nx, ny) + breathe;
          // subtle static grain so the field reads as dither, not a smooth ramp
          b += (Math.sin((x * 12.9898 + y * 78.233)) * 43758.5453 % 1) * 0.05;
          b = Math.max(0, Math.min(0.999, b));
          const gi = Math.floor(b * (ramp.length - 1));
          const ch = ramp[gi];
          base += ch;
          // brightest cells occasionally promoted to an accent fleck
          if (b > 0.86 && ((x * 7 + y * 13 + Math.floor(t / 40)) % 211) / 211 < accent) {
            fleck += ch;
          } else {
            fleck += ' ';
          }
        }
        base += '\n'; fleck += '\n';
      }
      pre.textContent = base;
      acc.textContent = fleck;
    }

    function loop() {
      t++;
      if (t % 2 === 0) render();
      raf = requestAnimationFrame(loop);
    }

    resize();
    render();
    if (drift) raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => { resize(); render(); });
    ro.observe(el);
    // webfonts change glyph metrics after first paint — re-measure once they load
    // so the field stays edge-to-edge (no resize event fires on font swap).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { resize(); render(); });
    }

    return {
      destroy() { cancelAnimationFrame(raf); ro.disconnect(); el.removeChild(pre); el.removeChild(acc); }
    };
  }

  global.AsciiField = { mount, DEFAULT_RAMP };
})(window);
