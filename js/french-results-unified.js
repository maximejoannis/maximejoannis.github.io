"use strict";
// French Companies uses the same reading sequence as SauceDemo: indicators,
// functional scope, traceability, classification, campaigns, E2E and known defects.
const FRENCH_STUDIES = {
  "french-companies": {
    version:"v1.0.0 · référence historique", summary:[
      ["Fonctionnalités couvertes","13/13"],["User Stories couvertes","13/13"],["TC planifiés automatisés","83/83"],["Tests Playwright","84"],
      ["Tests réussis","72"],["Tests neutralisés","12"],["API / UI / E2E","6 / 75 / 3"],["Anomalies documentées à cette date","14"],
      ["Couverture des TC planifiés","100 %"],["Échecs inattendus","0"]
    ], features:FRENCH_RESULTS.features, us:"13", planned:83, automated:83, total:84, active:72, expected:0, neutralized:12,
    levels:[["API réelle",6,"#3b82f6"],["UI mockée",75,"#8b5cf6"],["E2E réel",3,"#22c55e"]],
    coverage:[["User Stories","13/13",100],["TC planifiés automatisés","83/83",100]],
    attention:[["Tests réussis",72],["Tests neutralisés",12]],
    campaigns:[["Chromium complet","84","72 réussis · 12 neutralisés","Baseline documentée"],["Firefox et WebKit","6 smokes ciblés","Campagne complémentaire","Historique"]],
    note:"La baseline v1.0.0 est historique. Le 84e test, TC-SAVED-008, complétait les 83 cas initialement planifiés.",
    defects:"14 défauts documentés dans cette baseline, dont douze scénarios alors neutralisés. Ce chiffre décrit la v1.0.0, pas les anomalies encore ouvertes dans la v1.1.1."
  },
  "french-companies-v111": {
    version:"v1.1.1 · état du dépôt", summary:[
      ["Domaines fonctionnels","15"],["User Stories couvertes","18/18"],["AC vérifiés","172/181"],["TC automatisés / planifiés","136/143"],
      ["Tests Playwright","136"],["Tests actifs ordinaires","133"],["Scénarios test.fail()","3"],["API / UI / E2E","6 / 127 / 3"],
      ["Couverture des AC","95,0 %"],["Anomalies ouvertes","3"]
    ],features:V111_FEATURES.map(([name,n])=>[name,n]),us:"18",planned:143,automated:136,total:136,active:133,expected:3,neutralized:0,
    levels:[["API réelle",6,"#3b82f6"],["UI mockée",127,"#8b5cf6"],["E2E réel",3,"#22c55e"]],
    coverage:[["User Stories","18/18",100],["AC applicables vérifiés","172/181",172/181*100],["TC planifiés automatisés","136/143",136/143*100]],
    attention:[["AC restant à vérifier",9],["TC restant à automatiser",7],["Anomalies ouvertes",3]],
    campaigns:[["Chromium complet","136 tests découverts","133 ordinaires · 3 test.fail()","État documenté"],["Firefox et WebKit","6 smokes ciblés","3 par navigateur","État documenté"]],
    note:"Sept cas planifiés restent sans automatisation. Les 133 tests actifs ordinaires et les 3 scénarios test.fail() forment les 136 tests Playwright ; 95,0 % des critères applicables sont vérifiés.",
    defects:"BUG-005, BUG-015 et BUG-016 restent ouverts. Leurs assertions sont exécutées avec test.fail() : la CI peut être conforme avec ces anomalies connues sans que la release soit entièrement validée."
  }
};
const FRENCH_COLORS=["#3b82f6","#06b6d4","#8b5cf6","#f59e0b","#22c55e","#ec4899","#14b8a6","#a78bfa","#fb7185","#60a5fa","#fbbf24","#34d399","#818cf8","#f472b6","#84cc16"];
function createUnifiedFrenchResults(){
  if(document.querySelector("#french-unified-results"))return;
  const anchor=document.querySelector("#qa-dashboard-details");if(!anchor)return;
  const root=document.createElement("div");root.id="french-unified-results";root.hidden=true;
  root.innerHTML=`
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>RÉSULTATS DOCUMENTÉS</p><h2>Indicateurs du périmètre QA défini</h2></div><span class="source-badge">README du projet</span></div><div class="sauce-summary-grid" id="fu-summary"></div><p class="sauce-scope-note" id="fu-scope"></p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>PÉRIMÈTRE FONCTIONNEL</p><h2 id="fu-feature-title"></h2></div></div><div class="sauce-feature-layout"><div class="table-scroll"><table><caption>Cas automatisés par domaine fonctionnel</caption><thead><tr><th>Domaine</th><th>Tests</th><th>Part de la suite</th></tr></thead><tbody id="fu-features"></tbody><tfoot><tr><th>Total</th><th id="fu-feature-total"></th><th>100 % des tests recensés</th></tr></tfoot></table></div><div><div class="donut sauce-donut" id="fu-feature-donut"><span></span></div><ul class="sauce-legend" id="fu-feature-legend"></ul></div></div><p class="sauce-fact" id="fu-feature-note"></p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>CONCEPTION ET TRAÇABILITÉ</p><h2>Couverture du périmètre défini</h2></div><span class="coverage-pill" id="fu-coverage-pill"></span></div><div class="sauce-coverage-bars" id="fu-coverage"></div><div class="trace-chain"><span>Fonctionnalité</span><i>→</i><span>User Story</span><i>→</i><span>Critère</span><i>→</i><span>Cas planifié</span><i>→</i><span>Test Playwright</span></div></section>
    <section class="sauce-three-grid"><article class="panel sauce-section"><div class="qa-section-head"><div><p>CLASSIFICATION</p><h2>API, UI et E2E</h2></div></div><div class="donut-layout compact"><div class="donut sauce-donut" id="fu-level-donut"><span></span></div><ul class="sauce-legend" id="fu-level-legend"></ul></div></article><article class="panel sauce-section"><div class="qa-section-head"><div><p>POINTS D'ATTENTION</p><h2 id="fu-attention-title"></h2></div></div><div class="sauce-priority-bars" id="fu-attention"></div><p class="sauce-mini-note" id="fu-attention-note"></p></article><article class="panel sauce-section"><div class="qa-section-head"><div><p>CAMPAGNES</p><h2>Exécutions documentées</h2></div></div><div class="table-scroll"><table class="campaign-table"><thead><tr><th>Campagne</th><th>Volume</th><th>Lecture</th><th>Source</th></tr></thead><tbody id="fu-campaigns"></tbody></table></div></article></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>PARCOURS TRANSVERSES</p><h2>3 E2E réels complémentaires</h2></div><span class="composition-badge" id="fu-composition-badge"></span></div><div class="sauce-e2e-layout"><div class="sauce-e2e-list"><article><b>E2E-01</b><div><strong>Recherche et affichage</strong><p>Du navigateur à l'API Entreprises réelle.</p></div></article><article><b>E2E-02</b><div><strong>Filtre Commune</strong><p>Geo API → code INSEE → API Entreprises.</p></div></article><article><b>E2E-03</b><div><strong>Ouverture du détail</strong><p>Un résultat réel mène à sa fiche.</p></div></article></div><div><div class="donut sauce-donut" id="fu-composition-donut"><span></span></div><ul class="sauce-legend" id="fu-composition-legend"></ul></div></div><p class="sauce-fact">Les trois E2E sont inclus dans le total Playwright et ne s'ajoutent pas une seconde fois aux cas automatisés.</p></section>
    <section class="panel sauce-section characterization"><div class="qa-section-head"><div><p>ANOMALIES ET LIMITES</p><h2 id="fu-defect-title"></h2></div><span class="character-count" id="fu-defect-count"></span></div><p id="fu-defect-copy"></p></section>`;
  anchor.before(root);
}
function frenchUnifiedDonut(selector,segments,total){const node=document.querySelector(selector);let cursor=0;node.style.background=`conic-gradient(${segments.map(([count,color])=>{const start=cursor;cursor+=count/total*100;return`${color} ${start}% ${cursor}%`}).join(",")})`;node.querySelector("span").textContent=total}
function renderUnifiedFrenchResults(){
  createUnifiedFrenchResults();const root=document.querySelector("#french-unified-results");if(!root)return;
  const d=FRENCH_STUDIES[state.lab.id];root.hidden=!d;
  const old=document.querySelector("#french-results-deep-dive");if(old)old.hidden=true;
  if(!d)return;
  document.querySelectorAll("#qa-dashboard-details > .qa-section").forEach((section,index)=>{if(index<2)section.hidden=true});
  const $f=id=>document.querySelector(`#fu-${id}`), e=esc;
  $f("summary").innerHTML=d.summary.map(([label,value])=>`<article><span>${e(label)}</span><strong>${e(value)}</strong></article>`).join("");
  $f("scope").textContent=state.lab.id===V111_ID?"95,0 % des critères applicables sont vérifiés et 136 des 143 cas planifiés sont automatisés. Sept cas restent à traiter. La couverture ne mesure pas le code source ni toute l'application.":"La couverture de 100 % concerne les 83 cas initialement planifiés de la baseline v1.0.0. Elle ne signifie ni couverture de code ni absence de défauts.";
  $f("feature-title").textContent=`${d.features.length} domaines · ${d.us} User Stories · ${d.total} tests`;
  $f("features").innerHTML=d.features.map(([name,count])=>`<tr><td><strong>${e(name)}</strong></td><td>${count}</td><td>${(count/d.total*100).toFixed(1).replace(".",",")} %</td></tr>`).join("");
  $f("feature-total").textContent=d.total;
  frenchUnifiedDonut("#fu-feature-donut",d.features.map((row,i)=>[row[1],FRENCH_COLORS[i%FRENCH_COLORS.length]]),d.total);
  $f("feature-legend").innerHTML=d.features.map(([name,n],i)=>`<li><i style="background:${FRENCH_COLORS[i%FRENCH_COLORS.length]}"></i>${e(name)} · ${n}</li>`).join("");
  $f("feature-note").textContent=d.note;
  $f("coverage-pill").textContent=state.lab.id===V111_ID?"172/181 critères · 136/143 cas":"83/83 cas planifiés";
  $f("coverage").innerHTML=d.coverage.map(([name,ratio,pct])=>`<div><span>${e(name)}</span><div><i style="width:${pct}%"></i></div><b>${e(ratio)} · ${pct.toFixed(1).replace(".",",")} %</b></div>`).join("");
  frenchUnifiedDonut("#fu-level-donut",d.levels.map(row=>[row[1],row[2]]),d.total);
  $f("level-legend").innerHTML=d.levels.map(([name,n,color])=>`<li><i style="background:${color}"></i>${e(name)} · ${n}</li>`).join("");
  $f("attention-title").textContent=state.lab.id===V111_ID?"Travail restant et bugs":"État de la baseline";
  const max=Math.max(...d.attention.map(row=>row[1]));$f("attention").innerHTML=d.attention.map(([name,n])=>`<div><span>${e(name)}</span><div><i style="width:${n/max*100}%"></i></div><b>${n}</b></div>`).join("");
  $f("attention-note").textContent=state.lab.id===V111_ID?"Ne pas confondre les sept cas non automatisés avec les trois anomalies produit ouvertes.":"Les douze tests fixme étaient neutralisés dans la v1.0.0.";
  $f("campaigns").innerHTML=d.campaigns.map(row=>`<tr>${row.map(cell=>`<td>${e(cell)}</td>`).join("")}</tr>`).join("");
  $f("composition-badge").textContent=`${d.levels[0][1]} API + ${d.levels[1][1]} UI + 3 E2E = ${d.total}`;
  frenchUnifiedDonut("#fu-composition-donut",d.levels.map(row=>[row[1],row[2]]),d.total);
  $f("composition-legend").innerHTML=$f("level-legend").innerHTML;
  $f("defect-title").textContent=state.lab.id===V111_ID?"3 anomalies encore ouvertes":"Défauts de la baseline historique";
  $f("defect-count").textContent=state.lab.id===V111_ID?"3 BUG":"14 rapports";
  $f("defect-copy").textContent=d.defects;
}
const renderQaDetailsBeforeUnifiedFrench=renderQaDetails;
renderQaDetails=function(){renderQaDetailsBeforeUnifiedFrench();renderUnifiedFrenchResults()};
document.addEventListener("DOMContentLoaded",renderUnifiedFrenchResults);
