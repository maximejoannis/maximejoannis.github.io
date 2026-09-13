# QualityOps Lab

> **Apprendre par l’exploration. Construire par l’automatisation. Déployer avec confiance.**

Portfolio QA open source de **Maxime Joannis**, construit avec Playwright Test, TypeScript et GitHub Actions. Le QualityOps Lab rassemble dans une seule application la stratégie de test, la traçabilité, les résultats, les risques, les anomalies, les agents IA et l’observabilité CI/CD de plusieurs projets.

[Accéder au QualityOps Lab](https://maximejoannis.github.io/) · [Profil LinkedIn](https://www.linkedin.com/in/maxime-joannis/) · [Profil GitHub](https://github.com/maximejoannis)

## Les laboratoires

| Projet | Domaine | Périmètre QA | Résultats documentés |
| --- | --- | --- | --- |
| [SauceDemo QA Automation](https://github.com/maximejoannis/saucedemo-playwright-agents) | E-commerce | 6 fonctionnalités, 6 User Stories, 32 critères, 33 TC fonctionnels et 3 E2E | 36 tests Playwright, couverture de 100 % du périmètre défini, Quality Gate 3/3 PASS |
| [French Companies Explorer](https://github.com/maximejoannis/french-companies-explorer-playwright-agents) | Données publiques et recherche d’entreprises françaises | 13 Features et 84 Test Cases | 72 passed, 12 fixme/skipped connus, 0 échec inattendu et 14 défauts documentés |

> Les taux de couverture présentés concernent exclusivement les périmètres QA définis et documentés. Ils ne constituent ni une couverture du code source, ni une validation exhaustive des applications ou de leurs dépendances.

## Ce que permet le Lab

Le sélecteur de projet actualise l’ensemble des vues :

- **Projet & traçabilité** : domaine métier, User Stories, critères d’acceptation et cas de test associés ;
- **Étude de cas** : rôle personnel, décisions QA, risques résiduels, recommandations et extraits de code commentés ;
- **Résultats QA** : chiffres issus des Sprint Reviews, tableaux, répartitions et graphiques propres à chaque projet ;
- **Risques & couverture** : matrice des risques, impacts et priorités de test ;
- **Journal d’apprentissage** : enseignements tirés des deux réalisations ;
- **Portail QA** : accès aux preuves et rapports publiés ;
- **Pipeline CI/CD** : workflows, exécutions GitHub Actions et stabilité observée.

### SauceDemo

- répartition des 33 TC par fonctionnalité ;
- 15 scénarios passants, 3 non passants et 15 scénarios d’erreur ;
- priorités P0/P1/P2 et campagnes Smoke/Regression ;
- 3 parcours E2E complémentaires ;
- 7 tests de caractérisation associés aux comptes spéciaux.

### French Companies Explorer

- 84 TC répartis sur 13 Features ;
- 6 tests API réels, 75 tests UI mockés et 3 E2E réels ;
- 72 passed, 12 fixme/skipped et 0 failed ;
- écart documenté entre 83 TC planifiés et 84 automatisés ;
- 14 défauts, dont 12 associés à des fixme et 2 dettes d’accessibilité sans fixme.

## IA appliquée à la QA

Le Lab documente un usage encadré des agents IA natifs Playwright :

- **Planner** : exploration, risques, User Stories, critères et stratégie ;
- **Generator** : production ciblée des tests Playwright ;
- **Healer** : diagnostic des échecs et proposition de correction ;
- **validation humaine** : conservation de l’intention du test et contrôle des oracles.

Les agents assistent la démarche ; les décisions QA et les preuves restent vérifiables dans les dépôts et la CI.

## Données GitHub résilientes

Les vues dynamiques interrogent les données publiques des dépôts GitHub. Le Lab utilise trois niveaux de disponibilité :

1. données GitHub en direct ;
2. dernier résultat valide conservé dans le cache du navigateur ;
3. snapshot versionné dans `data/github-snapshot.json`.

Si l’API GitHub est indisponible, la dernière donnée connue reste affichée avec sa date et son origine. Aucun token GitHub n’est exposé dans le navigateur.

Le workflow `.github/workflows/update-github-snapshot.yml` actualise automatiquement le snapshot chaque jour et peut être lancé manuellement.

## Technologies

- HTML5, CSS3 et JavaScript vanilla ;
- Playwright Test et TypeScript dans les projets QA ;
- GitHub Actions et GitHub Pages ;
- API publique GitHub ;
- rapports Playwright, Allure, couverture QA et qualité ;
- agents Playwright Planner, Generator et Healer.

## Architecture

```text
.
├── .github/workflows/              # Actualisation du snapshot
├── assets/                         # Icônes
├── css/                            # Styles des vues et graphiques
├── data/github-snapshot.json       # Dernières données GitHub conservées
├── js/                             # Données, navigation et vues dynamiques
├── scripts/update-github-snapshot.mjs
├── index.html
└── README.md
```

Ouvrir ensuite [http://localhost:8080](http://localhost:8080).

Pour actualiser manuellement le snapshot :

```bash
node scripts/update-github-snapshot.mjs
```

## Portails QA

- [Portail QA SauceDemo](https://maximejoannis.github.io/saucedemo-playwright-agents/)
- [Portail QA French Companies Explorer](https://maximejoannis.github.io/french-companies-explorer-playwright-agents/)

## Auteur

**Maxime Joannis** — conception QA, automatisation Playwright, reporting, CI/CD et documentation.

[LinkedIn](https://www.linkedin.com/in/maxime-joannis/) · [GitHub](https://github.com/maximejoannis)
