"use strict";
document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="css/saucedemo-results.css">');

const SAUCE_RESULTS={
  summary:[
    ["Fonctionnalités couvertes","6/6"],["User Stories couvertes","6/6"],["Acceptance Criteria couverts","32/32"],["TC fonctionnels automatisés","33/33"],
    ["TC passants / non passants / erreurs","15 / 3 / 15"],["Priorités P0 / P1 / P2","5 / 26 / 2"],["E2E complémentaires","3"],["Tests Playwright globaux","36"],
    ["Couverture du périmètre QA défini","100 %"],["Quality Gate","3/3 PASS"]
  ],
  features:[
    ["Authentification","US-01",5,5],["Catalogue","US-02",4,4],["Tri","US-03",6,6],["Panier","US-04",5,6],["Checkout","US-05",8,8],["Session","US-06",4,4]
  ],
  nature:[["Passants","@positive",15,"positive"],["Non passants","@negative",3,"negative"],["Erreurs","@error",15,"error"]],
  priorities:[["P0",5],["P1",26],["P2",2]],
  campaigns:[["Smoke",5,1,6],["Regression",33,3,36]],
  e2e:[
    ["E2E-01","Achat complet","Authentification → Catalogue → Panier → Checkout"],
    ["E2E-02","Blocage fonctionnel au checkout","Validation du nom manquant sans quitter l’étape d’informations"],
    ["E2E-03","Protection de session","Déconnexion puis refus d’une route protégée"]
  ],
  characterization:["TC-CAT-04","TC-TRI-05","TC-TRI-06","TC-PAN-05","TC-PAN-06","TC-CHK-07","TC-CHK-08"]
};

function sauceDonut(id,total,segments,center){
  const node=document.querySelector(id);let cursor=0;
  node.style.background=`conic-gradient(${segments.map(segment=>{const start=cursor;cursor+=segment[1]/total*100;return`${segment[2]} ${start}% ${cursor}%`}).join(",")})`;
  node.querySelector("span").textContent=center;
}

