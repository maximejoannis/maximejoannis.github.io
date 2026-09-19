"use strict";
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="css/french-results.css">',
);

const FRENCH_RESULTS = {
  summary: [
    ["Features couvertes", "13 / 13 (100 %)"],
    ["TC présents dans les plans", "83"],
    ["TC automatisés", "84"],
    ["Tests Playwright", "84"],
    ["Tests actifs", "72"],
    ["Tests fixme connus", "12"],
    ["Échecs inattendus", "0"],
    ["Tests API réels", "6"],
    ["Tests UI mockés", "75"],
    ["Tests E2E réels", "3"],
    ["Couverture du périmètre défini", "100 %"],
  ],
  features: [
    ["Search", 10],
    ["Filters", 9],
    ["Pagination", 6],
    ["Sort", 7],
    ["Detail", 5],
    ["Favorites", 5],
    ["Stats", 6],
    ["Compare", 6],
    ["History", 7],
    ["Saved Searches", 8],
    ["Export", 6],
    ["Deep Linking", 6],
    ["Theme", 3],
  ],
  levels: [
    [
      "API réel",
      6,
      "APIRequestContext · requêtes GET · contrat observable",
      "api",
    ],
    [
      "UI mockée",
      75,
      "page.route() · données déterministes · responsabilités frontend",
      "ui",
    ],
    [
      "E2E réel",
      3,
      "Navigateur + API réelle · trois frontières d’intégration critiques",
      "e2e",
    ],
  ],
};

function frenchDonut(id, total, segments, center) {
  const node = document.querySelector(id);
  let cursor = 0;
  node.style.background = `conic-gradient(${segments
    .map((segment) => {
      const start = cursor;
      cursor += (segment[1] / total) * 100;
      return `${segment[2]} ${start}% ${cursor}%`;
    })
    .join(",")})`;
  node.querySelector("span").textContent = center;
}

