# Bilan du projet SauceDemo Playwright Agents

## Problèmes rencontrés et solutions mises en place

Ce document présente les principaux problèmes rencontrés pendant la conception, l’automatisation et l’industrialisation du projet **SauceDemo Playwright Agents**, ainsi que les solutions mises en place.

L’objectif initial pouvait sembler simple : **automatiser SauceDemo avec Playwright**. Au fil du projet, le travail a cependant couvert des problématiques plus larges : conception QA, traçabilité, robustesse, architecture, reporting, qualité du code, CI/CD et publication des résultats.

---

## 1. Définir précisément ce qu’on voulait tester

### Problème

Il est facile d’écrire beaucoup de tests sans savoir précisément pourquoi chaque test existe.

### Vulgarisation

Avoir beaucoup de tests ne signifie pas forcément avoir une bonne couverture. On peut tester plusieurs fois la même chose tout en oubliant une exigence importante.

### Solution

Une chaîne de conception QA explicite a été mise en place :

```text
Fonctionnalité
→ User Story
→ Acceptance Criteria
→ Test Case
→ Playwright
```

Le périmètre défini contient :

- 6 fonctionnalités ;
- 6 User Stories ;
- 32 Acceptance Criteria ;
- 33 Test Cases fonctionnels.

---

## 2. Garantir que les exigences sont réellement testées

### Problème

Le nombre de tests ne permet pas, à lui seul, de savoir si toutes les exigences fonctionnelles sont couvertes.

### Solution

Création d’une **matrice de traçabilité** permettant de relier les fonctionnalités, User Stories, Acceptance Criteria, Test Cases et automatisations Playwright.

Résultat :

```text
User Stories couvertes : 6 / 6
Acceptance Criteria     : 32 / 32
Test Cases automatisés  : 33 / 33
```

---

## 3. Distinguer les tests fonctionnels des parcours E2E

### Problème

Un gros scénario de bout en bout peut traverser plusieurs fonctionnalités et donner l’impression qu’il remplace les tests fonctionnels ciblés.

### Vulgarisation

Un test « connexion → panier → checkout → commande » vérifie qu’un parcours complet fonctionne, mais il ne remplace pas les tests détaillés de chaque règle métier.

### Solution

Séparation claire entre :

- **33 Test Cases fonctionnels** issus du plan de tests ;
- **3 parcours E2E complémentaires**.

La suite contient donc **36 tests Playwright**, sans compter les E2E comme de nouveaux Test Cases fonctionnels.

---

## 4. Trouver le bon équilibre entre Smoke et Regression

### Problème

Une suite Smoke trop grande perd son intérêt.

### Vulgarisation

La Smoke doit répondre rapidement à la question : « Est-ce que les fonctions essentielles de l’application fonctionnent encore ? »

### Solution

La Smoke fonctionnelle a été réduite à **5 scénarios critiques**.

La Regression fonctionnelle contient les **33 TC**.

Avec les E2E :

```text
Smoke fonctionnelle      : 5
Regression fonctionnelle : 33
Smoke globale            : 6
Regression globale       : 36
```

---

## 5. Classifier correctement les scénarios

### Problème

Tous les tests ne vérifient pas le même type de comportement.

### Solution

Les 33 TC fonctionnels ont été classés en :

```text
Passants / positive      : 15
Non passants / negative  : 3
Erreurs / error          : 15
```

Des tags Playwright permettent ensuite de filtrer les campagnes.

---

## 6. Gérer les utilisateurs particuliers de SauceDemo

### Problème

Des comptes comme `problem_user` et `error_user` produisent volontairement des comportements anormaux.

### Risque

Considérer ces anomalies comme des règles fonctionnelles normales.

### Solution

Mise en place de **tests de caractérisation**.

Ces tests documentent le comportement réellement observable de l’application sans prétendre que ce comportement représente le fonctionnement nominal attendu.

Sept tests de caractérisation ont été identifiés autour de `problem_user` et `error_user`.

---

## 7. Ne pas confondre `locked_out_user` avec une anomalie

### Problème

`locked_out_user` ne peut pas se connecter, ce qui peut ressembler à un dysfonctionnement.