function createSauceResults(){
  if(document.querySelector("#sauce-results-deep-dive"))return;
  const anchor=document.querySelector("#qa-dashboard-details");if(!anchor)return;
  const panel=document.createElement("div");panel.id="sauce-results-deep-dive";
  panel.innerHTML=`
    <section class="panel sauce-section sauce-summary"><div class="qa-section-head"><div><p>RÉSULTATS FINAUX</p><h2>Indicateurs du périmètre QA défini</h2></div><span class="source-badge"><i class="fa-solid fa-file-lines"></i> Sprint Review</span></div><div class="sauce-summary-grid" id="sauce-summary-grid"></div><p class="sauce-scope-note"><i class="fa-solid fa-circle-info"></i> La couverture de 100 % désigne la couverture automatisée du périmètre QA défini et documenté. Elle ne représente ni l’ensemble de SauceDemo, ni une couverture exhaustive de l’application, ni une couverture du code source.</p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>PÉRIMÈTRE FONCTIONNEL</p><h2>6 fonctionnalités · 6 User Stories · 32 critères · 33 TC</h2></div></div><div class="sauce-feature-layout"><div class="table-scroll"><table><caption>Périmètre fonctionnel SauceDemo</caption><thead><tr><th>Fonctionnalité</th><th>User Story</th><th>Acceptance Criteria</th><th>TC fonctionnels</th></tr></thead><tbody id="sauce-feature-body"></tbody><tfoot><tr><th>Total</th><th>6 US</th><th>32</th><th>33</th></tr></tfoot></table></div><div><div class="donut sauce-donut" id="sauce-feature-donut"><span>33</span></div><ul class="sauce-legend" id="sauce-feature-legend"></ul></div></div><p class="sauce-fact">AC-CART-05 est volontairement vérifié par deux TC distincts afin de caractériser les deux comptes spéciaux concernés.</p></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>CONCEPTION ET TRAÇABILITÉ</p><h2>Couverture automatisée du périmètre QA défini</h2></div><span class="coverage-pill">100 % sur les 4 niveaux</span></div><div class="sauce-coverage-bars" id="sauce-coverage-bars"></div><div class="trace-chain"><span>Fonctionnalité</span><i>→</i><span>User Story</span><i>→</i><span>Acceptance Criteria</span><i>→</i><span>Test Case</span><i>→</i><span>Playwright</span></div></section>
    <section class="sauce-three-grid"><article class="panel sauce-section"><div class="qa-section-head"><div><p>CLASSIFICATION</p><h2>Nature des 33 TC</h2></div></div><div class="donut-layout compact"><div class="donut sauce-donut" id="sauce-nature-donut"><span>33</span></div><ul class="sauce-legend" id="sauce-nature-legend"></ul></div></article><article class="panel sauce-section"><div class="qa-section-head"><div><p>CRITICITÉ QA</p><h2>Priorités P0 / P1 / P2</h2></div></div><div class="sauce-priority-bars" id="sauce-priority-bars"></div><p class="sauce-mini-note">La priorité exprime la criticité QA ; Smoke et Regression définissent une stratégie d’exécution.</p></article><article class="panel sauce-section"><div class="qa-section-head"><div><p>CAMPAGNES</p><h2>Smoke et Regression</h2></div></div><table class="campaign-table"><thead><tr><th>Campagne</th><th>Fonct.</th><th>E2E</th><th>Total</th></tr></thead><tbody id="sauce-campaign-body"></tbody></table><p class="sauce-mini-note">La Smoke couvre l’accès, le catalogue, l’ajout au panier, la commande et la déconnexion.</p></article></section>
    <section class="panel sauce-section"><div class="qa-section-head"><div><p>PARCOURS TRANSVERSES</p><h2>3 E2E complémentaires</h2></div><span class="composition-badge">33 TC + 3 E2E = 36 tests</span></div><div class="sauce-e2e-layout"><div class="sauce-e2e-list" id="sauce-e2e-list"></div><div><div class="donut sauce-donut" id="sauce-composition-donut"><span>36</span></div><ul class="sauce-legend"><li><i style="background:#3b82f6"></i>TC fonctionnels · 33</li><li><i style="background:#a78bfa"></i>E2E complémentaires · 3</li></ul></div></div><p class="sauce-fact">Les E2E vérifient les transitions entre domaines. Ils ne sont pas comptés comme de nouveaux TC, de nouvelles User Stories ou de nouveaux Acceptance Criteria.</p></section>
    <section class="panel sauce-section characterization"><div class="qa-section-head"><div><p>TESTS DE CARACTÉRISATION</p><h2>7 comportements dégradés observés</h2></div><span class="character-count">7 TC</span></div><div class="character-tags" id="character-tags"></div><p>Ces tests documentent volontairement des comportements observés avec <code>problem_user</code> et <code>error_user</code> : images dégradées, tris inopérants, ajouts partiels et blocages au checkout. Ils ne décrivent pas les comportements nominaux attendus d’une application e-commerce et devront être reconfirmés si la démonstration publique évolue.</p><div class="locked-note"><i class="fa-solid fa-lock"></i><span><strong>Cas distinct : locked_out_user</strong> Son refus de connexion correspond à la règle fonctionnelle attendue pour un compte verrouillé ; il ne constitue pas un test de caractérisation.</span></div></section>`;
  anchor.parentNode.insertBefore(panel,anchor);
}

