// Copy diff: compares user-facing strings, links and images between the
// committed original of a file (git HEAD) and the working-tree version.
// Usage (from the repo root): node scripts/copy-diff.cjs <repo-relative new path> [<original path if moved>] [--allow allow.json] [--extra <another new file>...]
// Needs no extra packages: it parses with espree, which ESLint already installs.
// --extra lets a page that was split into several new files be compared as one.
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const REPO = path.resolve(__dirname, "..");
const espree = require(path.join(REPO, "node_modules/espree"));

const COPY_KEYS = new Set(["title","subtitle","description","desc","label","name","text","quote","author","role","roles","features","responsibilities","category","location","time","date","duration","coordinator","noun","emoji","startLine","organization","amount","impact","website","formUrl","href","image","status","message","content","heading","body","cta","buttonText","placeholder","helperText","alt","src","to","value","donationDate","donationAmount","avatar","email","handle","url","tagline","summary","position","school","grade","subjects","requirements","benefits","steps","faq","question","answer","eyebrow","caption","note","link","linkText","primaryAction","secondaryAction","statLabel","statValue","learnMore","detail","areas","gradeLevels","levels","subject","commitment","contact","ctaText","ctaHref","review","reviewer","relationship","rating","year","tag","tags","badge","emptyTitle","emptyText","statusText","period","registrationStartDate","expirationDate","volunteersNeeded","totalParticipants","expectedParticipants","maxPositions","currentMembers","openings","welcome","intro","footer","legal","copyright"]);
const ATTRS = new Set(["href","to","src","alt","aria-label","aria-labelledby","aria-describedby","id","name","placeholder","label","helperText","title","content","type","rel","target","itemType","itemProp","action","method","value","data-instgrm-permalink","data-instgrm-version","scrolling","allow","width","height","role","lang","download","for","htmlFor","autoComplete","inputMode","pattern","description","fullTitle","lead","eyebrow","caption","question","answer","actionLabel","ariaLabel","text","author","organization","startText","endText","subtitle","primary","secondary"]);
// Attributes whose values are not words; ignored when missing or added
const NON_WORD_ATTRS = /^(type|role|rel|target|width|height|scrolling|allow|autoComplete|inputMode|lang|itemProp|itemType|aria-hidden|aria-controls|aria-expanded|aria-pressed|aria-live|aria-busy|data-|method|download|for|htmlFor|pattern|name=(description|keywords|viewport|robots|theme-color))/;
const CSSISH = /^(#[0-9a-f]{3,8}$|rgba?\(|hsla?\(|linear-gradient|radial-gradient|conic-gradient|url\(|calc\(|minmax\(|repeat\(|clamp\(|translate|scale|rotate|skew|cubic-bezier|var\(|\d|-\d|\.\d|inset |none$|none !important|auto$|[a-zA-Z-]+ \d+(\.\d+)?m?s\b|transparent$|inherit$|initial$|unset$|solid$|dashed$|hidden$|visible$|absolute$|relative$|fixed$|sticky$|flex|grid|block$|inline|center$|column|row$|wrap|nowrap$|space-|flex-|left$|right$|top$|bottom$|pointer$|default$|ease|all |opacity |transform |background|border|width |height |color |fill |stroke |font|letter-spacing|text-|box-|drop-shadow|blur\(|brightness|saturate|contrast\(|sepia|grayscale|invert|hue-rotate|screen$|multiply$|overlay$|normal$|reverse$|infinite|alternate|forwards|backwards|both$|paused|running|smooth$|contain$|cover$|scale-down$|repeat|no-repeat|nearest|bold$|italic$|uppercase$|lowercase$|capitalize$|underline$|line-through$|ellipsis$|clip$|break-|pre|balance$|pretty$|tabular-nums|lining-nums|proportional-nums|oldstyle-nums|sans-serif|serif$|monospace$|system-ui|-apple-system|[A-Za-z-]+\s*:\s*[^;]+;)/i;
// Stat strings such as "200+", "$8.5k" or "1,000" are copy even though they start with a digit
const STATLIKE = /^\$?[\d.,]+[+%kKmM]?$/;
const UNITISH = /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax|ms|s|deg|fr|ch)?(\s|$)/;

