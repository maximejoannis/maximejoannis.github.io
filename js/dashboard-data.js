"use strict";
const LABS = {
  saucedemo: {
    id: "saucedemo",
    code: "LAB_01",
    name: "SauceDemo",
    domain: "Commerce électronique",
    image: "assets/images/synthese-saucedemo.png",
    type: "AUTOMATISATION UI",
    summary:
      "Automatisation fonctionnelle structurée d'une application e-commerce : conception, traçabilité, Page Object Model, fixtures, E2E, reporting et CI/CD.",
    app: "https://www.saucedemo.com/",
    repo: "maximejoannis/saucedemo-playwright-agents",
    portal: "https://maximejoannis.github.io/saucedemo-playwright-agents/",
    metrics: [
      { value: 6, label: "Fonctionnalités" },
      { value: 6, label: "User Stories" },
      { value: 32, label: "Critères d'acceptation" },
      { value: 33, label: "Cas fonctionnels" },
    ],
    results: {
      total: 36,
      passed: 36,
      fixme: 0,
      failed: 0,
      defects: 0,
      levels: [
        { name: "Fonctionnels UI", value: 33 },
        { name: "E2E", value: 3 },
      ],
      insights: [
        {
          title: "Périmètre automatisé",
          text: "Les 32 critères définis sont reliés à au moins un cas de test.",
        },
        {
          title: "Automatisation structurée",
          text: "Les tests utilisent Playwright, TypeScript, Page Objects et fixtures.",
        },
        {
          title: "Limite explicite",
          text: "Le taux de 100 % porte sur le périmètre QA documenté, pas sur toute l'application.",
        },
      ],
    },
    trace: {
      kind: "sauce",
      files: [
        "tests/requirements/user-stories.md",
        "tests/requirements/acceptance-criteria.md",
        "tests/requirements/traceability-matrix.md",
      ],
    },
  },
  "french-companies": {
    id: "french-companies",
    code: "LAB_02",
    name: "French Companies Explorer",
    domain: "Données publiques et recherche d'entreprises françaises",
    image: "assets/images/synthese-french-companies.png",
    type: "API · UI MOCKÉE · E2E RÉEL",
    summary:
      "Stratégie QA multi-niveaux d'un explorateur de données d'entreprises françaises connecté à l'API publique Recherche d'Entreprises : contrat API réel, comportements frontend déterministes, E2E ciblés, cross-browser et défauts documentés.",
    app: "https://maximejoannis.github.io/french-companies-explorer-qa/",
    repo: "maximejoannis/french-companies-explorer-playwright-agents",
    portal:
      "https://maximejoannis.github.io/french-companies-explorer-playwright-agents/",
    metrics: [
      { value: 13, label: "Fonctionnalités" },
      { value: 13, label: "User Stories" },
      { value: 64, label: "Critères d'acceptation" },
      { value: 83, label: "Cas de test planifiés" },
    ],
    results: {
      total: 84,
      passed: 72,
      fixme: 12,
      failed: 0,
      defects: 14,
      levels: [
        { name: "API réelle", value: 6 },
        { name: "UI mockée", value: 75 },
        { name: "E2E réels", value: 3 },
      ],
      insights: [
        {
          title: "72 tests réussis",
          text: "Les résultats passés sont distingués des scénarios temporairement fixme ou skipped.",
        },
        {
          title: "12 limitations connues",
          text: "La/be dette connue reste visible et traçable au lieu d'être masquée.",
        },
        {
          title: "14 défauts documentés",
          text: "Chaque anomalie documentée apporte une information QA utile.",
        },
      ],
    },
    trace: {
      kind: "plans",
      files: [
        "specs/company/TEST-PLAN-US-COMPARE-01.md",
        "specs/company/TEST-PLAN-US-DETAIL-01.md",
        "specs/company/TEST-PLAN-US-FAVORITES-01.md",
        "specs/deep-linking/TEST-PLAN-US-DEEP-LINKING-01.md",
        "specs/export/TEST-PLAN-US-EXPORT-01.md",
        "specs/history/TEST-PLAN-US-HISTORY-01.md",
        "specs/saved-searches/TEST-PLAN-US-SAVED-SEARCH-01.md",
        "specs/search/TEST-PLAN-US-FILTERS-01.md",
        "specs/search/TEST-PLAN-US-PAGINATION-01.md",
        "specs/search/TEST-PLAN-US-SEARCH-01.md",
        "specs/search/TEST-PLAN-US-SORT-01.md",
        "specs/stats/TEST-PLAN-US-STATS-01.md",
        "specs/theme/TEST-PLAN-US-THEME-01.md",
      ],
    },
  },
};
const VIEW_META = {
  accueil: ["QUALITYOPS LAB", "Accueil"],
  projet: ["RÉFÉRENTIEL QA", "Vue d’ensemble"],
  resultats: ["TABLEAU DE BORD", "Résultats QA"],
  portail: ["PREUVES PUBLIÉES", "Preuves"],
  pipeline: ["OBSERVABILITÉ", "Intégration continue"],
};
