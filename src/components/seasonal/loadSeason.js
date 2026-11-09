import { useEffect, useState } from "react";

// Each season is its own chunk: only today's is fetched, and on a plain day
// nothing is. A pack is the default export of ./packs/<season>.js. This file
// is in the main bundle, so it stays small.
const LOADERS = {
  halloween: () => import("./packs/halloween"),
  thanksgiving: () => import("./packs/thanksgiving"),
  christmas: () => import("./packs/christmas"),
  newyear: () => import("./packs/newyear"),
  lunar: () => import("./packs/lunar"),
  stpatricks: () => import("./packs/stpatricks"),
  spring: () => import("./packs/spring"),
  july4: () => import("./packs/july4"),
  summer: () => import("./packs/summer"),
};

// How long the first paint waits for the season before going ahead without it
const FIRST_PAINT_WAIT = 1000;

const settled = new Map(); // season to its pack, or to null when it could not load
const started = new Map();

// Never rejects. A chunk that cannot load (a stale tab after a deploy, say)
// leaves the page working with no decor.
function loadSeason(season) {
  if (!started.has(season)) {
    started.set(
      season,
      LOADERS[season]()
        .then(({ default: pack }) => {
          pack.install();
          settled.set(season, pack);
        })
        .catch(() => {
          settled.set(season, null);
        })
    );
  }
  return started.get(season);
}

// Resolves once the season's colors and art are in hand, so the first paint
// is already right, or after a moment on a slow network.
export function seasonReady(season) {
  if (!LOADERS[season]) return Promise.resolve();
  return Promise.race([loadSeason(season), new Promise((resolve) => setTimeout(resolve, FIRST_PAINT_WAIT))]);
}

// The season's pack, null until it is in, and whether it is still on its way
export function useSeasonPack(season) {
  const [, rerender] = useState(0);
  const known = !LOADERS[season] || settled.has(season);

  useEffect(() => {
    if (known) return undefined;
    let live = true;
    loadSeason(season).then(() => {
      if (live) rerender((n) => n + 1);
    });
    return () => {
      live = false;
    };
  }, [season, known]);

  return { pack: settled.get(season) ?? null, pending: !known };
}
