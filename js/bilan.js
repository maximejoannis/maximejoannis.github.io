"use strict";
/* Vue « Problèmes et solutions » (menu Approfondir). Le texte vient de BILAN (js/bilan-data.js), généré depuis content/*.md. */
document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="css/bilan.css">');
VIEW_META.bilan = ["BILAN DE PROJET", "Problèmes et solutions"];
const BILAN_ICONS = { problem: "fa-triangle-exclamation", explain: "fa-lightbulb", risk: "fa-bolt", solution: "fa-circle-check", track: "fa-list-check" };
const bilanUi = { tab: 0, q: "", tag: "all" };

const bEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bNorm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function bInline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (m, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = bEsc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${bEsc(codes[i])}</code>`);
}
function bTable(rows) {
  const cells = (l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const al = cells(rows[1]).map((c) => (c.endsWith(":") ? (c.startsWith(":") ? "center" : "right") : "left"));
  const row = (l, tag) => `<tr>${cells(l).map((c, i) => `<${tag} style="text-align:${al[i]}">${bInline(c)}</${tag}>`).join("")}</tr>`;
  return `<div class="table-scroll"><table><thead>${row(rows[0], "th")}</thead><tbody>${rows.slice(2).map((l) => row(l, "td")).join("")}</tbody></table></div>`;
}
function bMd(md) {
  const L = md.split("\n"), out = [], list = /^(- |\d+\. )/, special = /^(```|#{2,3} |\||> |- |\d+\. )/;
  for (let i = 0; i < L.length; ) {
    const l = L[i];
    let m;
    if (!l.trim()) { i++; continue; }
    if (l.startsWith("```")) {
      const code = [];
      for (i++; i < L.length && !L[i].startsWith("```"); i++) code.push(L[i]);
      i++;
      out.push(`<pre><code>${bEsc(code.join("\n"))}</code></pre>`);
    } else if ((m = l.match(/^(#{2,3}) (.*)$/))) {
      out.push(`<h${m[1].length + 1} class="bilan-h">${bInline(m[2])}</h${m[1].length + 1}>`);
      i++;
    } else if (l.startsWith("|")) {
      const rows = [];
      for (; i < L.length && L[i].startsWith("|"); i++) rows.push(L[i]);
      out.push(bTable(rows));
    } else if (l.startsWith("> ")) {
      const q = [];
      for (; i < L.length && L[i].startsWith("> "); i++) q.push(L[i].slice(2));
      out.push(`<blockquote>${bInline(q.join(" "))}</blockquote>`);
    } else if (list.test(l)) {
      const tag = /^\d/.test(l) ? "ol" : "ul", it = [];
      for (; i < L.length && list.test(L[i]); i++) it.push(L[i].replace(list, ""));
      out.push(`<${tag}>${it.map((x) => `<li>${bInline(x)}</li>`).join("")}</${tag}>`);
    } else {
      const p = [];
      for (; i < L.length && L[i].trim() && (!special.test(L[i]) || !p.length); i++) p.push(L[i]);
      out.push(`<p>${bInline(p.join(" "))}</p>`);
    }
  }
  return out.join("");
}

function bField(f) {
  return `<div class="bilan-field ${f.tone}">${f.label ? `<h4 class="bilan-label"><i class="fa-solid ${BILAN_ICONS[f.tone] || ""}" aria-hidden="true"></i>${bInline(f.label)}</h4>` : ""}<div class="bilan-md">${bMd(f.md)}</div></div>`;
}
function bCard(it, block) {
  const side = (f) => f.tone === "solution" || f.tone === "track";
  const left = it.fields.filter((f) => !side(f)), right = it.fields.filter(side);
  const first = (it.fields[0]?.md || "").split("\n\n")[0], preview = /^(```|- |\d+\. |\||>)/.test(first) ? "" : bInline(first);
  const [a, ...rest] = it.title.split(" — "), title = block.split && rest.length ? `<b class="bilan-id">${bEsc(a)}</b> — ${bInline(rest.join(" — "))}` : bInline(it.title);
  const pill = block.filters?.find((f) => f.id === it.tag);
  return `<details class="bilan-card" data-tag="${it.tag || ""}"${block.open ? " open" : ""}><summary><span class="bilan-num">${it.num || ""}</span><span class="bilan-sum">${block.cap ? `<small class="bilan-cap">${bEsc(block.cap)}</small>` : ""}<strong>${title}</strong>${preview ? `<span class="bilan-preview" aria-hidden="true">${preview}</span>` : ""}</span>${pill ? `<span class="bilan-pill">${bEsc(pill.short)}</span>` : ""}<i class="fa-solid fa-chevron-down bilan-chev" aria-hidden="true"></i></summary><div class="bilan-body${right.length ? "" : " single"}"><div class="bilan-col">${left.map(bField).join("")}</div>${right.length ? `<div class="bilan-col">${right.map(bField).join("")}</div>` : ""}</div></details>`;
}
function bBlock(b) {
  if (b.t === "md") return `<div class="bilan-md prose">${bMd(b.md)}</div>`;
  if (b.t === "flow") return `<ol class="bilan-flow">${b.lines.map((l) => (/^[↓+]$/.test(l) ? `<li class="conn" aria-hidden="true">${l}</li>` : `<li class="node">${bInline(l)}</li>`)).join("")}</ol>`;
  if (b.t === "kv") return `<dl class="bilan-kv">${b.rows.map((r) => `<div><dt>${bInline(r[0])}</dt><dd>${bInline(r[1])}</dd></div>`).join("")}</dl>`;
  const n = b.items.length, many = n > 3;
  return `<div class="bilan-cards" data-unit="${b.unit}" data-total="${n}">${b.search || b.filters || many ? `<div class="bilan-tools">${b.search ? `<label class="bilan-search"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><span class="sr-only">Rechercher</span><input type="search" data-bilan-search placeholder="Rechercher un mot-clé…" autocomplete="off"></label>` : ""}${b.filters ? `<div class="bilan-chips" role="group" aria-label="Filtrer par thème"><button class="bilan-chip" data-bilan-tag="all" aria-pressed="true">Tous <b>${n}</b></button>${b.filters.map((f) => `<button class="bilan-chip" data-bilan-tag="${f.id}" aria-pressed="false">${bEsc(f.label)} <b>${b.items.filter((i) => i.tag === f.id).length}</b></button>`).join("")}</div>` : ""}<div class="bilan-meta"><span class="bilan-count" role="status" aria-live="polite">${n} ${b.unit}</span>${many ? '<button class="bilan-toggle" data-bilan-toggle><i class="fa-solid fa-angles-down" aria-hidden="true"></i><span>Tout déplier</span></button>' : ""}</div></div>` : ""}<div class="bilan-list">${b.items.map((i) => bCard(i, b)).join("")}</div><p class="bilan-empty" hidden>Aucun résultat. <button data-bilan-reset>Réinitialiser les filtres</button></p></div>`;
}

function renderBilan() {
  const host = document.querySelector("#bilan-content"), d = BILAN[state.lab.id];
  if (!host || !d) return;
  Object.assign(bilanUi, { tab: 0, q: "", tag: "all" });
  const src = `https://github.com/maximejoannis/maximejoannis.github.io/blob/main/content/${d.file}`;
  host.innerHTML = `<header class="bilan-head"><div class="bilan-top"><p class="bilan-kicker">${state.lab.code} · BILAN DE PROJET</p><div class="bilan-labs" role="group" aria-label="Projet">${Object.values(LABS).map((l) => `<button data-bilan-lab="${l.id}" aria-pressed="${l.id === state.lab.id}">${l.code} · ${bEsc(l.name)}</button>`).join("")}</div></div><h2>${bInline(d.title)}</h2>${d.lead.intro ? `<div class="bilan-md">${bMd(d.lead.intro)}</div>` : ""}<h3 class="bilan-lead">${bInline(d.lead.heading)}</h3><div class="bilan-md prose">${bMd(d.lead.md)}</div><a class="bilan-source" href="${src}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Document source (Markdown)</a></header>
<div class="bilan-tabs" role="tablist" aria-label="Sections du bilan">${d.tabs.map((t, i) => { const c = t.blocks.find((b) => b.t === "cards"); return `<button role="tab" id="bilan-tab-${i}" aria-controls="bilan-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-bilan-tab="${i}">${bEsc(t.label)}${c ? ` <b>${c.items.length}</b>` : ""}</button>`; }).join("")}</div>
${d.tabs.map((t, i) => `<section class="bilan-panel" role="tabpanel" id="bilan-panel-${i}" aria-labelledby="bilan-tab-${i}"${i ? " hidden" : ""}>${t.heading ? `<h3 class="bilan-title">${bInline(t.heading)}</h3>` : ""}${t.blocks.map(bBlock).join("")}</section>`).join("")}`;
}

function bilanFilter(scope) {
  const q = bNorm(bilanUi.q.trim()), cards = [...scope.querySelectorAll(".bilan-card")];
  let n = 0;
  cards.forEach((c) => {
    const show = (bilanUi.tag === "all" || c.dataset.tag === bilanUi.tag) && (!q || bNorm(c.textContent).includes(q));
    c.hidden = !show;
    n += show;
  });
  const total = cards.length, unit = scope.dataset.unit;
  scope.querySelector(".bilan-count") && (scope.querySelector(".bilan-count").textContent = n === total ? `${total} ${unit}` : `${n} ${unit} affichés sur ${total}`);
  scope.querySelector(".bilan-empty").hidden = n > 0;
}
function bilanSelectTab(i, focus) {
  const tabs = [...document.querySelectorAll("[data-bilan-tab]")];
  i = (i + tabs.length) % tabs.length;
  tabs.forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
  document.querySelectorAll(".bilan-panel").forEach((p, k) => (p.hidden = k !== i));
  if (focus) tabs[i].focus();
}
function bilanBind(host) {
  host.addEventListener("click", (e) => {
    const t = e.target.closest("[data-bilan-tab],[data-bilan-lab],[data-bilan-tag],[data-bilan-toggle],[data-bilan-reset]");
    if (!t) return;
    const scope = t.closest(".bilan-cards");
    if (t.dataset.bilanTab) bilanSelectTab(+t.dataset.bilanTab);
    else if (t.dataset.bilanLab) {
      const select = document.querySelector("#project-select");
      select.value = t.dataset.bilanLab;
      select.dispatchEvent(new Event("change"));
    } else if (t.dataset.bilanTag) {
      bilanUi.tag = t.dataset.bilanTag;
      scope.querySelectorAll("[data-bilan-tag]").forEach((c) => c.setAttribute("aria-pressed", c === t));
      bilanFilter(scope);
    } else if (t.hasAttribute("data-bilan-reset")) {
      Object.assign(bilanUi, { q: "", tag: "all" });
      scope.querySelector("[data-bilan-search]") && (scope.querySelector("[data-bilan-search]").value = "");
      scope.querySelectorAll("[data-bilan-tag]").forEach((c) => c.setAttribute("aria-pressed", c.dataset.bilanTag === "all"));
      bilanFilter(scope);
    } else {
      const open = [...scope.querySelectorAll(".bilan-card:not([hidden])")], expand = open.some((c) => !c.open);
      open.forEach((c) => (c.open = expand));
      t.querySelector("span").textContent = expand ? "Tout replier" : "Tout déplier";
      t.querySelector("i").className = `fa-solid ${expand ? "fa-angles-up" : "fa-angles-down"}`;
    }
  });
  host.addEventListener("input", (e) => {
    if (!e.target.matches("[data-bilan-search]")) return;
    bilanUi.q = e.target.value;
    bilanFilter(e.target.closest(".bilan-cards"));
  });
  host.addEventListener("keydown", (e) => {
    const t = e.target.closest("[data-bilan-tab]");
    if (!t) return;
    const i = +t.dataset.bilanTab, k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: -1 }[e.key];
    if (k !== undefined) { e.preventDefault(); bilanSelectTab(k, true); }
  });
}

function installBilan() {
  document.querySelector("#vue-portail").insertAdjacentHTML("beforebegin", '<section class="dashboard-view" id="vue-bilan" data-view-panel="bilan"><div id="bilan-content"></div></section>');
  const host = document.querySelector("#bilan-content");
  host.dataset.verbatim = ""; // exclut le contenu du remplacement de vocabulaire : le texte des bilans reste identique aux fichiers .md
  bilanBind(host);
  renderBilan();
  if (state.view === "bilan") switchView("bilan");
}
const setLabBeforeBilan = setLab;
setLab = function (id) {
  setLabBeforeBilan(id);
  if (document.querySelector("#bilan-content")) renderBilan();
};
document.addEventListener("DOMContentLoaded", installBilan);
