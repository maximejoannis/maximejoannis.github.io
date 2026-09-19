"use strict";
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="css/case-study.css">',
);
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="css/defect-metadata.css">',
);
VIEW_META.etude = ["DÉMARCHE PROFESSIONNELLE", "Étude de cas"];
const CASE_STUDIES = {
  saucedemo: {
    context:
      "Application publique de démonstration e-commerce utilisée comme support d’une démarche QA complète, de la conception fonctionnelle à la publication des preuves.",
    scope:
      "6 fonctionnalités · 6 User Stories · 32 critères · 33 cas fonctionnels · 3 E2E",
    outside:
      "Pas de couverture du code applicatif ni de validation exhaustive de SauceDemo.",
    role: [
      "Exploration et définition du périmètre",
      "Rédaction des exigences et cas de test",
      "Architecture et automatisation Playwright",
      "Traçabilité et contrôles de couverture",
      "CI/CD, rapports et portail QA",
      "Cadrage et validation des agents IA",
    ],
    decisions: [
      [
        "Concevoir avant d’automatiser",
        "Formaliser fonctionnalités, User Stories et critères avant les cas de test pour rendre la couverture justifiable.",
      ],
      [
        "Rendre la traçabilité exécutable",
        "Relire automatiquement documents et tests actifs afin de détecter les références absentes ou incohérentes.",
      ],
      [
        "Caractériser les comportements dégradés",
        "Surveiller les comptes spéciaux sans transformer leurs anomalies volontaires en exigences nominales.",
      ],
      [
        "Cibler les parcours E2E",
        "Limiter les E2E aux transitions entre domaines et éviter de dupliquer les 33 cas fonctionnels.",
      ],
      [
        "Stabiliser l’interface",
        "Centraliser les locators dans les Page Objects et attendre explicitement les états observables.",
      ],
      [
        "Encadrer les agents IA",
        "Confronter chaque proposition aux exigences, au typage, aux contrôles qualité et à l’exécution.",
      ],
    ],
    risks: [
      "Évolution possible de l’application publique SauceDemo.",
      "Comportements des comptes spéciaux à reconfirmer dans le temps.",
      "Couverture limitée au périmètre QA documenté, sans accès au code produit.",
    ],
    recommendations: [
      "Régénérer les rapports après toute évolution de la démonstration.",
      "Reconfirmer régulièrement les tests de caractérisation.",
      "Conserver la séparation entre couverture fonctionnelle et couverture de code.",
    ],
    verdict:
      "Périmètre clôturable : 36 tests Playwright, couverture documentée à 100 %, contrôles qualité 3/3 validés et portail public.",
    code: [
      [
        "Page Object et synchronisation",
        /inventory.*page\.ts$/i,
        "Centralisation des interactions et attente explicite d’un état UI observable.",
      ],
      [
        "Parcours E2E",
        /tests\/.*e2e.*\.spec\.ts$/i,
        "Validation ciblée des transitions entre authentification, catalogue, panier et checkout.",
      ],
      [
        "Couverture exécutable",
        /reporting\/.*coverage.*\.(?:js|mjs|ts)$/i,
        "Contrôle automatique des relations entre exigences, cas et tests actifs.",
      ],
    ],
  },
  "french-companies": {
    context:
      "Frontend public de recherche d’entreprises françaises dépendant d’une API gouvernementale externe, publique, read-only et composée de données volatiles.",
    scope:
      "13 fonctionnalités · 84 tests · 6 API réels · 75 UI maîtrisés · 3 E2E réels",
    outside:
      "Pas de validation exhaustive des règles métier de l’API gouvernementale ni de couverture du code de l’application.",
    role: [
      "Exploration du frontend et du contrat observable",
      "Conception fondée sur les risques",
      "Plans de test pour 13 User Stories",
      "Automatisation API, UI maîtrisée et E2E",
      "Documentation de 14 anomalies produit",
      "Audit, CI/CD, reporting et agents IA",
    ],
    decisions: [
      [
        "Séparer frontend et dépendance externe",
        "Tester les responsabilités du frontend sans inventer les règles métier de l’API gouvernementale.",
      ],
      [
        "Privilégier le niveau le plus bas utile",
        "Répartir la confiance entre API réelle, UI maîtrisée et trois frontières E2E réelles.",
      ],
      [
        "Conserver une référence attendue correcte",
        "Neutraliser explicitement 12 scénarios bloqués par des défauts plutôt que d’accepter un résultat produit incorrect.",
      ],
      [
        "Attendre des événements précis",
        "Préparer les attentes réseau avant l’action et éviter les temporisations arbitraires.",
      ],
      [
        "Tester les états persistants",
        "Vérifier persistance, rechargement, limites et absence d’effets de bord entre les stockages.",
      ],
      [
        "Rendre les métriques honnêtes",
        "Présenter 100 % comme couverture du périmètre défini, jamais comme garantie globale ou code coverage.",
      ],
    ],
    risks: [
      "Disponibilité du réseau et de l’API publique pour les tests réels.",
      "Volatilité des données gouvernementales.",
      "14 défauts produit ouverts, dont 12 scénarios neutralisés.",
      "Deux dettes d’accessibilité documentées.",
    ],
    recommendations: [
      "Maintenir des assertions API structurelles et tolérantes.",
      "Traiter prioritairement les défauts rattachés aux scénarios neutralisés.",
      "Conserver les trois E2E réels comme frontières critiques.",
      "Harmoniser les tags si des campagnes filtrées sont introduites.",
    ],
    verdict:
      "Projet techniquement clôturable dans le périmètre retenu : baseline verte, dette produit visible, audit final réalisé et preuves publiques.",
    code: [
      [
        "Page Object principal",
        /tests\/ui\/pages\/search\.page\.ts$/i,
        "Actions et locators de la recherche centralisés sans masquer les assertions métier.",
      ],
      [
        "Tests du contrat API",
        /tests\/api\/.*\.(?:spec|test)\.ts$/i,
        "Requêtes réelles et assertions centrées sur le contrat observable plutôt que sur des données volatiles.",
      ],
      [
        "Pipeline public",
        /\.github\/workflows\/playwright\.ya?ml$/i,
        "Validation de la qualité, de la couverture, des tests et des rapports avant publication.",
      ],
    ],
  },
};
function createCaseStudy() {
  const section = document.createElement("section");
  section.id = "vue-etude";
  section.className = "dashboard-view";
  section.dataset.viewPanel = "etude";
  section.innerHTML = '<div id="case-content"></div>';
  document.querySelector("#vue-resultats").before(section);
  renderCaseStudy();
  if (state.view === "etude") switchView("etude");
}
function renderCaseStudy() {
  const host = document.querySelector("#case-content"),
    data = CASE_STUDIES[state.lab.id];
  if (!host) return;
  host.innerHTML = `<div class="case-hero"><article class="panel"><p class="case-kicker">MON RÔLE · PROJET PERSONNEL OPEN SOURCE</p><h2>${esc(state.lab.name)}</h2><p class="case-intro">${esc(data.context)}</p><div class="role-list">${data.role.map((item) => `<span><i class="fa-solid fa-check"></i>${esc(item)}</span>`).join("")}</div></article><article class="panel scope-card"><div><b>PÉRIMÈTRE</b><span>${esc(data.scope)}</span></div><div><b>HORS PÉRIMÈTRE</b><span>${esc(data.outside)}</span></div><div><b>RESPONSABILITÉ</b><span>Conception et réalisation de bout en bout par Maxime Joannis.</span></div></article></div><section class="panel case-section"><div class="panel-heading"><div><p>RAISONNEMENT QA</p><h2>Pourquoi ces choix ?</h2></div></div><div class="decision-grid">${data.decisions.map((item, index) => `<article class="decision-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></article>`).join("")}</div></section><section class="panel case-section"><div class="panel-heading"><div><p>DÉCISION ET SUITE</p><h2>Bilan QA</h2></div></div><div class="assessment-grid"><article><h3>Risques résiduels</h3><ul>${data.risks.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article><article><h3>Recommandations</h3><ul>${data.recommendations.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article></div><div class="case-verdict"><i class="fa-solid fa-circle-check"></i>${esc(data.verdict)}</div><p class="case-source">Source : Sprint Review et audit final du projet.</p></section><section class="panel case-section"><div class="panel-heading"><div><p>PREUVES TECHNIQUES</p><h2>Extraits de code commentés</h2></div><span class="open-source-badge"><i class="fa-brands fa-github"></i> Sources publiques</span></div><div id="code-grid" class="code-grid"><div class="code-state"><span class="loader"></span> Lecture des fichiers publics du dépôt…</div></div></section>`;
  loadCodeSamples(state.lab.id);
}
function excerpt(source) {
  const lines = source.split("\n"),
    start = Math.max(
      0,
      lines.findIndex((line) =>
        /class |test\(|test\.describe|jobs:|function |const /.test(line),
      ),
    );
  return lines.slice(start, start + 28).join("\n");
}
async function loadCodeSamples(labId) {
  const host = document.querySelector("#code-grid"),
    data = CASE_STUDIES[labId];
  try {
    const tree = await githubDataCache.json(
        `https://api.github.com/repos/${state.lab.repo}/git/trees/main?recursive=1`,
      ),
      selections = data.code
        .map((item) => [
          item,
          (tree.tree || []).find(
            (file) => file.type === "blob" && item[1].test(file.path),
          )?.path,
        ])
        .filter((item) => item[1]),
      samples = await Promise.all(
        selections.map(async ([meta, path]) => ({
          meta,
          path,
          source: await githubDataCache.text(
            `https://raw.githubusercontent.com/${state.lab.repo}/main/${path}`,
          ),
        })),
      );
    if (state.lab.id !== labId) return;
    host.innerHTML = samples.length
      ? samples
          .map(
            (sample) =>
              `<article class="code-card"><header><b>${esc(sample.meta[0])}</b><a href="https://github.com/${state.lab.repo}/blob/main/${sample.path}" target="_blank" rel="noopener noreferrer">${esc(sample.path)} <i class="fa-solid fa-arrow-up-right-from-square"></i></a></header><p>${esc(sample.meta[2])}</p><pre><code>${esc(excerpt(sample.source))}</code></pre></article>`,
          )
          .join("")
      : '<div class="code-state">Aucun fichier correspondant trouvé dans l’arborescence publique.</div>';
  } catch (error) {
    host.innerHTML =
      '<div class="code-state">Les extraits sont temporairement indisponibles. Le dépôt complet reste accessible depuis le bouton Repository.</div>';
  }
}
const setLabBeforeCaseStudy = setLab;
setLab = function (id) {
  setLabBeforeCaseStudy(id);
  if (document.querySelector("#case-content")) renderCaseStudy();
};
document.addEventListener("DOMContentLoaded", createCaseStudy);
