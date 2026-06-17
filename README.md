# Odyssa Catacombs — Teaser

Teaser site for **Odyssa Catacombs**, a 1-bit pixel-horror descent. The catacombs
are everything that was buried and didn't stay buried — and the hysteria of war,
during and long after, is the real monster.

**Status: in development.** Two static pages: a coming-soon landing and the master
concept board it links to.

## Pages

- **`index.html`** → served at **`<domain>/`** — the landing. A mix of the game's
  title screen and a coming-soon teaser. Its one live menu verb, `> CONCEPT DESIGN`,
  opens the board below.
- **`concept_design/index.html`** → served at **`<domain>/concept_design/`** — the
  **master concept board**: the full concept (world, the descent, hysteria, cast,
  enemies, relics, systems) as an atmospheric scroll, no technical detail. A fixed
  `‹ HOME` button (bottom-right) returns to the landing. Imported from the Odyssa
  Catacombs design system; self-contained apart from `assets/` (sprite masks + the
  ASCII field script).

Routes use relative links (`concept_design/` and `../`), so they work whether the
site is deployed at a domain root or a GitHub Pages project subpath.

## Run locally

Static files — open `index.html` in a browser, or serve the folder (needed for the
sprite masks and the `CONCEPT DESIGN` link to resolve cleanly):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Design language

Drawn from the Odyssa Catacombs design bible. 1-bit paper + ink + exactly one
reserved red accent `#C8341F` (threat / blood / hysteria — never decorative).
Jacquard 12 "woven" wordmark with the accent on the single flickering letter `y`,
Silkscreen chrome (`CATACOMBS`, build tag, pledge), VT323 menu/parser copy, Handjet
dot-matrix lore.

What the landing pulls from the **game UI**:

- **Signature ASCII gradient field background** (`assets/ascii-field.js`) — a
  full-bleed field of monospace glyphs whose density traces a radial *tunnel*
  (sparse, dark centre so the wordmark reads; dense textured edges), echoing the
  first-person descent. Mounted with `shape: 'tunnel', invert: true`. A vignette +
  radial paper glow sit over it for legibility. The board's hero reuses the same field.
- **Game HUD chrome** pinned to the corners: the encounter screen's depth gauge
  (`DEPTH · SURFACE`, accent left rule) and the build tag (`M1 · CONCEPT v0.1`).
- **Title main-menu** with the game's hard ink↔paper invert hover (in `steps()`,
  never an eased fade). The other verbs (`WISHLIST ON STEAM`, `NOTIFY ME`,
  `NEW EXPEDITION [ SEALED ]`) are commented out for now, leaving `CONCEPT DESIGN`
  as the single live row.
- The parser/lore voice and the **15%-of-net Ukraine humanitarian pledge** on the
  front door.

## Wiring left to do

- Re-enable `WISHLIST ON STEAM` / `NOTIFY ME` and point them at the real Steam page /
  capture form when they exist (currently commented out in `index.html`).
- `assets/ascii-field.js` is shared with the design system; keep it in sync if the
  field motif changes there. Note the teaser's copy adds runtime glyph-width
  measurement so the field fills the viewport edge-to-edge.
- `assets/art/*.png` are the design bible's `[needs human artist]` sprite
  placeholders, copied in so the concept board's masks resolve offline.