function normalize(s) {
  return s
    .replace(/&apos;|&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2300}-\u{23FF}\u{2190}-\u{21FF}\u{25A0}-\u{25FF}]/gu;
const stripEmoji = (s) => normalize(s.replace(EMOJI, " ").replace(/\s+/g, " "));
const hasEmoji = (s) => stripEmoji(s) !== normalize(s);

function looksLikeCopy(s) {
  const t = normalize(s);
  if (!t) return false;
  if (CSSISH.test(t) || UNITISH.test(t)) return false;
  if (/^[^A-Za-z]*$/.test(t)) return false;
  if (/^[a-z][a-zA-Z0-9]*$/.test(t)) return false;
  if (/^[A-Z_]{2,}$/.test(t)) return false;
  if (/^[a-z-]+(\.[a-z-]+)+$/.test(t)) return false;
  if (/^(xs|sm|md|lg|xl|h[1-6]|body[12]|subtitle[12]|caption|overline|button|small|medium|large|outlined|contained|text|primary|secondary|success|error|warning|info|inherit|start|end|submit|email|password|tel|number|url|search)$/.test(t)) return false;
  if (/^(ease|cubic|linear|font|flex|grid|text|box|border|background|transform|opacity|all|none|auto|inherit|width|height|color|margin|padding|top|left|right|bottom)\b/i.test(t) && /^[\w-]+(\s[\w-]+)*$/.test(t)) return false;
  return true;
}

function collect(code, file) {
  let ast;
  try {
    ast = espree.parse(code, { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true }, loc: true });
  } catch (e) {
    console.error(`PARSE ERROR in ${file}: ${e.message}`);
    process.exit(2);
  }
  const out = [];
  const push = (kind, text, line) => {
    const t = normalize(text);
    if (t) out.push({ kind, text: t, line });
  };
  const walk = (node, parent, keyName) => {
    if (!node || typeof node.type !== "string") return;
    switch (node.type) {
      case "JSXText": {
        const t = normalize(node.value);
        if (t && /[A-Za-z0-9]/.test(t)) push("text", t, node.loc.start.line);
        break;
      }
      case "JSXAttribute": {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : `${node.name.namespace.name}:${node.name.name.name}`;
        if (ATTRS.has(name) || name.startsWith("data-") || name.startsWith("aria-")) {
          let v = null;
          if (node.value && node.value.type === "Literal") v = String(node.value.value);
          else if (node.value && node.value.type === "JSXExpressionContainer" && node.value.expression.type === "Literal") v = String(node.value.expression.value);
          else if (node.value && node.value.type === "JSXExpressionContainer" && node.value.expression.type === "TemplateLiteral" && node.value.expression.expressions.length === 0) v = node.value.expression.quasis.map((q) => q.value.cooked).join("");
          if (v !== null) push("attr", `${name}=${v}`, node.loc.start.line);
        }
        break;
      }
      case "Literal": {
        if (typeof node.value === "string") {
          const isImport = parent && parent.type === "ImportDeclaration";
          const isAttr = parent && parent.type === "JSXAttribute";
          if (!isImport && !isAttr) {
            if (keyName && COPY_KEYS.has(keyName) && (STATLIKE.test(node.value) || (!CSSISH.test(node.value) && !UNITISH.test(node.value) && /[A-Za-z]/.test(node.value)))) push("data", node.value, node.loc.start.line);
            else if (looksLikeCopy(node.value) && (/\s/.test(node.value.trim()) || /^(https?:|mailto:|tel:|sms:|\/)/.test(node.value))) push("string", node.value, node.loc.start.line);
          }
        }
        break;
      }
      case "TemplateLiteral": {
        if (node.expressions.length === 0) {
          const v = node.quasis.map((q) => q.value.cooked).join("");
          if (looksLikeCopy(v) && /\s/.test(v.trim())) push("string", v, node.loc.start.line);
        }
        break;
      }
      default:
        break;
    }
    for (const key of Object.keys(node)) {
      if (key === "loc" || key === "range" || key === "parent") continue;
      const child = node[key];
      let nextKey = keyName;
      if (node.type === "Property" && key === "value") nextKey = node.key.type === "Identifier" ? node.key.name : String(node.key.value);
      if (node.type === "Property" && key === "key") continue;
      if (Array.isArray(child)) child.forEach((c) => walk(c, node, node.type === "ArrayExpression" ? keyName : nextKey));
      else if (child && typeof child.type === "string") walk(child, node, nextKey);
    }
  };
  walk(ast, null, null);
  return out;
}

