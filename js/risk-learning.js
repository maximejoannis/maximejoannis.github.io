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
        "Fonctionnalité → User Story → critère d’acceptation → cas de test → automatisation.",
      ],
      [
        "Rendre la traçabilité exécutable",
        "Les contrôles automatiques détectent les divergences que la lecture seule peut laisser passer.",
      ],
      [
        "Séparer les responsabilités",
        "Page Objects, fixtures, données, spécifications et reporting ont des rôles distincts.",
      ],
      [
        "Cibler les E2E",
        "Quelques parcours transverses apportent de la valeur sans dupliquer les 33 cas fonctionnels.",
      ],
      [
        "Traiter le framework comme un produit",
        "Typage, lint, formatage, robustesse et rapports participent à la qualité.",
      ],
      [
        "Encadrer l’IA",
        "Planner, Generator et Healer assistent le workflow ; les preuves restent dans le dépôt et la CI.",
      ],
      [
        "Éviter la sur-complexité",
        "L’architecture reste proportionnée à l’application de démonstration et à son périmètre documenté.",
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
        "Protéger la référence attendue",
        "Une donnée externe volatile ne doit pas devenir une référence fragile : distinguer contrat observable, contenu variable et règle du produit.",
      ],
      [
        "Choisir le bon niveau de test",
        "Les mocks ciblés et les E2E sélectifs apportent plus de signal qu’une duplication systématique.",
      ],
      [
        "Garder la dette visible",
        "Un test vert ne doit pas être obtenu en affaiblissant le résultat attendu ; un fixme explicite matérialise la dette connue.",
      ],
      [
        "Ne pas inventer le contrat externe",
        "L’absence de connaissance sur une dépendance doit rester une absence de connaissance.",
      ],
      [
        "Synchroniser sur un événement observable",
        "Attendre une réponse ou un état précis est plus robuste qu’une durée supposée suffisante.",
      ],
      [
        "Tester la persistance et ses frontières",
        "Vérifier la continuité de l’état voulu ainsi que l’absence d’effets de bord sur les autres domaines.",
      ],
      [
        "Définir honnêtement les métriques",
        "Le taux de 100 % décrit le périmètre fonctionnel retenu, pas l’ensemble du produit.",
      ],
      [
        "Industrialiser les preuves QA",
        "Une preuve doit être reproductible, accessible et compréhensible ; reporting et CI font partie du produit d’automatisation.",
      ],
      [
        "Encadrer l’IA",
        "L’IA est utile lorsqu’elle est cadrée, vérifiée et revue par un humain.",
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
