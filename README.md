# Start of Enlighten Learning website

## Design system (October 2026 redesign)

- **Tokens:** `src/theme/tokens.js` is the only file that holds a color literal. The MUI theme (`src/theme/createSiteTheme.js`) and the CSS variables written into `index.html` by `src/theme/vitePlugin.js` both read from it. Components use `theme.vars.palette.*`, sx palette strings or `var(--el-*)`, never a hex.
- **Page kit:** `src/kit` (PageIntro, Section, SectionHeading, SplitSection, Figure, FeatureGrid, CheckList, Steps, FAQ, CTABand, Stat, Prose, Eyebrow, IconWell, SeasonTag and friends). Pages are built only from these pieces.
- **Motion kit:** `src/motion` (Reveal, Stagger, Parallax, SpotlightCard, Magnetic, Marquee, CountUp, SplitWords, KenBurns). Each piece honors reduced motion and the `data-motion="off"` attribute on `html` (stored as `el-motion` in localStorage), rendering everything static with nothing hidden.
- **Dark mode:** light by default, remembered per browser under `el-mode`, applied before paint by the inline script in `index.html`.
- **Seasons:** follow the date (October and December) or a preview in the address: `?season=halloween`, `?season=christmas`, `?season=normal`, with `&style=full` to let the season palette replace the brand accent. See `src/constants/season.js`.
- **Contact details:** `src/config/site.js`. Phone numbers (calls and texts separately), hours and the address are optional and only render once set; the header pill, footer, contact page, CTA band and JSON-LD all read from there.
- **Fonts:** self-hosted in `public/fonts` (Fraunces for h1 to h3, Inter for everything else) and preloaded from `index.html`.
- **Checks:** `node scripts/copy-diff.cjs <file>` compares every string, link and image in a page with the committed original. `scripts/screenshots.cjs` and `scripts/verify.cjs` need Playwright (`npm i -D playwright` and `npx playwright install chromium`, not added to package.json).
