"use strict";

function replaceTechnicalVocabulary(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("[data-verbatim]")) return; // textes des bilans repris tels quels
    node.nodeValue = node.nodeValue
      .replace(/\boracles\b/gi, "références attendues")
      .replace(/\boracle\b/gi, "référence attendue")
      .replace(/\bfailures\b/gi, "échecs inattendus")
      .replace(/\bUser Stories\b/g, "récits utilisateurs")
      .replace(/\bUser Story\b/g, "récit utilisateur")
      .replace(/\bTest Cases\b/g, "cas de test")
      .replace(/\bFeatures\b/g, "fonctionnalités")
      .replace(/\bPipeline CI\/CD\b/g, "Intégration continue")
      .replace(/\bPipeline stable\b/gi, "État documenté")
      .replace(
        /\bBaseline Playwright verte\b/g,
        "État de référence Playwright validé",
      )
      .replace(/\bSmoke et Regression\b/g, "Tests rapides et régression")
      .replace(/\bworkflow\b/gi, "processus")
      .replace(/\bReporting & qualité\b/g, "Rapports et qualité");
  });
}

function installRecruiterHome() {
  const home = document.querySelector("#vue-accueil");
  if (!home) return;

  home.querySelector(".home-eyebrow").innerHTML =
    "<i></i> INGÉNIERIE QUALITÉ · PREUVES VÉRIFIABLES";
  home.querySelector(".home-hello").textContent =
    "Bonjour, je suis Maxime Joannis";

  const oldHeading = home.querySelector(".home-copy h2");
  const heading = document.createElement("h1");
  heading.innerHTML = "<span>QualityOps</span> Lab";
  oldHeading.replaceWith(heading);

  home.querySelector(".home-lead").textContent =
    "Je transforme des risques produit en stratégie de test, automatisation fiable et preuves reproductibles.";
  home.querySelector(".home-description").textContent =
    "Deux études de cas publiques montrent comment je conçois les tests avant de les automatiser, choisis le niveau de test utile, protège la référence attendue et garde les défauts connus visibles.";

  const primary = home.querySelector(".home-primary");
  primary.innerHTML =
    'Explorer les études de cas <i class="fa-solid fa-arrow-right"></i>';
  const secondary = home.querySelector(".home-secondary");
  secondary.innerHTML =
    'Voir les preuves <i class="fa-solid fa-file-shield"></i>';
  secondary.dataset.homeView = "portail";

  home.querySelector(".home-stack").innerHTML = [
    "Stratégie de test",
    "Tests fondés sur les risques",
    "Traçabilité",
    "API · UI · E2E",
    "CI/CD",
    "IA sous contrôle humain",
  ]
    .map((label) => `<span>${label}</span>`)
    .join("");

  home.querySelector(".qa-flow").innerHTML = `
    <span><i class="fa-solid fa-shield-halved"></i><b>Risque métier</b></span><em></em>
    <span><i class="fa-solid fa-book-open"></i><b>Récit utilisateur</b></span><em></em>
    <span><i class="fa-solid fa-list-check"></i><b>Critère</b></span><em></em>
    <span><i class="fa-solid fa-vial"></i><b>Test</b></span><em></em>
    <span><i class="fa-solid fa-code-branch"></i><b>Résultat CI</b></span><em></em>
    <span><i class="fa-solid fa-file-shield"></i><b>Preuve</b></span>`;

  const projects = home.querySelector(".home-projects");
  projects.querySelector("header p").textContent = "ÉTUDES DE CAS PUBLIQUES";
  projects.querySelector("header h2").textContent =
    "Deux problèmes QA complémentaires";
  const cards = projects.querySelectorAll("article");
  cards[0].querySelector("p").textContent =
    "Concevoir une régression traçable : 32 critères, 33 cas fonctionnels et 3 parcours E2E ciblés.";
  cards[0]
    .querySelector("div:nth-child(2)")
    .insertAdjacentHTML(
      "beforeend",
      "<small>100 % du périmètre QA défini — ni couverture du code, ni validation exhaustive.</small>",
    );
  cards[1].querySelector("p").textContent =
    "Obtenir un signal fiable malgré une API externe volatile : 6 tests API, 75 UI maîtrisés et 3 E2E.";
  cards[1]
    .querySelector("div:nth-child(2)")
    .insertAdjacentHTML(
      "beforeend",
      "<small>72 réussis · 12 neutralisés · 14 défauts documentés.</small>",
    );

  projects.insertAdjacentHTML(
    "afterend",
    `<section class="home-proof-grid" aria-labelledby="quality-principles-title">
      <article class="home-comparison">
        <p>COMPLÉMENTARITÉ</p><h2>Ce que démontrent les deux projets</h2>
        <div class="table-scroll"><table><caption>Comparaison des compétences démontrées</caption><thead><tr><th>Compétence</th><th>SauceDemo</th><th>French Companies</th></tr></thead><tbody>
          <tr><td>Stratégie et traçabilité</td><td>Oui</td><td>Oui</td></tr>
          <tr><td>Tests API réels</td><td>Hors périmètre</td><td>6</td></tr>
          <tr><td>Gestion d’une dépendance volatile</td><td>Hors périmètre</td><td>Démontrée</td></tr>
          <tr><td>Défauts documentés</td><td>Caractérisation</td><td>14 rapports</td></tr>
          <tr><td>Intégration continue</td><td>Oui</td><td>Oui + tests multi-navigateurs ciblés</td></tr>
        </tbody></table></div>
      </article>
      <article class="home-philosophy"><p>MA FAÇON D’ABORDER LA QUALITÉ</p><h2 id="quality-principles-title">Le raisonnement avant l’outil</h2><ul>
        <li>Automatiser les risques significatifs, pas tout sans distinction.</li>
        <li>Utiliser le niveau de test le plus bas qui apporte une confiance utile.</li>
        <li>Conserver le résultat attendu même lorsqu’un défaut bloque le scénario.</li>
        <li>Rendre la dette, les limites et les preuves visibles.</li>
        <li>Utiliser l’IA comme assistance, avec validation humaine systématique.</li>
      </ul></article>
    </section>`,
  );
}