function multiset(items) {
  const m = new Map();
  for (const it of items) {
    const k = `${it.kind}|${it.text}`;
    const e = m.get(k) || { ...it, n: 0 };
    e.n++;
    m.set(k, e);
  }
  return m;
}

const args = process.argv.slice(2);
let allow = { added: [], removed: [] };
const extras = [];
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow") allow = { added: [], removed: [], ...JSON.parse(fs.readFileSync(args[++i], "utf8")) };
  else if (args[i] === "--extra") extras.push(args[++i]);
  else positional.push(args[i]);
}
const newPath = positional[0];
const origPath = positional[1] || newPath;
const origCode = execSync(`git -C "${REPO}" show HEAD:${origPath.replace(/\\/g, "/")}`, { encoding: "utf8", maxBuffer: 1 << 26 });
let newItems = fs.existsSync(path.join(REPO, newPath)) ? collect(fs.readFileSync(path.join(REPO, newPath), "utf8"), newPath) : [];
for (const extra of extras) newItems = newItems.concat(collect(fs.readFileSync(path.join(REPO, extra), "utf8"), extra));
const A = multiset(collect(origCode, origPath));
const B = multiset(newItems);
const missing = [];
const added = [];
const emojiOnly = [];
for (const [k, a] of A) {
  const b = B.get(k);
  const d = a.n - (b ? b.n : 0);
  if (d > 0) missing.push({ ...a, n: d });
}
for (const [k, b] of B) {
  const a = A.get(k);
  const d = b.n - (a ? a.n : 0);
  if (d > 0) added.push({ ...b, n: d });
}
// The bare words of every entry (attribute values without their "name=")
const bare = (e) => (e.kind === "attr" ? e.text.replace(/^[a-zA-Z-]+=/, "") : e.text);
const bTexts = new Set([...B.values()].map((e) => stripEmoji(bare(e))));
const bTextsAnyKind = new Set([...B.values()].map(bare));
const realMissing = missing.filter((m) => {
  if (m.kind === "attr" && NON_WORD_ATTRS.test(m.text)) return false;
  const words = bare(m);
  if (hasEmoji(words) && bTexts.has(stripEmoji(words))) { emojiOnly.push(m); return false; }
  // The same words moved between JSX text, a data key and a prop still count as kept
  if (bTextsAnyKind.has(words)) return false;
  return !allow.removed.includes(words);
});
const aTextsStripped = new Set([...A.values()].map((e) => stripEmoji(bare(e))));
const realAdded = added.filter((m) => {
  if (m.kind === "attr" && NON_WORD_ATTRS.test(m.text)) return false;
  const words = bare(m);
  if (aTextsStripped.has(stripEmoji(words))) return false;
  return !allow.added.includes(words);
});
const fmt = (e) => `  [${e.kind}] x${e.n} L${e.line}: ${e.text.length > 160 ? e.text.slice(0, 160) + "..." : e.text}`;
console.log(`== ${newPath}${extras.length ? " + " + extras.join(" + ") : ""} (original: ${origPath})`);
console.log(`original strings: ${[...A.values()].reduce((s, e) => s + e.n, 0)}, new strings: ${[...B.values()].reduce((s, e) => s + e.n, 0)}`);
console.log(`MISSING (${realMissing.length}):`);
realMissing.forEach((e) => console.log(fmt(e)));
console.log(`ADDED (${realAdded.length}):`);
realAdded.forEach((e) => console.log(fmt(e)));
if (emojiOnly.length) {
  console.log(`EMOJI REMOVED, words kept (${emojiOnly.length}):`);
  emojiOnly.forEach((e) => console.log(fmt(e)));
}
process.exitCode = realMissing.length || realAdded.length ? 1 : 0;