### Solution

Le verrouillage de ce compte a été considéré comme une **règle fonctionnelle attendue**.

Il est donc distingué des anomalies observées avec `problem_user` et `error_user`.

---

## 8. Éviter une simple collection de fichiers `.spec.ts`

### Problème

Mettre toutes les interactions directement dans les tests entraîne rapidement de la duplication.

### Vulgarisation

Si le bouton « Add to cart » change, il faudrait modifier des dizaines de tests au lieu d’un seul composant partagé.

### Solution

Mise en place du **Page Object Model (POM)** avec notamment :

- `LoginPage` ;
- `InventoryPage` ;
- `CartPage` ;
- `CheckoutPage`.

Des fixtures et données de test réutilisables complètent cette architecture.

---

## 9. Éviter les dépendances entre tests

### Problème

Un test ne doit pas dépendre du succès d’un test exécuté avant lui.

### Vulgarisation

Si le test B suppose que le test A a déjà ajouté un produit au panier, l’ordre d’exécution devient obligatoire et la parallélisation devient dangereuse.

### Solution

Les scénarios ont été conçus pour être **indépendants**, sans :

- mode `serial` ;
- état global mutable ;
- dépendance entre scénarios.

---

## 10. Éviter les attentes artificielles

### Problème

Les temporisations fixes rendent les tests fragiles.

Exemple problématique :

```ts
await page.waitForTimeout(2000);
```

### Vulgarisation

« Attendre deux secondes » fonctionne jusqu’au jour où l’application met 2,1 secondes à répondre.

### Solution

Utilisation des mécanismes natifs de synchronisation de Playwright et attente d’états réels de l’interface.

La suite ne repose pas sur des `waitForTimeout`.

---

## 11. Une vraie instabilité du menu sous parallélisation

### Problème

Lors de la revue Healer, une faiblesse réelle a été détectée dans `InventoryPage`.

La méthode `openMenu()` pouvait effectuer un second clic pendant l’animation du menu.

### Conséquence

Le test pouvait :

1. ouvrir le menu ;
2. cliquer une seconde fois trop rapidement ;
3. refermer le menu ;
4. échouer de manière intermittente.

### Solution

La méthode a été renforcée en attendant la visibilité réelle du lien **Logout** après l’ouverture du menu.

C’est un exemple concret de **flaky test** évité grâce à une meilleure synchronisation.

---

## 12. Éviter les sélecteurs fragiles

### Problème

Des sélecteurs basés sur la position ou la structure technique de la page peuvent casser facilement.

Exemples fragiles :

```text
XPath complexe
nth(3)
troisième bouton de la page
```

### Solution

Utilisation prioritaire de locators robustes :

- `data-test` ;
- rôles ;
- labels ;
- éléments sémantiques.

La revue Healer a également contrôlé l’absence de sélecteurs positionnels inutilement fragiles.

---

## 13. Mesurer la couverture sans accès au code source de SauceDemo

### Problème

Le projet teste une application publique dont le code source n’est pas instrumenté.

Il n’est donc pas pertinent de présenter une couverture classique :

```text
line coverage
branch coverage
statement coverage
```

### Solution

Création d’une **couverture QA fonctionnelle** fondée sur les exigences et les tests définis.

Elle mesure notamment :

```text
6 / 6 fonctionnalités
6 / 6 User Stories
32 / 32 Acceptance Criteria
33 / 33 Test Cases automatisés
```

---

## 14. Éviter un « 100 % » trompeur

### Problème

Dire simplement « 100 % de couverture » pourrait laisser penser que 100 % de SauceDemo ou de son code source est couvert.

### Solution

Le projet précise que le résultat correspond à :

> **100 % de couverture automatisée du périmètre QA défini et documenté.**

Il ne s’agit ni d’une couverture exhaustive de SauceDemo, ni d’une couverture du code source.

---

## 15. Empêcher la documentation et les tests de diverger

### Problème

Au fil des évolutions, plusieurs incohérences pourraient apparaître :

- Test Case documenté mais non automatisé ;
- test automatisé sans TC correspondant ;
- Acceptance Criterion non couvert ;
- identifiant dupliqué ;
- référence invalide.

