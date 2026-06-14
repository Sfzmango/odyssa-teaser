# Odyssa Catacombs — Teaser

Landing page for **Odyssa Catacombs**, a 1-bit pixel-horror descent. The catacombs
are everything that was buried and didn't stay buried — and the hysteria of war,
during and long after, is the real monster.

**Status: in development.** This site is a single static landing page; nothing else
is wired up yet.

## Run locally

It's a single self-contained file. Either open `index.html` in a browser, or:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Design language

Reproduces the game's title screen from the design bible (Concepts 01 · §02-1):
1-bit paper + ink + one reserved red accent `#C8341F`; Jacquard 12 wordmark with the
accent on the single letter `y`, Silkscreen chrome (`CATACOMBS`, tagline), VT323 menu
and pledge. The faint first-person tunnel is the design's `corridor_lit.png` shown as
an ink layer masked at ~14% opacity.

The menu (Continue / New Expedition / Journal / Settings / Quit) is a non-interactive
concept mock — the build isn't wired up yet (`M1 CONCEPT v0.1`).

> `assets/corridor_lit.png` is an **[AI placeholder]** — temporary scaffolding per the
> project's art pipeline; it is not a shipped asset and is slated for human-artist
> replacement (or a CSS-only substitute).
