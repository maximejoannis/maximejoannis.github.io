# QA Automation Lab Dashboard

Application single-page multi-projets de Maxime Joannis, intégralement en français et réalisée en HTML5, CSS3 et JavaScript vanilla.

## Vues

- Projet et traçabilité : domaine métier, sélection d'une User Story, description, tableau des critères et cas associés
- Résultats QA : métriques, répartition et stratégie de test
- Registre des anomalies LAB_02 : sélecteur d'anomalie, gravité, reproduction, résultats attendu et observé, User Story et critères associés
- Portail QA : accès aux preuves publiées de chaque projet
- Pipeline CI/CD : workflows et exécutions GitHub Actions, graphiques et stabilité
- Risques & couverture : matrice fonctionnelle sans probabilité, impact, niveau de risque et priorité QA
- Journal d’apprentissage : enseignements issus des Sprint Reviews de chaque projet
- Dashboard QA enrichi : couverture par fonctionnalité, stratégie de test, contrôles qualité automatisés et historique public GitHub Actions
- Nature fonctionnelle : scénarios passants, non passants et d’erreur calculés depuis les tags publics du dépôt French Companies Explorer
- Accueil animé : cockpit QA, chaîne de valeur, agents Playwright et accès direct aux projets open source
- Page d’entrée indépendante : l’accueil masque le dashboard jusqu’à l’action « Entrer dans le QualityOps Lab »
- Accueil sans défilement : hero et cockpit sur un écran unique, sans chaîne QA, sélection de projets ni terminal
- Accueil professionnel : accroche « Apprendre par l’exploration. Construire par l’automatisation. Déployer avec confiance. » et accès directs aux profils LinkedIn et GitHub
- Orbites QA : Planner, Generator et Healer représentés par trois planètes animées autour du cockpit de validation humaine
- Étude de cas : rôle personnel, décisions QA, bilan, risques résiduels, recommandations et extraits de code chargés depuis GitHub
- Anomalies enrichies : environnement, statut et preuve documentaire, avec absence de donnée explicitement signalée
- Résultats SauceDemo détaillés : indicateurs finaux, périmètre par fonctionnalité, couverture de traçabilité, classification 15/3/15, priorités P0/P1/P2, campagnes Smoke/Regression, 3 parcours E2E et 7 tests de caractérisation issus de la Sprint Review
- Résultats French Companies détaillés : baseline 84 tests, répartition 72 passed / 12 fixme / 0 failed, 13 Features, niveaux API/UI mockée/E2E réel, couverture du périmètre et traitement des 14 défauts issus de la Sprint Review

Le sélecteur de laboratoire actualise toutes les vues. Les plans de test et les données de pipeline sont chargés depuis les repositories publics GitHub. Chaque réponse valide est conservée dans le cache du navigateur. Si GitHub est indisponible, l'application utilise la sauvegarde la plus récente entre ce cache et `data/github-snapshot.json`, puis indique clairement que les données affichées sont conservées.

## Actualisation du snapshot GitHub

Le workflow `.github/workflows/update-github-snapshot.yml` actualise automatiquement le snapshot chaque jour et peut aussi être lancé manuellement depuis GitHub Actions. Le script `scripts/update-github-snapshot.mjs` ne collecte que des informations publiques et n'expose aucun token dans le navigateur.

Pour générer le snapshot localement :

```bash
node scripts/update-github-snapshot.mjs
```

## Lancement

Pour que les requêtes GitHub fonctionnent correctement, lancer un serveur statique dans ce dossier :

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.