### Solution

Le générateur de rapport Coverage effectue des contrôles de cohérence et peut échouer lorsqu’une rupture de traçabilité est détectée.

Il vérifie notamment :

- les TC manquants ;
- les TC supplémentaires ;
- les doublons ;
- les AC non couverts ;
- les références invalides ;
- la cohérence documentation / automatisation.

---

## 16. Contrôler la qualité du code de test

### Problème

Des tests peuvent fonctionner tout en contenant du code mal formaté, des problèmes ESLint ou des erreurs TypeScript.

### Solution

Création d’un **Quality Gate** composé de trois contrôles :

```text
Prettier
ESLint
TypeScript
```

État de référence du projet :

```text
Quality Gate : 3 / 3 PASS
```

---

## 17. Produire un rapport Quality même en cas d’échec

### Problème

Si le processus s’arrête au premier contrôle en échec, on ne sait pas si les autres contrôles sont également en erreur.

### Solution

Le générateur exécute les trois contrôles, collecte leurs résultats, génère le rapport complet puis retourne un code d’échec si au moins un contrôle a échoué.

Cela fournit un diagnostic plus utile en une seule exécution.

---

## 18. Générer Allure sans imposer Java en local

### Problème

Les tests Playwright fonctionnent avec Node.js, mais la génération du rapport HTML Allure nécessite Java.

### Solution

Séparation des responsabilités :

**En local :**

```text
Playwright
→ allure-results/
```

**Dans GitHub Actions :**

```text
Installation Java 17
→ génération Allure HTML
→ publication
```

Java n’a donc pas besoin d’être installé localement uniquement pour exécuter les tests.

---

## 19. Assurer la portabilité Windows / Linux

### Problème

Le développement local s’effectue sous Windows alors que GitHub Actions fonctionne sous Linux.

Des scripts spécifiques à PowerShell ou utilisant des chemins absolus pourraient fonctionner localement mais casser en CI.

### Solution

Les scripts de reporting ont été conçus en **Node.js** avec des chemins portables.

Pas de dépendance à :

- PowerShell ;
- un chemin Windows absolu ;
- une interaction graphique.

---

## 20. Centraliser plusieurs rapports

### Problème

Le projet génère plusieurs sources d’information :

- Playwright HTML ;
- Allure ;
- Coverage ;
- Quality.

Les consulter séparément rend la lecture du projet moins pratique.

### Solution

Création d’un **QA Portal** centralisant l’accès aux différents rapports et aux principaux indicateurs.

---

## 21. Rendre le portail QA dynamique

### Problème

La première version du portail présentait essentiellement un instantané statique.

Une fois la CI/CD opérationnelle, ce fonctionnement ne représentait plus correctement l’état du projet.

### Solution

La CI génère désormais un fichier :

```text
portal-data.js
```

Il alimente le portail avec des informations issues de la dernière exécution publiée, notamment :

- résultats Playwright ;
- Quality Gate ;
- couverture QA ;
- branche ;
- commit ;
- date d’exécution.

---

## 22. Faire fonctionner le portail avec ou sans données CI

### Problème

`portal-data.js` n’est pas nécessairement disponible dans toutes les situations locales.

Le portail ne devait pas devenir inutilisable pour autant.

### Solution

Mise en place d’un fonctionnement avec **fallback** :

- données CI lorsqu’elles sont disponibles ;
- données locales/statique de référence dans le cas contraire.

---

## 23. Publier plusieurs rapports sur GitHub Pages

### Problème

Publier uniquement la page principale ne suffit pas : chaque rapport possède son propre HTML, JavaScript, CSS et ses assets.

### Solution

La CI assemble un site final contenant notamment :

```text
site/
├── index.html
├── playwright/
├── allure/
├── coverage/
└── quality/
```

Les différents `index.html` sont validés avant publication.

---

## 24. Ne pas publier une pipeline QA en échec

### Problème

Le portail public ne doit pas être mis à jour comme si tout allait bien lorsqu’un contrôle essentiel échoue.

### Solution

La pipeline suit une chaîne de validation avant déploiement :

