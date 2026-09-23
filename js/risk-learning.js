"use strict";
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="css/risk-learning.css">',
);
const RISK_LEARNING = {
  saucedemo: {
    risks: [
      ["Authentification", "Critique", "Élevé", 100, "P0"],
      ["Catalogue", "Élevé", "Moyen", 100, "P1"],
      ["Tri", "Moyen", "Moyen", 100, "P1"],
      ["Panier", "Élevé", "Élevé", 100, "P0"],
      ["Checkout", "Critique", "Critique", 100, "P0"],
      ["Session", "Élevé", "Élevé", 100, "P0"],
    ],
    lessons: [
      [
        "Concevoir avant d’automatiser",
        "J’ai appris qu’avant d’automatiser un test, il faut d’abord savoir clairement ce que l’on veut vérifier et pourquoi.",
      ],
      [
        "Rendre la traçabilité utile",
        "J’ai compris que relier chaque test à un besoin précis permet de savoir immédiatement ce qui est réellement vérifié.",
      ],
      [
        "Bien organiser le projet",
        "J’ai appris qu’une structure claire rend les tests plus faciles à comprendre, à modifier et à maintenir dans le temps.",
      ],
      [
        "Choisir les parcours essentiels",
        "J’ai compris qu’il vaut mieux tester quelques parcours utilisateurs vraiment importants plutôt que de vouloir tout tester de bout en bout.",
      ],
      [
        "Soigner ses outils de test",
        "J’ai appris qu’un outil de test doit être pensé avec autant de soin que le produit qu’il sert à vérifier.",
      ],
      [
        "Garder le contrôle sur l’IA",
        "J’ai compris que l’IA peut accélérer mon travail, mais que je dois toujours pouvoir vérifier et expliquer ce qu’elle produit.",
      ],
      [
        "Rester simple",
        "J’ai appris qu’une solution simple et adaptée au besoin est souvent plus efficace qu’une solution inutilement complexe.",
      ],
    ],
  },
  "french-companies": {
    risks: [
      ["Recherche", "Critique", "Critique", 100, "P0"],
      ["Filtres", "Élevé", "Élevé", 100, "P1"],
      ["Pagination", "Moyen", "Moyen", 100, "P1"],
      ["Tri", "Moyen", "Moyen", 100, "P1"],
      ["Détail entreprise", "Élevé", "Élevé", 100, "P0"],
      ["Favoris", "Moyen", "Moyen", 100, "P1"],
      ["Statistiques", "Moyen", "Moyen", 100, "P1"],
      ["Comparaison", "Élevé", "Élevé", 100, "P1"],
      ["Historique", "Moyen", "Moyen", 100, "P1"],
      ["Recherches sauvegardées", "Élevé", "Élevé", 100, "P1"],
      ["Export", "Élevé", "Élevé", 100, "P0"],
      ["Deep linking", "Élevé", "Élevé", 100, "P1"],
      ["Thème", "Faible", "Faible", 100, "P2"],
    ],
    lessons: [
      [
        "Tester ce qui reste fiable dans le temps",
        "J’ai appris que lorsque des données extérieures peuvent changer, il faut construire les tests autour de ce qui reste réellement prévisible.",
      ],
      [
        "Choisir le bon type de test",
        "J’ai compris que chaque problème ne se teste pas de la même manière et qu’il faut choisir l’approche la plus adaptée à ce que l’on veut vérifier.",
      ],
      [
        "Rendre les problèmes visibles",
        "J’ai appris qu’un problème connu doit rester visible plutôt que d’adapter artificiellement le test pour qu’il réussisse.",
      ],
      [
        "Ne pas supposer ce que l’on ne sait pas",
        "J’ai compris qu’il vaut mieux reconnaître une information manquante sur un service extérieur que construire un test sur une supposition.",
      ],
      [
        "Attendre le bon signal",
        "J’ai appris qu’il est plus fiable d’attendre qu’une action soit réellement terminée que d’attendre un délai choisi au hasard.",
      ],
      [
        "Vérifier que les données restent cohérentes",
        "J’ai compris qu’il faut vérifier que les informations importantes sont bien conservées sans provoquer d’effets indésirables ailleurs.",
      ],
      [
        "Donner du sens aux chiffres",
        "J’ai appris qu’un indicateur comme « 100 % de couverture » n’a de valeur que si l’on explique clairement ce qu’il mesure.",
      ],
      [
        "Rendre les résultats faciles à vérifier",
        "J’ai compris que les résultats des tests doivent pouvoir être facilement retrouvés, reproduits et compris par toute l’équipe.",
      ],
      [
        "Garder le contrôle sur l’IA",
        "J’ai appris à utiliser l’IA comme un assistant pour gagner du temps, tout en gardant la responsabilité de vérifier le résultat final.",
      ],
    ],
  },
};
function riskClass(value) {
  if (value === "Critique") return "critical";
  if (value === "Élevé") return "high";
  if (value === "Moyen") return "medium";
  return "low";
}
function installRiskLearning() {
  document
    .querySelector("#vue-portail")
    .insertAdjacentHTML(
      "beforebegin",
      '<section class="dashboard-view" id="vue-risques" data-view-panel="risques"><article class="panel"><div class="panel-heading"><div><p>PILOTAGE PAR LE RISQUE</p><h2>Matrice des risques et de la couverture</h2></div></div><div id="risk-summary" class="risk-summary"></div><div class="table-scroll"><table class="risk-table"><caption>Matrice des risques fonctionnels</caption><thead><tr><th>Fonctionnalité</th><th>Impact</th><th>Niveau de risque</th><th>Couverture automatisée</th><th>Priorité QA</th></tr></thead><tbody id="risk-table"></tbody></table></div><p class="method-note"><i class="fa-solid fa-circle-info"></i> La couverture indique la part du périmètre QA documenté disposant d’une automatisation. Elle ne garantit ni l’absence de défauts ni une couverture exhaustive du produit.</p></article></section><section class="dashboard-view" id="vue-apprentissage" data-view-panel="apprentissage"><article class="panel"><div class="panel-heading"><div><p>RETOUR D’EXPÉRIENCE</p><h2>Journal d’apprentissage</h2></div></div><div id="learning-grid" class="learning-grid"></div><p class="learning-source"><i class="fa-solid fa-book-open"></i>Source : section « Enseignements » de la Sprint Review du projet sélectionné.</p></article></section>',
    );
  renderRiskLearning();
  if (state.view === "risques" || state.view === "apprentissage")
    switchView(state.view);
}
function renderRiskLearning() {
  const data = RISK_LEARNING[state.lab.id],
    counts = data.risks.reduce((a, r) => (a[riskClass(r[2])]++, a), {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    });
  document.querySelector("#risk-summary").innerHTML =
    `<div><span>DOMAINES ANALYSÉS</span><strong>${data.risks.length}</strong><small>Périmètre fonctionnel</small></div><div><span>RISQUES CRITIQUES / ÉLEVÉS</span><strong>${counts.critical + counts.high}</strong><small>Surveillance prioritaire</small></div><div><span>COUVERTURE DU PÉRIMÈTRE</span><strong>100 %</strong><small>Automatisation documentée</small></div>`;
  document.querySelector("#risk-table").innerHTML = data.risks
    .map(
      (r) =>
        `<tr><td><strong>${r[0]}</strong></td><td><span class="risk-level risk-${riskClass(r[1])}">${r[1]}</span></td><td><span class="risk-level risk-${riskClass(r[2])}">${r[2]}</span></td><td class="coverage-cell"><div class="coverage-line"><div class="coverage-track"><i style="width:${r[3]}%"></i></div><b>${r[3]} %</b></div></td><td><span class="risk-priority">${r[4]}</span></td></tr>`,
    )
    .join("");
  document.querySelector("#learning-grid").innerHTML = data.lessons
    .map(
      (item, index) =>
        `<article class="learning-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`,
    )
    .join("");
}
VIEW_META.risques = ["PILOTAGE QA", "Risques & couverture"];
VIEW_META.apprentissage = ["RETOUR D’EXPÉRIENCE", "Journal d’apprentissage"];
const setLabBeforeRiskLearning = setLab;
setLab = function (id) {
  setLabBeforeRiskLearning(id);
  if (document.querySelector("#risk-table")) renderRiskLearning();
};
document.addEventListener("DOMContentLoaded", installRiskLearning);
