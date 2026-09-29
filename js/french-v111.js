"use strict";
// LAB_03 records the documented v1.1.1 state. LAB_02 remains the historical v1.0.0 baseline.
const V111_ID = "french-companies-v111";
const V111_FEATURES = [["Recherche",11],["Filtres",20],["Pagination",6],["Tri",7],["Détail",5],["Favoris",6],["Statistiques",6],["Comparaison",15],["Historique",10],["Recherches sauvegardées",8],["Export",15],["Deep linking",7],["Autocomplétion",10],["Partage",7],["Thème",3]];
const v111 = LABS[V111_ID] = {
  ...LABS["french-companies"], id: V111_ID, code: "LAB_03", name: "French Companies Explorer · v1.1.1",
  summary: "Évolution de la suite QA de French Companies Explorer : 136 tests Playwright pour 143 cas planifiés, 18 User Stories couvertes, et trois anomalies ouvertes suivies par des échecs attendus.",
  metrics: [{value:18,label:"User Stories couvertes"},{value:"136/143",label:"Cas automatisés / planifiés"},{value:"172/181",label:"Critères vérifiés"},{value:3,label:"Anomalies ouvertes"}],
  results: {
    total:136, passed:133, fixme:3, failed:0, defects:3,
    levels:[{name:"API réelle",value:6},{name:"UI mockée",value:127},{name:"E2E réels",value:3}],
    insights:[
      {title:"136 tests découverts",text:"133 tests actifs ordinaires et trois scénarios test.fail() ; leur statut dépend de l’exécution publiée."},
      {title:"Aucun test désactivé",text:"Les trois scénarios liés à BUG-005, BUG-015 et BUG-016 utilisent test.fail() ; aucun test.fixme()."},
      {title:"Couverture définie",text:"18 User Stories couvertes ; 172/181 critères vérifiés (95,0 %) et 136/143 cas automatisés. Sept cas restent à couvrir."}
    ]
  },
  trace: { ...LABS["french-companies"].trace }
};
// Both studies point to the same evolving repository; make their historical scope explicit.
LABS["french-companies"].name = "French Companies Explorer · v1.0.0";
LABS["french-companies"].summary = "Baseline historique v1.0.0 : 84 tests automatisés, dont 72 réussis et 12 neutralisés pour des défauts connus. Le dépôt lié présente désormais la v1.1.1.";
PROJECT_ENHANCEMENTS[V111_ID] = {domain:"Données publiques · évolution v1.1.1",image:LABS["french-companies"].image};
CASE_STUDIES[V111_ID] = {
  context:"Après la baseline v1.0.0, la suite d'automatisation de French Companies Explorer a été étendue pour couvrir de nouveaux comportements de recherche, de comparaison, d'export, d'autocomplétion et de partage. L'application publique, la suite Playwright et le portail QA sont trois éléments distincts.",
  scope:"18 User Stories · 15 domaines · 143 cas planifiés dont 136 automatisés · 6 API réels · 127 UI mockés · 3 E2E réels",
  outside:"Neuf critères applicables et sept cas planifiés restent sans vérification automatisée. La couverture ne mesure pas le code ni l'ensemble de l'application ou des API publiques.",
  role:["Extension des plans et scénarios de test","Séparation des vérifications API, UI et E2E","Automatisation des erreurs et des réponses concurrentes","Traçabilité User Story → critère → cas → test","Qualification et suivi des anomalies connues","Contrôles qualité, rapports et publication du portail"],
  decisions:[
    ["Pourquoi élargir la suite ?","La v1.0.0 comptait 84 tests. La v1.1.1 en découvre 136, mais sept cas planifiés restent à automatiser. Elle ajoute des filtres, l’autocomplétion, le partage, la comparaison à trois et un export configurable : chacun apporte de nouveaux comportements à vérifier."],
    ["Pourquoi passer de 12 tests désactivés à zéro ?","En v1.0.0, douze tests ne s’exécutaient pas à cause de défauts. En v1.1.1, les corrections permettent de les rejouer ; seuls trois bugs restent ouverts et leurs tests continuent à tourner."],
    ["Pourquoi accepter trois échecs ?","BUG-005, BUG-015 et BUG-016 ont chacun une assertion ciblée avec test.fail(). Le scénario reste exécuté ; si le produit est corrigé, le succès inattendu demande de retirer l’exception."],
    ["Pourquoi séparer les scénarios ?","Le test de recherche vérifiait aussi un texte d’accueil devenu faux. La recherche réelle et le texte ont maintenant leurs propres cas : on sait tout de suite ce qui a échoué."],
    ["Pourquoi distinguer deux appels à la même API ?","Les suggestions d’autocomplétion ajoutent minimal=true à une requête de recherche. Les tests de favoris, d’historique et de filtres ignorent cet appel auxiliaire lorsqu’ils attendent la recherche complète."],
    ["Pourquoi renforcer la CI et le portail ?","Les rapports sont conservés même après un échec, puis un contrôle final décide si la publication est possible. Le portail distingue un bug connu d’une régression ou d’un succès inattendu. Une CI conforme ne valide pas entièrement la release."]
  ],
  risks:["Trois anomalies produit ouvertes : BUG-005, BUG-015 et BUG-016.","Données et disponibilité des API gouvernementales variables.","Les résultats documentés sont une photographie de la campagne de référence et ne décrivent pas chaque exécution future."],
  recommendations:["Corriger les trois anomalies dans le dépôt de l'application et retirer ensuite les marqueurs test.fail().","Conserver les assertions structurelles sur les API réelles et les scénarios déterministes sur l'UI.","Recalculer les rapports après chaque changement de périmètre ou de produit."],
  source:"BILAN-V1.1.1.md, plan de test v1.1.1 et exigences du dépôt.",
  verdict:"v1.1.1 documentée : 136 tests Playwright, 172/181 critères vérifiés, 136/143 cas automatisés et 3 anomalies ouvertes. La release reste incomplètement validée tant que ces écarts demeurent.",
  code:[
    ["Page Object principal",/tests\/ui\/pages\/search\.page\.ts$/i,"Interactions réutilisables, assertions métier conservées dans les tests."],
    ["Autocomplétion",/tests\/ui\/specs\/.*autocomplete.*\.spec\.ts$/i,"Contrôle des réponses tardives et de l'état affiché."],
    ["Pipeline QA",/\.github\/workflows\/playwright\.ya?ml$/i,"Contrôles bloquants et publication des preuves."]
  ]
};
RISK_LEARNING[V111_ID] = {risks:V111_FEATURES.map(([name],i)=>[name,i===0?"Critique":"Élevé",i===0?"Critique":"Moyen",null,i===0?"P0":"P1"]),lessons:[]};
QA_DETAILS[V111_ID] = {
  coverage:V111_FEATURES.map(([name,n])=>[name,n,n,0]),
  strategy:[["API réelle",6],["UI avec données maîtrisées",127],["E2E avec API réelle",3]],
  gates:[["Qualité du code","Prettier, ESLint et TypeScript"],["Couverture QA","18/18 US · 172/181 AC · 136/143 cas"],["Tests Playwright","136 tests découverts · 3 échecs attendus"],["Rapports","Playwright, Allure et couverture QA"],["Portail public","État du run publié vérifiable"]]
};
SYNTHESIS[V111_ID] = {
  accent:"#84cc16",objectives:["Étendre la suite à 136 tests et suivre 7 cas à automatiser","Tester API réelle, interface simulée et intégrations réelles","Reproduire les erreurs et réponses réseau concurrentes","Suivre explicitement les trois anomalies ouvertes","Publier les rapports et contrôles qualité"],
  domains:V111_FEATURES,numbers:[["18","User Stories"],["15","Domaines"],["136","Tests Playwright"],["143","Cas planifiés"],["95,0 %","AC vérifiés"],["3","Anomalies ouvertes"]],
  scenarios:[["6","API réels","fa-cloud"],["127","UI mockés","fa-window-maximize"],["3","E2E réels","fa-link"],["0","Fixme","fa-circle-check"],["3","Échecs attendus","fa-triangle-exclamation"],["0","Échec inattendu","fa-shield"]],
  principle:"18 User Stories couvertes, mais 172/181 critères et 136/143 cas vérifiés : la couverture du périmètre n’est pas complète."
};
function parseV111Stories(requirements, plan) {
  return [["US-FILTERS-02","Filtres enrichis"],["US-AUTOCOMPLETE-01","Autocomplétion"],["US-SHARE-01","Partage"],["US-COMPARE-02","Comparaison à trois"],["US-EXPORT-02","Export configurable"]].map(([id,title])=>{
    const requirement = requirements.match(new RegExp(String.raw`^## [^\n]*${id}\n([\s\S]*?)(?=\n## |(?![\s\S]))`,"m"))?.[1] || "";
    const description = requirement.trim().split("\n")[0];
    const section = plan.match(new RegExp(String.raw`^## [^\n]*${id}\n([\s\S]*?)(?=\n## |(?![\s\S]))`,"m"))?.[1] || "";
    const tests = [...section.matchAll(/^### (TC-[A-Z-]+-\d+) — ([^\n]+)\n\nAC-(\d+) · `([^`]+)` · ([^.]+)\. ([^\n]+)/gm)].map(m=>({id:m[1],title:m[2],ac:m[3],level:m[4],priority:m[5],detail:m[6]}));
    const criteria = [...requirement.matchAll(/^- `AC-(\d+)` ([^\n]+)/gm)].map(m=>({id:`${id} / AC-${m[1]}`,title:m[2],description:m[2],tests:tests.filter(t=>t.ac===m[1])}));
    return {id,title,description,criteria};
  });
}
const v111DefectPaths=["BUG-005-detail-favorite-state-not-refreshed.md","BUG-015-home-compare-copy-outdated.md","BUG-016-clear-search-keeps-city-code.md"];
let v111Defects=[];
async function loadV111Defects(){
  const panel=document.querySelector("#defects-panel");
  panel.querySelector(".panel-heading span").textContent="3 anomalies ouvertes";
  panel.querySelector(".panel-heading h2").textContent="Anomalies encore ouvertes · v1.1.1";
  try{
    if(!v111Defects.length)v111Defects=await Promise.all(v111DefectPaths.map(async path=>parseDefect(await githubDataCache.text(`https://raw.githubusercontent.com/maximejoannis/french-companies-explorer-playwright-agents/main/defects/${path}`),path)));
    if(state.lab.id!==V111_ID)return;
    const select=document.querySelector("#defect-select");
    select.innerHTML=v111Defects.map((d,i)=>`<option value="${i}">${esc(d.id)} · ${esc(d.title)}</option>`).join("");
    select.onchange=()=>renderV111Defect(Number(select.value));
    renderV111Defect(0);
  }catch(error){document.querySelector("#defect-detail").innerHTML='<p>Les trois fiches sont momentanément indisponibles. Consultez le dépôt du projet.</p>'}
}
function renderV111Defect(index){
  const d=v111Defects[index];if(!d)return;
  document.querySelector("#defect-detail").innerHTML=`<header><div><span>${esc(d.id)}</span><h3>${esc(d.title)}</h3></div></header><div class="defect-metadata"><span><b>Statut</b>Anomalie ouverte</span><span><b>Source</b><a href="https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/defects/${d.path}" target="_blank" rel="noopener noreferrer">Fiche versionnée</a></span></div><section><h4>Résultat attendu</h4><p>${md(d.expected)}</p></section><section><h4>Résultat observé</h4><p>${md(d.observed)}</p></section>`;
}
const renderQaDetailsBeforeV111 = renderQaDetails;
renderQaDetails = function(){
  renderQaDetailsBeforeV111();
  if(state.lab.id===V111_ID)document.querySelectorAll("#qa-dashboard-details > .qa-section").forEach(section=>section.hidden=false);
};
const updateDefectsViewBeforeV111 = updateDefectsView;
updateDefectsView = function(lab){
  if(lab.id!==V111_ID){
    const panel=document.querySelector("#defects-panel");
    if(panel){
      document.querySelector("#defect-select").onchange=null;
      panel.querySelector(".panel-heading span").textContent="14 anomalies · baseline v1.0.0";
      panel.querySelector(".panel-heading h2").textContent="Registre des défauts — French Companies Explorer";
    }
    return updateDefectsViewBeforeV111(lab);
  }
  const panel=document.querySelector("#defects-panel");
  if(panel){panel.hidden=false;loadV111Defects()}
};
// The standard results view uses these names for every project; specify the v1.1.1 semantics.
const renderResultsBeforeV111 = renderResults;
renderResults = function(){
  renderResultsBeforeV111();
  if(state.lab.id!==V111_ID)return;
  const cards=document.querySelectorAll("#result-metrics .metric-card");
  if(cards[3]){cards[3].querySelector("span").textContent="ANOMALIES OUVERTES";cards[3].querySelector("small").textContent="BUG-005 · BUG-015 · BUG-016"}
  if(cards[1]){cards[1].querySelector("span").textContent="TESTS ORDINAIRES";cards[1].querySelector("small").textContent="133 hors scénarios test.fail()"}
  if(cards[2]){cards[2].querySelector("span").textContent="ÉCHECS ATTENDUS";cards[2].querySelector("small").textContent="3 test.fail() · 0 fixme"}
  const legend=document.querySelector("#results-legend");
  if(legend)legend.innerHTML='<li><i style="background:#22c55e"></i>Tests ordinaires · 133</li><li><i style="background:#f59e0b"></i>Échecs attendus · 3</li><li><i style="background:#ef4444"></i>Échecs inattendus · 0</li>';
};
document.addEventListener("DOMContentLoaded",()=>{
  const home=document.querySelector("#vue-accueil");
  const grid=home?.querySelector(".project-choice-grid");
  if(grid){
    const card=document.createElement("article");
    card.innerHTML='<div class="project-choice-code">03</div><div><span>ÉVOLUTION QA · V1.1.1</span><h3>French Companies Explorer · v1.1.1</h3><p>136 tests Playwright, 18 User Stories, 7 cas à automatiser et 3 bugs ouverts.</p></div><button data-home-project="french-companies-v111" aria-label="Explorer French Companies Explorer v1.1.1"><i class="fa-solid fa-arrow-right"></i></button>';
    grid.append(card);
    const count=home.querySelector(".home-projects header > span");if(count)count.textContent="3 études de cas · 256 tests documentés sur trois versions";
    home.querySelectorAll(".home-projects article")[1]?.querySelector("span")?.append(" · V1.0.0");
    card.querySelector("button").addEventListener("click",()=>{setLab(V111_ID);switchView("etude")});
  }
  const description=home?.querySelector(".home-description");
  if(description)description.textContent="Trois études de cas publiques suivent la conception, la baseline et l'évolution d'une automatisation QA fondée sur les risques et des preuves vérifiables.";
  const title=home?.querySelector(".home-projects header h2");if(title)title.textContent="Trois études de cas QA";
  const comparison=home?.querySelector(".home-comparison h2");if(comparison)comparison.textContent="Deux terrains, trois étapes QA";
  const frenchColumn=home?.querySelector(".home-comparison thead th:last-child");if(frenchColumn)frenchColumn.textContent="French Companies · v1.0.0 → v1.1.1";
  const defectCell=home?.querySelector(".home-comparison tbody tr:nth-child(4) td:last-child");if(defectCell)defectCell.textContent="3 anomalies ouvertes en v1.1.1";
  const terminal=home?.querySelector(".home-terminal p:nth-child(2)");if(terminal)terminal.innerHTML="<i>✓</i> 256 tests documentés sur trois versions";
});