```text
Quality Gate
→ Playwright
→ Coverage
→ Allure
→ assemblage du portail
→ validation
→ GitHub Pages
```

La publication dépend du succès des étapes requises.

---

## 25. Ne pas déployer une Pull Request comme version officielle

### Problème

Une Pull Request contient potentiellement des modifications encore en cours de validation.

Elle ne doit donc pas remplacer le portail public de la branche principale.

### Solution

Les Pull Requests exécutent les validations nécessaires, mais le déploiement GitHub Pages est réservé à la branche `main`.

---

## 26. Utiliser l’IA sans perdre le contrôle du processus QA

### Problème

Demander simplement à une IA de « générer les tests » peut produire beaucoup de code sans stratégie QA claire.

### Solution

Séparation en trois agents spécialisés :

### Planner

Responsable notamment de :

- l’exploration ;
- la conception fonctionnelle ;
- la création des User Stories ;
- la définition des Acceptance Criteria ;
- la construction du plan de tests ;
- la revue de conception QA.

### Generator

Responsable notamment de :

- l’architecture Playwright ;
- la génération des tests ;
- les Page Objects ;
- les E2E ;
- le reporting ;
- le portail ;
- la CI/CD.

### Healer

Responsable notamment de :

- la revue de robustesse ;
- l’analyse des échecs ;
- la correction ciblée des tests fragiles.

Les prompts sont également versionnés afin de rendre la démarche plus reproductible.

---

## 27. Un blocage réseau qui ressemblait à un problème de tests

### Problème

Lors de la première exécution de la revue Healer, les tests ont rencontré :

```text
ERR_NETWORK_ACCESS_DENIED
```

### Vulgarisation

Le problème ne venait pas des tests : l’environnement n’avait simplement pas le droit d’accéder à SauceDemo.

### Risque

Modifier les tests pour « réparer » un problème qui ne vient pas du code.

### Solution

Le problème d’environnement a été identifié avant toute modification fonctionnelle.

Après autorisation de l’accès réseau, la suite a été rejouée normalement.

Cette étape illustre une règle importante :

> **Un test en échec ne signifie pas automatiquement que le test ou l’application contient un bug. Il faut d’abord identifier la cause réelle.**

---

## 28. Maintenir la documentation après l’évolution du périmètre

### Problème

Le projet a évolué.

Une ancienne version de la documentation faisait encore référence à :

```text
29 TC fonctionnels
3 E2E
32 tests Playwright
```

alors que le périmètre actuel est :

```text
33 TC fonctionnels
3 E2E
36 tests Playwright
```

### Solution

Mise à jour des métriques dans la documentation, les rapports et les supports de présentation.

La source de vérité actuelle est notamment :

```text
6 fonctionnalités
6 User Stories
32 Acceptance Criteria
33 Test Cases fonctionnels
3 E2E
36 tests Playwright
```

---

## 29. Ne pas détruire une bonne documentation en voulant la mettre à jour

### Problème

Une première approche de mise à jour du README a entraîné une refonte trop importante.

Des éléments utiles, notamment certains badges et la structure existante, risquaient d’être perdus.

### Solution

Adoption d’une nouvelle règle pour la documentation existante :

> **Mettre à jour ce qui est obsolète sans réécrire inutilement ce qui fonctionne déjà.**

Cela signifie notamment :

- conserver la structure pertinente ;
- conserver les badges utiles ;
- préserver les sections toujours valides ;
- modifier uniquement les métriques et informations devenues obsolètes ;
- contrôler le diff avant validation.

---

## 30. Garder les visuels cohérents avec les métriques réelles

### Problème

Une première version mise à jour de l’infographie contenait une répartition des Test Cases par domaine qui ne totalisait pas correctement 33.

### Solution

Correction de la répartition fonctionnelle avec les valeurs de référence :

| Domaine | Test Cases |
|---|---:|
| Authentification | 5 |
| Catalogue | 4 |
| Tri | 6 |
| Panier | 6 |
| Checkout | 8 |
| Session | 4 |
| **Total** | **33** |

---

# Architecture obtenue

Les différents problèmes rencontrés ont progressivement transformé le projet en une chaîne QA complète :