function createFrenchResults() {
  if (document.querySelector("#french-results-deep-dive")) return;
  const anchor = document.querySelector("#qa-dashboard-details");
  if (!anchor) return;
  const root = document.createElement("div");
  root.id = "french-results-deep-dive";
  root.hidden = true;
  root.innerHTML = `
    <section class="panel sauce-section french-summary"><div class="qa-section-head"><div><p>BASELINE FINALE</p><h2>Résultats du périmètre automatisé</h2></div><span class="source-badge"><i class="fa-solid fa-file-lines"></i> Sprint Review</span></div><div class="french-summary-grid" id="french-summary-grid"></div><p class="sauce-scope-note"><i class="fa-solid fa-circle-info"></i> Ici, 100 % signifie que tous les Test Cases définis dans le périmètre retenu disposent d’une automatisation et que les 13 Features ont une preuve automatisée. Il ne s’agit ni de code coverage, ni d’une validation exhaustive de l’application ou de l’API, ni d’une garantie d’absence de bugs.</p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>PORTÉE FONCTIONNELLE</p><h2>84 Test Cases sur 13 Features</h2></div><span class="coverage-pill">13 / 13 Features</span></div><div class="french-feature-layout"><div class="table-scroll"><table><caption>Test Cases par Feature</caption><thead><tr><th>Feature</th><th>Test Cases</th><th>Poids dans la suite</th></tr></thead><tbody id="french-feature-body"></tbody><tfoot><tr><th>Total</th><th>84</th><th>100 %</th></tr></tfoot></table></div><div class="french-feature-chart" id="french-feature-chart" role="img" aria-label="Test Cases par Feature"></div></div><p class="sauce-fact">Le total inclut <code>TC-SAVED-008</code>, ajouté pour tracer <code>BUG-011</code> après la rédaction initiale du plan Saved Searches.</p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>STRATÉGIE MULTI-NIVEAUX</p><h2>Le niveau le plus bas apportant la confiance utile</h2></div></div><div class="french-level-grid" id="french-level-grid"></div><div class="french-level-bars" id="french-level-bars"></div><p class="sauce-fact">Les mocks prouvent la responsabilité du frontend, pas le contrat réel de l’API. Les trois E2E réels vérifient recherche et affichage, filtre Commune, puis ouverture du détail depuis un résultat réel.</p></section>
    <section class="french-proof-grid"><article class="panel sauce-section"><div class="qa-section-head"><div><p>ÉTAT DE LA SUITE</p><h2>Baseline Playwright verte</h2></div></div><div class="donut-layout compact"><div class="donut sauce-donut" id="french-status-donut"><span>84</span></div><ul class="sauce-legend"><li><i style="background:#22c55e"></i>Passed · 72</li><li><i style="background:#f59e0b"></i>Fixme / skipped · 12</li><li><i style="background:#ef4444"></i>Failed · 0</li></ul></div><p class="sauce-mini-note">Les fixme sont des oracles conservés face à des défauts produit connus ; ils ne sont pas des failures.</p></article><article class="panel sauce-section"><div class="qa-section-head"><div><p>COUVERTURE DU PÉRIMÈTRE</p><h2>Deux preuves à 100 %</h2></div></div><div class="french-coverage"><div><span>Features couvertes</span><div><i></i></div><b>13/13</b></div><div><span>TC planifiés automatisés</span><div><i></i></div><b>83/83</b></div></div><p class="sauce-mini-note">Aucun TC planifié ne manque. Le 84e, <code>TC-SAVED-008</code>, est un cas de non-régression supplémentaire.</p></article></section>
    <section class="panel sauce-section french-defect-proof"><div class="qa-section-head"><div><p>DÉFAUTS DOCUMENTÉS</p><h2>14 défauts : dette visible, oracle préservé</h2></div><span class="character-count">14 BUG</span></div><div class="french-defect-layout"><div><div class="donut sauce-donut" id="french-defect-donut"><span>14</span></div><ul class="sauce-legend"><li><i style="background:#f59e0b"></i>Défauts associés à un fixme · 12</li><li><i style="background:#60a5fa"></i>Dettes sans fixme · 2</li></ul></div><div class="french-defect-copy"><h3>Pourquoi conserver les fixme ?</h3><p>L’automatisation a révélé des comportements contraires aux critères d’acceptation. Les attentes n’ont pas été affaiblies pour obtenir une suite verte : douze tests conservent le résultat attendu avec <code>test.fixme</code>.</p><div class="accessibility-debt"><i class="fa-solid fa-universal-access"></i><span><strong>Deux dettes d’accessibilité sans fixme</strong><code>BUG-006</code> et <code>BUG-012</code> concernent des contrôles dont les parcours fonctionnels restent testables.</span></div></div></div></section>
    <section class="panel sauce-section french-verdict"><div><i class="fa-solid fa-circle-check"></i><span><small>DÉCISION DE CLÔTURE</small><strong>Projet techniquement clôturable dans le périmètre retenu</strong><p>84 tests · 72 passed · 12 fixme/skipped connus · 0 failed. La clôture conserve explicitement la dette produit connue et ne vaut pas validation exhaustive de French Companies Explorer ou de l’API gouvernementale.</p></span></div></section>`;
  anchor.parentNode.insertBefore(root, anchor);
}