function renderSauceDeepDive(){
  createSauceResults();const root=document.querySelector("#sauce-results-deep-dive");if(!root)return;root.hidden=state.lab.id!=="saucedemo";document.querySelectorAll("#qa-dashboard-details > .qa-section").forEach((section,index)=>{if(index<2)section.hidden=state.lab.id==="saucedemo"});if(root.hidden)return;
  document.querySelector("#sauce-summary-grid").innerHTML=SAUCE_RESULTS.summary.map(([label,value])=>`<article><span>${label}</span><strong>${value}</strong></article>`).join("");
  document.querySelector("#sauce-feature-body").innerHTML=SAUCE_RESULTS.features.map(row=>`<tr><td><strong>${row[0]}</strong></td><td><code>${row[1]}</code></td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join("");
  const featureColors=["#3b82f6","#06b6d4","#8b5cf6","#f59e0b","#22c55e","#ec4899"];
  sauceDonut("#sauce-feature-donut",33,SAUCE_RESULTS.features.map((row,i)=>[row[0],row[3],featureColors[i]]),"33");
  document.querySelector("#sauce-feature-legend").innerHTML=SAUCE_RESULTS.features.map((row,i)=>`<li><i style="background:${featureColors[i]}"></i>${row[0]} · ${row[3]}</li>`).join("");
  document.querySelector("#sauce-coverage-bars").innerHTML=[["Fonctionnalités","6/6"],["User Stories","6/6"],["Acceptance Criteria","32/32"],["Test Cases","33/33"]].map(row=>`<div><span>${row[0]}</span><div><i></i></div><b>${row[1]} · 100 %</b></div>`).join("");
  sauceDonut("#sauce-nature-donut",33,[["Passants",15,"#22c55e"],["Non passants",3,"#f59e0b"],["Erreurs",15,"#fb7185"]],"33");
  document.querySelector("#sauce-nature-legend").innerHTML=SAUCE_RESULTS.nature.map(row=>`<li><i class="${row[3]}"></i>${row[0]} · ${row[2]} <code>${row[1]}</code></li>`).join("");
  document.querySelector("#sauce-priority-bars").innerHTML=SAUCE_RESULTS.priorities.map(([label,value])=>`<div><span>${label}</span><div><i style="width:${value/33*100}%"></i></div><b>${value}</b></div>`).join("");
  document.querySelector("#sauce-campaign-body").innerHTML=SAUCE_RESULTS.campaigns.map(row=>`<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join("");
  document.querySelector("#sauce-e2e-list").innerHTML=SAUCE_RESULTS.e2e.map(row=>`<article><b>${row[0]}</b><div><strong>${row[1]}</strong><p>${row[2]}</p></div></article>`).join("");
  sauceDonut("#sauce-composition-donut",36,[["TC",33,"#3b82f6"],["E2E",3,"#a78bfa"]],"36");
  document.querySelector("#character-tags").innerHTML=SAUCE_RESULTS.characterization.map(id=>`<code>${id}</code>`).join("");
}

const renderResultsBase=renderResults;
renderResults=function(){
  if(state.lab.id!=="saucedemo"){renderResultsBase();const headings=document.querySelectorAll("#vue-resultats .dashboard-grid > .panel .panel-heading h2");if(headings[0])headings[0].textContent="Résultats des tests";if(headings[1])headings[1].textContent="Niveaux de test";return}
  document.querySelector("#result-metrics").innerHTML=metricCards([{value:36,label:"Tests Playwright",note:"33 TC fonctionnels + 3 E2E"},{value:"33/33",label:"TC automatisés",note:"Périmètre fonctionnel documenté"},{value:"100 %",label:"Couverture QA",note:"Périmètre défini, pas couverture de code"},{value:"3/3 PASS",label:"Quality Gate",note:"Prettier, ESLint et TypeScript"}]);
  const headings=document.querySelectorAll("#vue-resultats .dashboard-grid > .panel .panel-heading h2");if(headings[0])headings[0].textContent="Composition des 36 tests";if(headings[1])headings[1].textContent="TC par fonctionnalité";
  document.querySelector("#results-donut").style.background="conic-gradient(#3b82f6 0 91.67%,#a78bfa 91.67% 100%)";document.querySelector("#results-total").textContent="36";
  document.querySelector("#results-legend").innerHTML='<li><i style="background:#3b82f6"></i>TC fonctionnels · 33</li><li><i style="background:#a78bfa"></i>E2E complémentaires · 3</li>';
  const max=8;document.querySelector("#levels-chart").innerHTML=SAUCE_RESULTS.features.map(row=>`<div class="bar-row"><span>${row[0]}</span><div><i style="width:${row[3]/max*100}%"></i></div><b>${row[3]}</b></div>`).join("");
  document.querySelector("#result-insights").innerHTML=[['Périmètre automatisé','6 fonctionnalités, 6 User Stories, 32 critères et 33 TC fonctionnels automatisés.'],['E2E ciblés','3 parcours complémentaires vérifient les transitions entre domaines sans gonfler les TC.'],['Limite explicite','Le taux de 100 % porte sur le périmètre QA documenté, jamais sur le code source.']].map(row=>`<div><strong>${row[0]}</strong><p>${row[1]}</p></div>`).join("");
};

const renderQaDetailsBase=renderQaDetails;
renderQaDetails=function(){renderQaDetailsBase();renderSauceDeepDive()};
document.addEventListener("DOMContentLoaded",()=>{renderResults();renderSauceDeepDive()});