```text
6 Fonctionnalités
        ↓
6 User Stories
        ↓
32 Acceptance Criteria
        ↓
33 Test Cases fonctionnels
        ↓
Matrice de traçabilité
        ↓
33 automatisations Playwright
        +
3 parcours E2E
        ↓
36 tests Playwright
        ↓
Quality Gate + Coverage QA
        ↓
Playwright HTML + Allure
        ↓
GitHub Actions
        ↓
QA Portal
        ↓
GitHub Pages
```

---

# Les 5 principaux enseignements

## 1. Concevoir avant d’automatiser

Écrire du Playwright n’est qu’une partie du travail.

Les User Stories, Acceptance Criteria et Test Cases permettent de savoir **pourquoi chaque test existe et quelle exigence il vérifie**.

---

## 2. Un test qui passe n’est pas forcément un bon test

Un test peut être vert tout en étant :

- fragile ;
- mal synchronisé ;
- dépendant d’un autre test ;
- basé sur un mauvais sélecteur ;
- insuffisamment précis.

La revue Healer et le problème réel du menu ont montré l’intérêt d’une revue de robustesse après l’automatisation.

---

## 3. La traçabilité est plus importante qu’un simple nombre de tests

Dire :

```text
36 tests
```

est utile, mais ne démontre pas à lui seul la qualité de la couverture.

Pouvoir montrer :

```text
6 fonctionnalités
→ 6 User Stories
→ 32 Acceptance Criteria
→ 33 Test Cases
→ 33 automatisations
```

permet d’expliquer précisément ce qui est couvert.

---

## 4. La CI/CD fait partie de l’industrialisation QA

Une suite automatisée devient beaucoup plus utile lorsque chaque modification peut déclencher automatiquement :

```text
contrôles qualité
→ tests
→ vérification de couverture
→ génération des rapports
→ publication du portail
```

Le projet ne dépend donc plus uniquement d’une exécution manuelle sur un poste de développement.

---

## 5. L’IA apporte de la valeur lorsqu’elle est encadrée

Le projet n’utilise pas un agent IA unique chargé de « tout faire ».

Les responsabilités ont été séparées :

```text
Planner
→ concevoir

Generator
→ implémenter

Healer
→ diagnostiquer et renforcer
```

Les agents travaillent à l’intérieur d’un cadre défini par :

- les exigences ;
- le plan de tests ;
- la traçabilité ;
- les conventions Playwright ;
- les contrôles qualité ;
- la CI/CD.

---

# Conclusion

Le principal résultat du projet n’est pas simplement d’être passé de **32 à 36 tests Playwright**.

Le projet est progressivement passé d’une logique :

> **« Automatiser des scénarios SauceDemo avec Playwright »**

à une logique :

> **« Construire une chaîne d’ingénierie QA complète, structurée, traçable, maintenable et industrialisée. »**

Les difficultés rencontrées ont permis de traiter des sujets concrets d’un projet d’automatisation QA :

- conception des exigences ;
- stratégie de test ;
- traçabilité ;
- architecture Playwright ;
- robustesse et flaky tests ;
- distinction entre comportement attendu et anomalie ;
- couverture fonctionnelle ;
- qualité du code ;
- reporting ;
- portabilité des scripts ;
- CI/CD ;
- publication GitHub Pages ;
- documentation ;
- utilisation encadrée d’agents IA.

## Chiffres de référence

```text
Fonctionnalités            : 6
User Stories               : 6
Acceptance Criteria        : 32
Test Cases fonctionnels    : 33
TC automatisés             : 33 / 33
TC passants                : 15
TC non passants            : 3
TC erreurs                 : 15
Parcours E2E               : 3
Tests Playwright au total  : 36
Smoke fonctionnelle        : 5
Regression fonctionnelle   : 33
Smoke globale              : 6
Regression globale         : 36
Quality Gate               : 3 / 3 PASS
Couverture QA définie      : 100 %
```

> **Important :** les 100 % correspondent à la couverture automatisée du **périmètre QA défini et documenté**. Ils ne représentent ni une couverture exhaustive de SauceDemo ni une couverture du code source.
