# Portfolio QA — Maxime Joannis

[![Portfolio](https://img.shields.io/badge/Portfolio-en%20ligne-2563eb?logo=githubpages&logoColor=white)](https://maximejoannis.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maxime%20Joannis-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maximejoannis)
[![GitHub](https://img.shields.io/badge/GitHub-maximejoannis-181717?logo=github&logoColor=white)](https://github.com/maximejoannis)

Bienvenue sur le dépôt de mon portfolio professionnel.

Ce site présente mon parcours d’**ingénieur QA technico-fonctionnel**, mes compétences en automatisation et en validation d’API, ainsi que plusieurs projets illustrant concrètement mon approche de la qualité logicielle.

## Consulter le portfolio

### [https://maximejoannis.github.io](https://maximejoannis.github.io)

## À propos de moi

Je suis ingénieur QA technico-fonctionnel, certifié ISTQB, avec une double culture en développement logiciel et en assurance qualité.

Après plusieurs années consacrées au développement, notamment dans le secteur bancaire, j’ai progressivement évolué vers des responsabilités centrées sur la validation fonctionnelle, l’analyse technique et l’automatisation des tests.

Ce parcours me permet d’intervenir à la frontière entre le métier et la technique : analyser un besoin fonctionnel, identifier les risques, comprendre l’architecture d’une application, interroger une API, contrôler les données, investiguer les journaux techniques et construire une stratégie de test adaptée.

Mon approche repose sur plusieurs principes :

- concentrer l’effort de test sur les risques réels du produit ;
- assurer la traçabilité entre exigences, tests, anomalies et résultats ;
- automatiser lorsque la répétabilité et le retour sur investissement le justifient ;
- privilégier des tests lisibles, stables et faciles à maintenir ;
- produire des indicateurs exploitables par les équipes projet ;
- favoriser une collaboration fluide entre les profils métier, QA et développement.

## Domaines d’expertise

### Automatisation des tests

- conception de frameworks Playwright ;
- automatisation de parcours fonctionnels end-to-end ;
- tests d’interface utilisateur et d’API ;
- Page Object Model ;
- fixtures et données de test ;
- intégration continue ;
- analyse de la stabilité des pipelines ;
- génération et exploitation de rapports de test.

### Tests fonctionnels et technico-fonctionnels

- analyse des exigences et des règles métier ;
- définition de stratégies de test ;
- conception et exécution de cas de test ;
- tests de régression ;
- validation des correctifs ;
- qualification et suivi des anomalies ;
- analyse d’impact ;
- aide à la décision de mise en production.

### Validation d’API

- tests d’API REST ;
- validation des méthodes HTTP ;
- contrôle des statuts et des réponses ;
- vérification des structures JSON et XML ;
- tests CRUD ;
- contrôle de la cohérence des données ;
- analyse des erreurs et des journaux ;
- utilisation de Postman, Playwright et Pytest.

### Qualité et industrialisation

- intégration continue avec GitHub Actions, GitLab et Jenkins ;
- suivi d’indicateurs de qualité ;
- analyse de la couverture fonctionnelle ;
- organisation des campagnes de test ;
- traçabilité avec Jira et Xray ;
- documentation des résultats ;
- amélioration de la testabilité des applications.

## Parcours professionnel présenté

Le portfolio retrace les principales étapes de mon parcours et met en valeur la complémentarité entre développement, validation fonctionnelle et automatisation.

### TRIYO LAB — Référent QA transverse et automatisation

Dans ce rôle, j’interviens sur le pilotage de la stratégie de test et la coordination des activités QA :

- validation de moteurs de scoring côté interface et API ;
- automatisation avec Playwright et Pytest ;
- construction de matrices décisionnelles ;
- conformité RGPD ;
- traçabilité entre tickets, tests et demandes de modification ;
- intégration des contrôles dans les pipelines CI/CD ;
- accompagnement des contributeurs QA.

### AMN Brains — SecPilot

Cette expérience porte sur la validation de processus BPMN critiques :

- définition d’une stratégie de validation à plusieurs niveaux ;
- couverture de cinq processus BPMN ;
- exécution et suivi de 53 tests ;
- gestion de 11 anomalies, dont 7 critiques ;
- validation de la non-régression avant mise en production ;
- utilisation de Camunda, CIB Seven, GitLab et d’outils de QA fonctionnelle.

### Infotel — Banque de France

Cette mission illustre un rôle hybride de développeur Full Stack et de testeur fonctionnel sur une application financière critique :

- analyse et validation d’anomalies ;
- tests de régression ;
- sécurisation des correctifs ;
- écriture de tests unitaires ;
- contrôle de traitements batch ;
- suivi des résultats dans un contexte Agile ;
- utilisation de Java, AngularJS, JUnit, Jenkins et Postman.

### Infotel — BNP Paribas

Cette expérience concerne la validation de flux microservices et d’API internes dans un contexte bancaire lié à la DSP2 :

- validation de sept API internes ;
- tests REST ;
- contrôle des formats JSON et XML ;
- vérification des statuts HTTP ;
- contrôles de cohérence en base de données ;
- analyse des journaux applicatifs ;
- vérification des mécanismes de sécurité ;
- suivi de la qualité des versions livrées.

## Projets QA présentés

Le portfolio met en avant deux frameworks actifs et deux évolutions en préparation.

### 1. SauceDemo QA Automation

Framework Playwright en JavaScript consacré à la validation des principaux parcours d’un site e-commerce de démonstration.

Le projet couvre notamment :

- l’authentification ;
- la consultation et le tri du catalogue ;
- la gestion du panier ;
- le processus de commande ;
- les contrôles de validation ;
- les scénarios positifs et négatifs ;
- la non-régression des parcours critiques.

Le framework s’appuie sur Playwright, JavaScript, une architecture Page Object Model, des fixtures réutilisables, des rapports Allure et GitHub Actions.

Le portfolio affiche également un indicateur de stabilité basé sur les dernières exécutions publiques du pipeline. L’objectif est de présenter non seulement le volume de scénarios automatisés, mais aussi leur fiabilité dans le temps.

- [Dépôt SauceDemo QA Automation](https://github.com/maximejoannis/saucedemo-qa-automation)
- [Portail QA SauceDemo](https://maximejoannis.github.io/saucedemo-qa-automation/)

### 2. Restful Booker Playwright

Framework TypeScript réunissant des tests d’interface et des tests d’API REST.

Le projet démontre l’intérêt d’une stratégie combinant plusieurs niveaux de test :

- les contrôles API apportent rapidité et précision ;
- les parcours UI vérifient le comportement visible par l’utilisateur ;
- les deux couches permettent de mieux localiser les défauts ;
- les scénarios CRUD valident le cycle de vie complet des données.

Le framework comprend Playwright, TypeScript, des modèles de données typés, des Page Objects, des contrôles HTTP, une intégration GitHub Actions et un portail QA dédié aux résultats.

- [Dépôt Restful Booker Playwright](https://github.com/maximejoannis/restful-booker-playwright)
- [Portail QA Restful Booker](https://maximejoannis.github.io/restful-booker-playwright/)

### 3. SauceDemo V2

Prochaine évolution du framework d’automatisation e-commerce. Cette itération doit approfondir l’architecture, la couverture fonctionnelle, la maintenabilité, la gestion des données, la restitution et la stabilité en intégration continue.

Le projet est actuellement présenté comme une évolution à venir.

### 4. Restful Booker V2

Nouvelle itération du framework UI et API. Cette version doit poursuivre le travail autour de la séparation des couches, du typage, de la réutilisation des composants, de la couverture CRUD et de l’industrialisation du pipeline.

La carte reste volontairement inactive jusqu’à la publication du projet.

## Mise en scène des projets

Les quatre projets sont représentés autour de la photo de profil sous la forme de cercles en mouvement :

1. SauceDemo ;
2. Restful Booker ;
3. SauceDemo V2 ;
4. Restful Booker V2.

Cette animation traduit visuellement la place centrale de l’automatisation dans mon parcours. Les orbites utilisent des vitesses et des sens de rotation différents tout en conservant la lisibilité du portrait et du contenu principal.

## Enseignements mis en avant

### L’architecture doit précéder le volume

Un grand nombre de scénarios ne suffit pas à constituer une automatisation de qualité. Une architecture simple, des responsabilités séparées, des fixtures stables et des composants réutilisables sont essentiels pour maintenir le framework dans le temps.

### Les tests UI et API sont complémentaires

Les tests API apportent des retours rapides sur les données et les contrats. Les tests UI vérifient les parcours vécus par les utilisateurs. Leur combinaison renforce la confiance tout en maîtrisant le temps d’exécution.

### La stabilité du pipeline est un indicateur qualité

Un pipeline vert à un instant donné ne garantit pas la fiabilité d’une suite automatisée. L’observation de plusieurs exécutions permet d’identifier les tests instables, les faux signaux et les dépendances fragiles.

### Le risque doit guider la profondeur de test

La criticité métier, les impacts utilisateurs, la conformité, la persistance des données et la fréquence d’utilisation doivent déterminer l’ordre des validations et le niveau d’effort consacré à chaque fonctionnalité.

## Compétences et outils

| Domaine | Compétences et outils |
|---|---|
| Automatisation | Playwright, Pytest, Page Object Model, JavaScript, TypeScript |
| QA fonctionnelle | ISTQB, stratégie de test, régression, analyse des risques, Jira, Xray |
| API | REST, Postman, contrôles HTTP, JSON, XML, scénarios CRUD |
| CI/CD | GitHub Actions, GitLab, Jenkins, Allure |
| Développement | Java, Spring, SQL, Git, outils de développement et CLI |
| Processus | BPMN, Camunda, CIB Seven, traçabilité et reporting qualité |

## Accessibilité

Le portfolio intègre plusieurs mesures destinées à rendre la navigation plus accessible :

- structure HTML sémantique ;
- lien d’accès direct au contenu principal ;
- textes alternatifs associés aux images ;
- libellés accessibles sur les éléments interactifs ;
- navigation possible au clavier ;
- messages d’état pour les filtres et le formulaire ;
- contrastes adaptés à la charte graphique ;
- mise en page responsive ;
- prise en compte de la préférence système `prefers-reduced-motion`.

Lorsque la réduction des mouvements est activée, les animations et transitions sont fortement limitées afin de préserver le confort de lecture.

## Compatibilité

Le portfolio est conçu pour fonctionner sur les versions récentes de Google Chrome, Microsoft Edge, Mozilla Firefox et Safari.

L’interface s’adapte aux ordinateurs, tablettes et smartphones. Certaines fonctionnalités, comme les indicateurs GitHub Actions ou l’envoi du formulaire, nécessitent une connexion Internet et dépendent de services externes.

## Sécurité et confidentialité

Ce dépôt et le portfolio publié sont publics. Aucun mot de passe, jeton d’accès, secret, document confidentiel ou donnée personnelle sensible ne doit être ajouté au code source.

Les indicateurs des projets utilisent uniquement les données publiques exposées par l’API GitHub. Aucun jeton privé n’est nécessaire dans le navigateur.

Le formulaire de contact transmet les informations saisies au service configuré pour son traitement. L’utilisateur doit uniquement y communiquer les informations nécessaires à sa demande.

Les liens externes ouverts dans un nouvel onglet utilisent les attributs de sécurité appropriés afin de limiter l’accès de la page distante au contexte de navigation d’origine.

## Contact

- **Portfolio :** [maximejoannis.github.io](https://maximejoannis.github.io)
- **GitHub :** [github.com/maximejoannis](https://github.com/maximejoannis)
- **LinkedIn :** [linkedin.com/in/maximejoannis](https://www.linkedin.com/in/maximejoannis)

---

**Maxime Joannis**  
Ingénieur QA technico-fonctionnel — Playwright, Pytest, API et automatisation  
Certifié ISTQB