function renderFrenchDeepDive() {
  createFrenchResults();
  const root = document.querySelector("#french-results-deep-dive");
  if (!root) return;
  root.hidden = state.lab.id !== "french-companies";
  if (root.hidden) return;
  document
    .querySelectorAll("#qa-dashboard-details > .qa-section")
    .forEach((section, index) => {
      if (index < 2) section.hidden = true;
    });
  document.querySelector("#french-summary-grid").innerHTML =
    FRENCH_RESULTS.summary
      .map(
        ([label, value]) =>
          `<article><span>${label}</span><strong>${value}</strong></article>`,
      )
      .join("");
  document.querySelector("#french-feature-body").innerHTML =
    FRENCH_RESULTS.features
      .map(
        (row) =>
          `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${((row[1] / 84) * 100).toFixed(1).replace(".", ",")} %</td></tr>`,
      )
      .join("");
  document.querySelector("#french-feature-chart").innerHTML =
    FRENCH_RESULTS.features
      .map(
        (row) =>
          `<div><span>${row[0]}</span><div><i style="width:${(row[1] / 10) * 100}%"></i></div><b>${row[1]}</b></div>`,
      )
      .join("");
  document.querySelector("#french-level-grid").innerHTML = FRENCH_RESULTS.levels
    .map(
      (row) =>
        `<article class="level-${row[3]}"><span>${row[1]}</span><div><strong>${row[0]}</strong><p>${row[2]}</p></div></article>`,
    )
    .join("");
  document.querySelector("#french-level-bars").innerHTML = FRENCH_RESULTS.levels
    .map(
      (row) =>
        `<div><span>${row[0]}</span><div><i class="${row[3]}" style="width:${(row[1] / 75) * 100}%"></i></div><b>${row[1]}</b></div>`,
    )
    .join("");
  frenchDonut(
    "#french-status-donut",
    84,
    [
      ["Passed", 72, "#22c55e"],
      ["Fixme", 12, "#f59e0b"],
    ],
    "84",
  );
  frenchDonut(
    "#french-defect-donut",
    14,
    [
      ["Fixme", 12, "#f59e0b"],
      ["Sans fixme", 2, "#60a5fa"],
    ],
    "14",
  );
}

const renderResultsBeforeFrench = renderResults;
renderResults = function () {
  if (state.lab.id !== "french-companies") return renderResultsBeforeFrench();
  document.querySelector("#result-metrics").innerHTML = metricCards([
    { value: 84, label: "Tests Playwright", note: "Périmètre automatisé" },
    { value: 72, label: "Passed", note: "Tests actifs de la baseline" },
    { value: 12, label: "Fixme / skipped", note: "Défauts produit connus" },
    { value: 0, label: "Échecs inattendus", note: "Baseline finale verte" },
  ]);
  const headings = document.querySelectorAll(
    "#vue-resultats .dashboard-grid > .panel .panel-heading h2",
  );
  if (headings[0]) headings[0].textContent = "État de la suite Playwright";
  if (headings[1]) headings[1].textContent = "Répartition par niveau de test";
  document.querySelector("#results-donut").style.background =
    "conic-gradient(#22c55e 0 85.714%,#f59e0b 85.714% 100%)";
  document.querySelector("#results-total").textContent = "84";
  document.querySelector("#results-legend").innerHTML =
    '<li><i style="background:#22c55e"></i>Passed · 72</li><li><i style="background:#f59e0b"></i>Fixme / skipped · 12</li><li><i style="background:#ef4444"></i>Failed · 0</li>';
  document.querySelector("#levels-chart").innerHTML = [
    ["API réel", 6],
    ["UI mockée", 75],
    ["E2E réel", 3],
  ]
    .map(
      (row) =>
        `<div class="bar-row"><span>${row[0]}</span><div><i style="width:${(row[1] / 75) * 100}%"></i></div><b>${row[1]}</b></div>`,
    )
    .join("");
  document.querySelector("#result-insights").innerHTML = [
    [
      "Baseline verte",
      "84 tests : 72 passed, 12 fixme/skipped connus et aucun échec inattendu.",
    ],
    [
      "Stratégie multi-niveaux",
      "6 tests API réels, 75 tests UI mockés et 3 E2E réels répondent à des responsabilités distinctes.",
    ],
    [
      "Couverture honnête",
      "100 % du périmètre défini ne signifie ni code coverage, ni validation exhaustive du produit ou de l’API.",
    ],
  ]
    .map((row) => `<div><strong>${row[0]}</strong><p>${row[1]}</p></div>`)
    .join("");
};

const renderQaDetailsBeforeFrench = renderQaDetails;
renderQaDetails = function () {
  renderQaDetailsBeforeFrench();
  renderFrenchDeepDive();
};
document.addEventListener("DOMContentLoaded", () => {
  renderResults();
  renderFrenchDeepDive();
});
