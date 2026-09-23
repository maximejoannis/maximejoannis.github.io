// Génère js/bilan-data.js à partir des deux bilans Markdown de content/.
// Le texte est repris tel quel : seul le découpage en sections change.
// Usage : node scripts/build-bilan-data.mjs
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (f) => fs.readFileSync(new URL(`content/${f}`, root), "utf8").replace(/\r\n/g, "\n");
const trim = (s) => s.replace(/^\n+|\n+$/g, "");

// Découpe par titres de niveau `level`, sans regarder dans les blocs de code ; retire les séparateurs `---`.
function split(text, level) {
  const re = new RegExp(`^#{${level}} (.*)$`);
  const pre = [], secs = [];
  let fence = false, cur = null;
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) fence = !fence;
    const m = !fence && line.match(re);
    if (m) secs.push((cur = { title: m[1].trim(), lines: [] }));
    else if (fence || line.trim() !== "---") (cur ? cur.lines : pre).push(line);
  }
  return { pre: trim(pre.join("\n")), secs: secs.map((s) => ({ title: s.title, body: trim(s.lines.join("\n")) })) };
}
const cells = (l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
function table(body) {
  const L = body.split("\n"), a = L.findIndex((l) => l.startsWith("|"));
  let b = a; while (L[b + 1]?.startsWith("|")) b++;
  const t = L.slice(a, b + 1);
  return { before: trim(L.slice(0, a).join("\n")), after: trim(L.slice(b + 1).join("\n")), head: cells(t[0]), rows: t.slice(2).map(cells) };
}
const md = (m) => (m ? [{ t: "md", md: m }] : []);
const numbered = (title) => { const m = title.match(/^(\d+)\. (.*)$/); return { num: m[1], title: m[2] }; };

/* ---------- SauceDemo ---------- */
const TONES = { "Problème": "problem", Vulgarisation: "explain", Risque: "risk", "Conséquence": "risk", Solution: "solution" };
const THEMES = [
  ["conception", "Conception et périmètre", [1, 2, 3, 4, 5, 6, 7, 13, 14]],
  ["robustesse", "Robustesse des tests", [8, 9, 10, 11, 12, 27]],
  ["rapports", "Qualité et rapports", [15, 16, 17, 18, 20, 21, 22]],
  ["cicd", "CI/CD et publication", [19, 23, 24, 25]],
  ["ia-doc", "IA et documentation", [26, 28, 29, 30]],
];
const sd = split(read("bilan-projet-saucedemo-playwright-agents.md"), 1);
const sdMain = split(sd.secs[0].body, 2);
const sdItems = sdMain.secs.slice(1).map((s) => {
  const { num, title } = numbered(s.title), fields = [];
  for (const f of split(s.body, 3).secs) {
    if (TONES[f.title]) fields.push({ label: f.title, tone: TONES[f.title], md: f.body });
    else fields.at(-1).md += `\n\n### ${f.title}\n\n${f.body}`; // Planner, Generator, Healer…
  }
  return { num, title, tag: THEMES.find((t) => t[2].includes(+num))[0], fields };
});
const sec = (r, name) => r.secs.find((s) => s.title === name);
const arch = sec(sd, "Architecture obtenue").body.match(/^([\s\S]*?)\n```text\n([\s\S]*?)\n```$/);
const lessons = split(sec(sd, "Les 5 principaux enseignements").body, 2).secs.map((s) => ({ ...numbered(s.title), fields: [{ tone: "plain", md: s.body }] }));
const concl = split(sec(sd, "Conclusion").body, 2), figs = concl.secs[0].body.match(/^```text\n([\s\S]*?)\n```\n\n([\s\S]*)$/);
const saucedemo = {
  file: "bilan-projet-saucedemo-playwright-agents.md",
  title: sd.secs[0].title,
  lead: { heading: sdMain.secs[0].title, md: sdMain.secs[0].body },
  tabs: [
    { id: "problemes", label: "Problèmes et solutions", blocks: [{ t: "cards", unit: "problèmes", search: true, items: sdItems, filters: THEMES.map(([id, label]) => ({ id, label, short: label })) }] },
    { id: "architecture", label: "Architecture obtenue", heading: "Architecture obtenue", blocks: [...md(arch[1]), { t: "flow", lines: arch[2].split("\n").map((l) => l.trim()).filter(Boolean) }] },
    { id: "enseignements", label: "Enseignements", heading: "Les 5 principaux enseignements", blocks: [{ t: "cards", unit: "enseignements", open: true, items: lessons }] },
    { id: "conclusion", label: "Conclusion", heading: "Conclusion", blocks: [...md(concl.pre), ...md("## Chiffres de référence"),
      { t: "kv", rows: figs[1].split("\n").map((l) => l.match(/^(.*?)\s+:\s+(.*)$/).slice(1)) }, ...md(figs[2])] },
  ],
};

/* ---------- French Companies Explorer ---------- */
const fr = split(read("bilan-french-companies-explorer-playwright-agents.md"), 1);
const frMain = split(fr.secs[0].body, 2), F = (n) => frMain.secs.find((s) => s.title.startsWith(n));
const rows2items = (t, tones, extra = () => ({})) => t.rows.map((r) => ({
  title: r[0].replace(/^\*\*|\*\*$/g, ""), ...extra(r),
  fields: [1, 2].map((i) => ({ label: t.head[i], tone: tones[i - 1], md: r[i] })),
}));
const s1 = table(F("1.").body), s2 = F("2.").body.split("\n"), s3 = table(F("3.").body);
const listIdx = s2.map((l, i) => (/^\d+\. /.test(l) ? i : -1)).filter((i) => i >= 0);
const fixes = listIdx.map((i) => { const m = s2[i].match(/^(\d+)\. \*\*(.+?)\*\* (.*)$/); return { num: m[1], title: m[2], fields: [{ tone: "plain", md: m[3] }] }; });
const french = {
  file: "bilan-french-companies-explorer-playwright-agents.md",
  title: fr.secs[0].title,
  lead: { intro: frMain.pre, heading: frMain.secs[0].title, md: frMain.secs[0].body },
  tabs: [
    { id: "construction", label: "Construction des tests", heading: F("1.").title, blocks: [{ t: "cards", unit: "difficultés", cap: s1.head[0], items: rows2items(s1, ["problem", "solution"], (r) => ({ num: String(s1.rows.indexOf(r) + 1) })) }, ...md(s1.after)] },
    { id: "corrections", label: "Erreurs corrigées", heading: F("2.").title, blocks: [...md(trim(s2.slice(0, listIdx[0]).join("\n"))), { t: "cards", unit: "erreurs", open: true, items: fixes }, ...md(trim(s2.slice(listIdx.at(-1) + 1).join("\n")))] },
    { id: "defauts", label: "Défauts de l’application", heading: F("3.").title, blocks: [...md(s3.before), { t: "cards", unit: "défauts", cap: s3.head[0], search: true, split: true,
      filters: [{ id: "fixme", label: "Test en fixme", short: "fixme" }, { id: "sans-fixme", label: "Dette d’accessibilité (sans fixme)", short: "sans fixme" }],
      items: rows2items(s3, ["problem", "track"], (r) => ({ tag: /sans `fixme`/.test(r[2]) ? "sans-fixme" : "fixme" })) }, ...md(s3.after)] },
    { id: "resultat", label: "Résultat et limites", heading: F("4.").title, blocks: md(F("4.").body) },
    { id: "references", label: "Références", heading: F("Références").title, blocks: md(F("Références").body) },
  ],
};

const out = `"use strict";\n// Fichier généré par scripts/build-bilan-data.mjs depuis content/*.md — ne pas modifier à la main.\nconst BILAN = ${JSON.stringify({ saucedemo, "french-companies": french }, null, 1)};\n`;
fs.writeFileSync(new URL("js/bilan-data.js", root), out);
console.log("bilan-data.js :", out.length, "caractères ;", sdItems.length, "problèmes,", s1.rows.length, "difficultés,", s3.rows.length, "défauts");