function markActiveDetailView(view) {
  document.querySelectorAll("[data-detail-view]").forEach((button) => {
    button.setAttribute("aria-current", button.dataset.detailView === view ? "page" : "false");
  });
}
const switchViewBeforeDetailNav = switchView;
switchView = function (view) {
  switchViewBeforeDetailNav(view);
  markActiveDetailView(view);
};

function installSimplifiedNavigation() {
  ["resultats", "risques", "apprentissage"].forEach((view) => {
    document
      .querySelector(`.view-nav [data-view="${view}"]`)
      ?.classList.add("nav-detail");
  });

  const nav = document.createElement("nav");
  nav.className = "detail-navigation";
  nav.setAttribute("aria-label", "Approfondir le projet");
  nav.innerHTML = `
    <span>Approfondir :</span>
    <button data-detail-view="resultats">Résultats</button>
    <button data-detail-view="risques">Risques et couverture</button>
    <button data-detail-view="bilan">Problèmes et solutions</button>
    <button data-detail-view="apprentissage">Enseignements</button>`;
  document.querySelector(".topbar").after(nav);
  nav
    .querySelectorAll("[data-detail-view]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        switchView(button.dataset.detailView),
      ),
    );
  markActiveDetailView(state.view);
}

function addMetricContext() {
  document
    .querySelector("#vue-projet .metric-grid")
    ?.insertAdjacentHTML(
      "afterend",
      '<p class="metric-context">Source : exigences et plans de test versionnés. Les pourcentages portent exclusivement sur le périmètre QA explicitement défini.</p>',
    );
  document
    .querySelector("#vue-resultats .metric-grid")
    ?.insertAdjacentHTML(
      "afterend",
      '<p class="metric-context">Source : dernière baseline documentée dans la revue de sprint et les rapports publics. Une baseline historique ne garantit pas la qualité future du produit.</p>',
    );
}

document.addEventListener("DOMContentLoaded", () => {
  installRecruiterHome();
  installSimplifiedNavigation();
  addMetricContext();
  replaceTechnicalVocabulary();
  const observer = new MutationObserver((records) => {
    records.forEach((record) =>
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE)
          replaceTechnicalVocabulary(node);
      }),
    );
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
