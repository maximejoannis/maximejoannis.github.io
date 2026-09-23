"use strict";
// Fichier généré par scripts/build-bilan-data.mjs depuis content/*.md — ne pas modifier à la main.
const BILAN = {
 "saucedemo": {
  "file": "bilan-projet-saucedemo-playwright-agents.md",
  "title": "Bilan du projet SauceDemo Playwright Agents",
  "lead": {
   "heading": "Problèmes rencontrés et solutions mises en place",
   "md": "Ce document présente les principaux problèmes rencontrés pendant la conception, l’automatisation et l’industrialisation du projet **SauceDemo Playwright Agents**, ainsi que les solutions mises en place.\n\nL’objectif initial pouvait sembler simple : **automatiser SauceDemo avec Playwright**. Au fil du projet, le travail a cependant couvert des problématiques plus larges : conception QA, traçabilité, robustesse, architecture, reporting, qualité du code, CI/CD et publication des résultats."
  },
  "tabs": [
   {
    "id": "problemes",
    "label": "Problèmes et solutions",
    "blocks": [
     {
      "t": "cards",
      "unit": "problèmes",
      "search": true,
      "items": [
       {
        "num": "1",
        "title": "Définir précisément ce qu’on voulait tester",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Il est facile d’écrire beaucoup de tests sans savoir précisément pourquoi chaque test existe."
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "Avoir beaucoup de tests ne signifie pas forcément avoir une bonne couverture. On peut tester plusieurs fois la même chose tout en oubliant une exigence importante."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Une chaîne de conception QA explicite a été mise en place :\n\n```text\nFonctionnalité\n→ User Story\n→ Acceptance Criteria\n→ Test Case\n→ Playwright\n```\n\nLe périmètre défini contient :\n\n- 6 fonctionnalités ;\n- 6 User Stories ;\n- 32 Acceptance Criteria ;\n- 33 Test Cases fonctionnels."
         }
        ]
       },
       {
        "num": "2",
        "title": "Garantir que les exigences sont réellement testées",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le nombre de tests ne permet pas, à lui seul, de savoir si toutes les exigences fonctionnelles sont couvertes."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Création d’une **matrice de traçabilité** permettant de relier les fonctionnalités, User Stories, Acceptance Criteria, Test Cases et automatisations Playwright.\n\nRésultat :\n\n```text\nUser Stories couvertes : 6 / 6\nAcceptance Criteria     : 32 / 32\nTest Cases automatisés  : 33 / 33\n```"
         }
        ]
       },
       {
        "num": "3",
        "title": "Distinguer les tests fonctionnels des parcours E2E",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Un gros scénario de bout en bout peut traverser plusieurs fonctionnalités et donner l’impression qu’il remplace les tests fonctionnels ciblés."
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "Un test « connexion → panier → checkout → commande » vérifie qu’un parcours complet fonctionne, mais il ne remplace pas les tests détaillés de chaque règle métier."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Séparation claire entre :\n\n- **33 Test Cases fonctionnels** issus du plan de tests ;\n- **3 parcours E2E complémentaires**.\n\nLa suite contient donc **36 tests Playwright**, sans compter les E2E comme de nouveaux Test Cases fonctionnels."
         }
        ]
       },
       {
        "num": "4",
        "title": "Trouver le bon équilibre entre Smoke et Regression",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Une suite Smoke trop grande perd son intérêt."
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "La Smoke doit répondre rapidement à la question : « Est-ce que les fonctions essentielles de l’application fonctionnent encore ? »"
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "La Smoke fonctionnelle a été réduite à **5 scénarios critiques**.\n\nLa Regression fonctionnelle contient les **33 TC**.\n\nAvec les E2E :\n\n```text\nSmoke fonctionnelle      : 5\nRegression fonctionnelle : 33\nSmoke globale            : 6\nRegression globale       : 36\n```"
         }
        ]
       },
       {
        "num": "5",
        "title": "Classifier correctement les scénarios",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Tous les tests ne vérifient pas le même type de comportement."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Les 33 TC fonctionnels ont été classés en :\n\n```text\nPassants / positive      : 15\nNon passants / negative  : 3\nErreurs / error          : 15\n```\n\nDes tags Playwright permettent ensuite de filtrer les campagnes."
         }
        ]
       },
       {
        "num": "6",
        "title": "Gérer les utilisateurs particuliers de SauceDemo",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Des comptes comme `problem_user` et `error_user` produisent volontairement des comportements anormaux."
         },
         {
          "label": "Risque",
          "tone": "risk",
          "md": "Considérer ces anomalies comme des règles fonctionnelles normales."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Mise en place de **tests de caractérisation**.\n\nCes tests documentent le comportement réellement observable de l’application sans prétendre que ce comportement représente le fonctionnement nominal attendu.\n\nSept tests de caractérisation ont été identifiés autour de `problem_user` et `error_user`."
         }
        ]
       },
       {
        "num": "7",
        "title": "Ne pas confondre `locked_out_user` avec une anomalie",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "`locked_out_user` ne peut pas se connecter, ce qui peut ressembler à un dysfonctionnement."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Le verrouillage de ce compte a été considéré comme une **règle fonctionnelle attendue**.\n\nIl est donc distingué des anomalies observées avec `problem_user` et `error_user`."
         }
        ]
       },
       {
        "num": "8",
        "title": "Éviter une simple collection de fichiers `.spec.ts`",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Mettre toutes les interactions directement dans les tests entraîne rapidement de la duplication."
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "Si le bouton « Add to cart » change, il faudrait modifier des dizaines de tests au lieu d’un seul composant partagé."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Mise en place du **Page Object Model (POM)** avec notamment :\n\n- `LoginPage` ;\n- `InventoryPage` ;\n- `CartPage` ;\n- `CheckoutPage`.\n\nDes fixtures et données de test réutilisables complètent cette architecture."
         }
        ]
       },
       {
        "num": "9",
        "title": "Éviter les dépendances entre tests",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Un test ne doit pas dépendre du succès d’un test exécuté avant lui."
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "Si le test B suppose que le test A a déjà ajouté un produit au panier, l’ordre d’exécution devient obligatoire et la parallélisation devient dangereuse."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Les scénarios ont été conçus pour être **indépendants**, sans :\n\n- mode `serial` ;\n- état global mutable ;\n- dépendance entre scénarios."
         }
        ]
       },
       {
        "num": "10",
        "title": "Éviter les attentes artificielles",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Les temporisations fixes rendent les tests fragiles.\n\nExemple problématique :\n\n```ts\nawait page.waitForTimeout(2000);\n```"
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "« Attendre deux secondes » fonctionne jusqu’au jour où l’application met 2,1 secondes à répondre."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Utilisation des mécanismes natifs de synchronisation de Playwright et attente d’états réels de l’interface.\n\nLa suite ne repose pas sur des `waitForTimeout`."
         }
        ]
       },
       {
        "num": "11",
        "title": "Une vraie instabilité du menu sous parallélisation",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Lors de la revue Healer, une faiblesse réelle a été détectée dans `InventoryPage`.\n\nLa méthode `openMenu()` pouvait effectuer un second clic pendant l’animation du menu."
         },
         {
          "label": "Conséquence",
          "tone": "risk",
          "md": "Le test pouvait :\n\n1. ouvrir le menu ;\n2. cliquer une seconde fois trop rapidement ;\n3. refermer le menu ;\n4. échouer de manière intermittente."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "La méthode a été renforcée en attendant la visibilité réelle du lien **Logout** après l’ouverture du menu.\n\nC’est un exemple concret de **flaky test** évité grâce à une meilleure synchronisation."
         }
        ]
       },
       {
        "num": "12",
        "title": "Éviter les sélecteurs fragiles",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Des sélecteurs basés sur la position ou la structure technique de la page peuvent casser facilement.\n\nExemples fragiles :\n\n```text\nXPath complexe\nnth(3)\ntroisième bouton de la page\n```"
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Utilisation prioritaire de locators robustes :\n\n- `data-test` ;\n- rôles ;\n- labels ;\n- éléments sémantiques.\n\nLa revue Healer a également contrôlé l’absence de sélecteurs positionnels inutilement fragiles."
         }
        ]
       },
       {
        "num": "13",
        "title": "Mesurer la couverture sans accès au code source de SauceDemo",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le projet teste une application publique dont le code source n’est pas instrumenté.\n\nIl n’est donc pas pertinent de présenter une couverture classique :\n\n```text\nline coverage\nbranch coverage\nstatement coverage\n```"
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Création d’une **couverture QA fonctionnelle** fondée sur les exigences et les tests définis.\n\nElle mesure notamment :\n\n```text\n6 / 6 fonctionnalités\n6 / 6 User Stories\n32 / 32 Acceptance Criteria\n33 / 33 Test Cases automatisés\n```"
         }
        ]
       },
       {
        "num": "14",
        "title": "Éviter un « 100 % » trompeur",
        "tag": "conception",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Dire simplement « 100 % de couverture » pourrait laisser penser que 100 % de SauceDemo ou de son code source est couvert."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Le projet précise que le résultat correspond à :\n\n> **100 % de couverture automatisée du périmètre QA défini et documenté.**\n\nIl ne s’agit ni d’une couverture exhaustive de SauceDemo, ni d’une couverture du code source."
         }
        ]
       },
       {
        "num": "15",
        "title": "Empêcher la documentation et les tests de diverger",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Au fil des évolutions, plusieurs incohérences pourraient apparaître :\n\n- Test Case documenté mais non automatisé ;\n- test automatisé sans TC correspondant ;\n- Acceptance Criterion non couvert ;\n- identifiant dupliqué ;\n- référence invalide."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Le générateur de rapport Coverage effectue des contrôles de cohérence et peut échouer lorsqu’une rupture de traçabilité est détectée.\n\nIl vérifie notamment :\n\n- les TC manquants ;\n- les TC supplémentaires ;\n- les doublons ;\n- les AC non couverts ;\n- les références invalides ;\n- la cohérence documentation / automatisation."
         }
        ]
       },
       {
        "num": "16",
        "title": "Contrôler la qualité du code de test",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Des tests peuvent fonctionner tout en contenant du code mal formaté, des problèmes ESLint ou des erreurs TypeScript."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Création d’un **Quality Gate** composé de trois contrôles :\n\n```text\nPrettier\nESLint\nTypeScript\n```\n\nÉtat de référence du projet :\n\n```text\nQuality Gate : 3 / 3 PASS\n```"
         }
        ]
       },
       {
        "num": "17",
        "title": "Produire un rapport Quality même en cas d’échec",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Si le processus s’arrête au premier contrôle en échec, on ne sait pas si les autres contrôles sont également en erreur."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Le générateur exécute les trois contrôles, collecte leurs résultats, génère le rapport complet puis retourne un code d’échec si au moins un contrôle a échoué.\n\nCela fournit un diagnostic plus utile en une seule exécution."
         }
        ]
       },
       {
        "num": "18",
        "title": "Générer Allure sans imposer Java en local",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Les tests Playwright fonctionnent avec Node.js, mais la génération du rapport HTML Allure nécessite Java."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Séparation des responsabilités :\n\n**En local :**\n\n```text\nPlaywright\n→ allure-results/\n```\n\n**Dans GitHub Actions :**\n\n```text\nInstallation Java 17\n→ génération Allure HTML\n→ publication\n```\n\nJava n’a donc pas besoin d’être installé localement uniquement pour exécuter les tests."
         }
        ]
       },
       {
        "num": "19",
        "title": "Assurer la portabilité Windows / Linux",
        "tag": "cicd",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le développement local s’effectue sous Windows alors que GitHub Actions fonctionne sous Linux.\n\nDes scripts spécifiques à PowerShell ou utilisant des chemins absolus pourraient fonctionner localement mais casser en CI."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Les scripts de reporting ont été conçus en **Node.js** avec des chemins portables.\n\nPas de dépendance à :\n\n- PowerShell ;\n- un chemin Windows absolu ;\n- une interaction graphique."
         }
        ]
       },
       {
        "num": "20",
        "title": "Centraliser plusieurs rapports",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le projet génère plusieurs sources d’information :\n\n- Playwright HTML ;\n- Allure ;\n- Coverage ;\n- Quality.\n\nLes consulter séparément rend la lecture du projet moins pratique."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Création d’un **QA Portal** centralisant l’accès aux différents rapports et aux principaux indicateurs."
         }
        ]
       },
       {
        "num": "21",
        "title": "Rendre le portail QA dynamique",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "La première version du portail présentait essentiellement un instantané statique.\n\nUne fois la CI/CD opérationnelle, ce fonctionnement ne représentait plus correctement l’état du projet."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "La CI génère désormais un fichier :\n\n```text\nportal-data.js\n```\n\nIl alimente le portail avec des informations issues de la dernière exécution publiée, notamment :\n\n- résultats Playwright ;\n- Quality Gate ;\n- couverture QA ;\n- branche ;\n- commit ;\n- date d’exécution."
         }
        ]
       },
       {
        "num": "22",
        "title": "Faire fonctionner le portail avec ou sans données CI",
        "tag": "rapports",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "`portal-data.js` n’est pas nécessairement disponible dans toutes les situations locales.\n\nLe portail ne devait pas devenir inutilisable pour autant."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Mise en place d’un fonctionnement avec **fallback** :\n\n- données CI lorsqu’elles sont disponibles ;\n- données locales/statique de référence dans le cas contraire."
         }
        ]
       },
       {
        "num": "23",
        "title": "Publier plusieurs rapports sur GitHub Pages",
        "tag": "cicd",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Publier uniquement la page principale ne suffit pas : chaque rapport possède son propre HTML, JavaScript, CSS et ses assets."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "La CI assemble un site final contenant notamment :\n\n```text\nsite/\n├── index.html\n├── playwright/\n├── allure/\n├── coverage/\n└── quality/\n```\n\nLes différents `index.html` sont validés avant publication."
         }
        ]
       },
       {
        "num": "24",
        "title": "Ne pas publier une pipeline QA en échec",
        "tag": "cicd",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le portail public ne doit pas être mis à jour comme si tout allait bien lorsqu’un contrôle essentiel échoue."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "La pipeline suit une chaîne de validation avant déploiement :\n\n```text\nQuality Gate\n→ Playwright\n→ Coverage\n→ Allure\n→ assemblage du portail\n→ validation\n→ GitHub Pages\n```\n\nLa publication dépend du succès des étapes requises."
         }
        ]
       },
       {
        "num": "25",
        "title": "Ne pas déployer une Pull Request comme version officielle",
        "tag": "cicd",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Une Pull Request contient potentiellement des modifications encore en cours de validation.\n\nElle ne doit donc pas remplacer le portail public de la branche principale."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Les Pull Requests exécutent les validations nécessaires, mais le déploiement GitHub Pages est réservé à la branche `main`."
         }
        ]
       },
       {
        "num": "26",
        "title": "Utiliser l’IA sans perdre le contrôle du processus QA",
        "tag": "ia-doc",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Demander simplement à une IA de « générer les tests » peut produire beaucoup de code sans stratégie QA claire."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Séparation en trois agents spécialisés :\n\n### Planner\n\nResponsable notamment de :\n\n- l’exploration ;\n- la conception fonctionnelle ;\n- la création des User Stories ;\n- la définition des Acceptance Criteria ;\n- la construction du plan de tests ;\n- la revue de conception QA.\n\n### Generator\n\nResponsable notamment de :\n\n- l’architecture Playwright ;\n- la génération des tests ;\n- les Page Objects ;\n- les E2E ;\n- le reporting ;\n- le portail ;\n- la CI/CD.\n\n### Healer\n\nResponsable notamment de :\n\n- la revue de robustesse ;\n- l’analyse des échecs ;\n- la correction ciblée des tests fragiles.\n\nLes prompts sont également versionnés afin de rendre la démarche plus reproductible."
         }
        ]
       },
       {
        "num": "27",
        "title": "Un blocage réseau qui ressemblait à un problème de tests",
        "tag": "robustesse",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Lors de la première exécution de la revue Healer, les tests ont rencontré :\n\n```text\nERR_NETWORK_ACCESS_DENIED\n```"
         },
         {
          "label": "Vulgarisation",
          "tone": "explain",
          "md": "Le problème ne venait pas des tests : l’environnement n’avait simplement pas le droit d’accéder à SauceDemo."
         },
         {
          "label": "Risque",
          "tone": "risk",
          "md": "Modifier les tests pour « réparer » un problème qui ne vient pas du code."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Le problème d’environnement a été identifié avant toute modification fonctionnelle.\n\nAprès autorisation de l’accès réseau, la suite a été rejouée normalement.\n\nCette étape illustre une règle importante :\n\n> **Un test en échec ne signifie pas automatiquement que le test ou l’application contient un bug. Il faut d’abord identifier la cause réelle.**"
         }
        ]
       },
       {
        "num": "28",
        "title": "Maintenir la documentation après l’évolution du périmètre",
        "tag": "ia-doc",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Le projet a évolué.\n\nUne ancienne version de la documentation faisait encore référence à :\n\n```text\n29 TC fonctionnels\n3 E2E\n32 tests Playwright\n```\n\nalors que le périmètre actuel est :\n\n```text\n33 TC fonctionnels\n3 E2E\n36 tests Playwright\n```"
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Mise à jour des métriques dans la documentation, les rapports et les supports de présentation.\n\nLa source de vérité actuelle est notamment :\n\n```text\n6 fonctionnalités\n6 User Stories\n32 Acceptance Criteria\n33 Test Cases fonctionnels\n3 E2E\n36 tests Playwright\n```"
         }
        ]
       },
       {
        "num": "29",
        "title": "Ne pas détruire une bonne documentation en voulant la mettre à jour",
        "tag": "ia-doc",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Une première approche de mise à jour du README a entraîné une refonte trop importante.\n\nDes éléments utiles, notamment certains badges et la structure existante, risquaient d’être perdus."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Adoption d’une nouvelle règle pour la documentation existante :\n\n> **Mettre à jour ce qui est obsolète sans réécrire inutilement ce qui fonctionne déjà.**\n\nCela signifie notamment :\n\n- conserver la structure pertinente ;\n- conserver les badges utiles ;\n- préserver les sections toujours valides ;\n- modifier uniquement les métriques et informations devenues obsolètes ;\n- contrôler le diff avant validation."
         }
        ]
       },
       {
        "num": "30",
        "title": "Garder les visuels cohérents avec les métriques réelles",
        "tag": "ia-doc",
        "fields": [
         {
          "label": "Problème",
          "tone": "problem",
          "md": "Une première version mise à jour de l’infographie contenait une répartition des Test Cases par domaine qui ne totalisait pas correctement 33."
         },
         {
          "label": "Solution",
          "tone": "solution",
          "md": "Correction de la répartition fonctionnelle avec les valeurs de référence :\n\n| Domaine | Test Cases |\n|---|---:|\n| Authentification | 5 |\n| Catalogue | 4 |\n| Tri | 6 |\n| Panier | 6 |\n| Checkout | 8 |\n| Session | 4 |\n| **Total** | **33** |"
         }
        ]
       }
      ],
      "filters": [
       {
        "id": "conception",
        "label": "Conception et périmètre",
        "short": "Conception et périmètre"
       },
       {
        "id": "robustesse",
        "label": "Robustesse des tests",
        "short": "Robustesse des tests"
       },
       {
        "id": "rapports",
        "label": "Qualité et rapports",
        "short": "Qualité et rapports"
       },
       {
        "id": "cicd",
        "label": "CI/CD et publication",
        "short": "CI/CD et publication"
       },
       {
        "id": "ia-doc",
        "label": "IA et documentation",
        "short": "IA et documentation"
       }
      ]
     }
    ]
   },
   {
    "id": "architecture",
    "label": "Architecture obtenue",
    "heading": "Architecture obtenue",
    "blocks": [
     {
      "t": "md",
      "md": "Les différents problèmes rencontrés ont progressivement transformé le projet en une chaîne QA complète :\n"
     },
     {
      "t": "flow",
      "lines": [
       "6 Fonctionnalités",
       "↓",
       "6 User Stories",
       "↓",
       "32 Acceptance Criteria",
       "↓",
       "33 Test Cases fonctionnels",
       "↓",
       "Matrice de traçabilité",
       "↓",
       "33 automatisations Playwright",
       "+",
       "3 parcours E2E",
       "↓",
       "36 tests Playwright",
       "↓",
       "Quality Gate + Coverage QA",
       "↓",
       "Playwright HTML + Allure",
       "↓",
       "GitHub Actions",
       "↓",
       "QA Portal",
       "↓",
       "GitHub Pages"
      ]
     }
    ]
   },
   {
    "id": "enseignements",
    "label": "Enseignements",
    "heading": "Les 5 principaux enseignements",
    "blocks": [
     {
      "t": "cards",
      "unit": "enseignements",
      "open": true,
      "items": [
       {
        "num": "1",
        "title": "Concevoir avant d’automatiser",
        "fields": [
         {
          "tone": "plain",
          "md": "Écrire du Playwright n’est qu’une partie du travail.\n\nLes User Stories, Acceptance Criteria et Test Cases permettent de savoir **pourquoi chaque test existe et quelle exigence il vérifie**."
         }
        ]
       },
       {
        "num": "2",
        "title": "Un test qui passe n’est pas forcément un bon test",
        "fields": [
         {
          "tone": "plain",
          "md": "Un test peut être vert tout en étant :\n\n- fragile ;\n- mal synchronisé ;\n- dépendant d’un autre test ;\n- basé sur un mauvais sélecteur ;\n- insuffisamment précis.\n\nLa revue Healer et le problème réel du menu ont montré l’intérêt d’une revue de robustesse après l’automatisation."
         }
        ]
       },
       {
        "num": "3",
        "title": "La traçabilité est plus importante qu’un simple nombre de tests",
        "fields": [
         {
          "tone": "plain",
          "md": "Dire :\n\n```text\n36 tests\n```\n\nest utile, mais ne démontre pas à lui seul la qualité de la couverture.\n\nPouvoir montrer :\n\n```text\n6 fonctionnalités\n→ 6 User Stories\n→ 32 Acceptance Criteria\n→ 33 Test Cases\n→ 33 automatisations\n```\n\npermet d’expliquer précisément ce qui est couvert."
         }
        ]
       },
       {
        "num": "4",
        "title": "La CI/CD fait partie de l’industrialisation QA",
        "fields": [
         {
          "tone": "plain",
          "md": "Une suite automatisée devient beaucoup plus utile lorsque chaque modification peut déclencher automatiquement :\n\n```text\ncontrôles qualité\n→ tests\n→ vérification de couverture\n→ génération des rapports\n→ publication du portail\n```\n\nLe projet ne dépend donc plus uniquement d’une exécution manuelle sur un poste de développement."
         }
        ]
       },
       {
        "num": "5",
        "title": "L’IA apporte de la valeur lorsqu’elle est encadrée",
        "fields": [
         {
          "tone": "plain",
          "md": "Le projet n’utilise pas un agent IA unique chargé de « tout faire ».\n\nLes responsabilités ont été séparées :\n\n```text\nPlanner\n→ concevoir\n\nGenerator\n→ implémenter\n\nHealer\n→ diagnostiquer et renforcer\n```\n\nLes agents travaillent à l’intérieur d’un cadre défini par :\n\n- les exigences ;\n- le plan de tests ;\n- la traçabilité ;\n- les conventions Playwright ;\n- les contrôles qualité ;\n- la CI/CD."
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "conclusion",
    "label": "Conclusion",
    "heading": "Conclusion",
    "blocks": [
     {
      "t": "md",
      "md": "Le principal résultat du projet n’est pas simplement d’être passé de **32 à 36 tests Playwright**.\n\nLe projet est progressivement passé d’une logique :\n\n> **« Automatiser des scénarios SauceDemo avec Playwright »**\n\nà une logique :\n\n> **« Construire une chaîne d’ingénierie QA complète, structurée, traçable, maintenable et industrialisée. »**\n\nLes difficultés rencontrées ont permis de traiter des sujets concrets d’un projet d’automatisation QA :\n\n- conception des exigences ;\n- stratégie de test ;\n- traçabilité ;\n- architecture Playwright ;\n- robustesse et flaky tests ;\n- distinction entre comportement attendu et anomalie ;\n- couverture fonctionnelle ;\n- qualité du code ;\n- reporting ;\n- portabilité des scripts ;\n- CI/CD ;\n- publication GitHub Pages ;\n- documentation ;\n- utilisation encadrée d’agents IA."
     },
     {
      "t": "md",
      "md": "## Chiffres de référence"
     },
     {
      "t": "kv",
      "rows": [
       [
        "Fonctionnalités",
        "6"
       ],
       [
        "User Stories",
        "6"
       ],
       [
        "Acceptance Criteria",
        "32"
       ],
       [
        "Test Cases fonctionnels",
        "33"
       ],
       [
        "TC automatisés",
        "33 / 33"
       ],
       [
        "TC passants",
        "15"
       ],
       [
        "TC non passants",
        "3"
       ],
       [
        "TC erreurs",
        "15"
       ],
       [
        "Parcours E2E",
        "3"
       ],
       [
        "Tests Playwright au total",
        "36"
       ],
       [
        "Smoke fonctionnelle",
        "5"
       ],
       [
        "Regression fonctionnelle",
        "33"
       ],
       [
        "Smoke globale",
        "6"
       ],
       [
        "Regression globale",
        "36"
       ],
       [
        "Quality Gate",
        "3 / 3 PASS"
       ],
       [
        "Couverture QA définie",
        "100 %"
       ]
      ]
     },
     {
      "t": "md",
      "md": "> **Important :** les 100 % correspondent à la couverture automatisée du **périmètre QA défini et documenté**. Ils ne représentent ni une couverture exhaustive de SauceDemo ni une couverture du code source."
     }
    ]
   }
  ]
 },
 "french-companies": {
  "file": "bilan-french-companies-explorer-playwright-agents.md",
  "title": "Bilan du projet French Companies Explorer Playwright Agents",
  "lead": {
   "intro": "*Bilan établi à partir du dépôt et de sa documentation, consultés le 23 septembre 2026.*",
   "heading": "Ce que couvre ce bilan",
   "md": "Ce document résume les difficultés de construction de la suite de tests, les corrections apportées aux tests et les défauts de l'application découverts pendant le projet. Il s'appuie sur la [Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md), l'[audit final](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md) et le [README](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/README.md). Les anciennes conversations ne sont pas accessibles ici : il s'agit d'un bilan des problèmes documentés, pas d'un journal exhaustif de chaque échange ou incident.\n\nLe dépôt concerne **l'automatisation des tests** de French Companies Explorer. Les anomalies de l'application qu'il révèle ne sont pas corrigées dans ce dépôt."
  },
  "tabs": [
   {
    "id": "construction",
    "label": "Construction des tests",
    "heading": "1. Problèmes rencontrés dans la construction des tests",
    "blocks": [
     {
      "t": "cards",
      "unit": "difficultés",
      "cap": "Difficulté",
      "items": [
       {
        "title": "API gouvernementale externe",
        "num": "1",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Le réseau, la disponibilité du service et les données publiques peuvent changer sans que le projet les contrôle."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "Six tests interrogent la vraie API et vérifient des propriétés observables, comme la structure des réponses, sans figer une entreprise ou un total de résultats."
         }
        ]
       },
       {
        "title": "Trouver le bon dosage entre simulation et réalité",
        "num": "2",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Des tests entièrement simulés pourraient manquer une panne d'intégration ; trop de tests réels seraient fragiles et coûteux."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "Trois niveaux complémentaires : **6 API réels, 75 UI avec réponses simulées, 3 parcours UI + API réels**. Les simulations, ou *mocks*, servent à fournir des réponses prévisibles pour tester l'interface."
         }
        ]
       },
       {
        "title": "Réponses tardives et tests instables",
        "num": "3",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Une recherche ou une pagination ne se termine pas instantanément ; un test peut regarder la page trop tôt."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "Attentes sur un état visible et sur la réponse réseau précise, préparées avant l'action. Pas de temporisation fixe employée comme solution générale."
         }
        ]
       },
       {
        "title": "Données conservées dans le navigateur",
        "num": "4",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Favoris, comparaison, historique, recherches sauvegardées et thème utilisent `localStorage`. Un scénario pouvait dépendre de ce qu'un autre avait laissé."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "État initial maîtrisé pour chaque test ; vérification du stockage, des rechargements réels et, lorsque pertinent, de l'absence d'effet sur les autres données."
         }
        ]
       },
       {
        "title": "Risque de confondre ce que fait le produit avec ce qu'il devrait faire",
        "num": "5",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Un test « réparé » pour accepter une erreur de l'application donnerait un faux résultat vert."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "Critères d'acceptation conservés comme référence ; défauts décrits séparément et tests attendus conservés avec `test.fixme` quand le produit les empêche de réussir. Les agents IA sont cadrés par `AGENTS.md` et leurs propositions revues."
         }
        ]
       },
       {
        "title": "Couverture difficile à interpréter",
        "num": "6",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Le code source du produit et de l'API ne fait pas partie de ce dépôt, et des tests sont volontairement désactivés."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "Chaîne de traçabilité **besoin → User Story → critère → cas de test → automatisation** et rapport calculé depuis les sources. « 100 % » signifie que tous les cas planifiés dans le périmètre choisi ont une automatisation ; cela ne mesure pas le code exécuté ni toute l'application."
         }
        ]
       },
       {
        "title": "Rapports éparpillés",
        "num": "7",
        "fields": [
         {
          "label": "Pourquoi c'était un problème",
          "tone": "problem",
          "md": "Des rapports Playwright, Allure, qualité et couverture séparés compliquaient la lecture des résultats."
         },
         {
          "label": "Réponse mise en place",
          "tone": "solution",
          "md": "GitHub Actions lance les contrôles, conserve les preuves et publie un [portail QA consolidé](https://maximejoannis.github.io/french-companies-explorer-playwright-agents/)."
         }
        ]
       }
      ]
     },
     {
      "t": "md",
      "md": "Ces défis et réponses sont décrits dans la [section 9 de la Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md#9-d%C3%A9fis-rencontr%C3%A9s)."
     }
    ]
   },
   {
    "id": "corrections",
    "label": "Erreurs corrigées",
    "heading": "2. Erreurs détectées dans les tests et corrigées",
    "blocks": [
     {
      "t": "md",
      "md": "L'audit a demandé deux corrections avant la clôture ; la Sprint Review indique qu'elles ont été intégrées :"
     },
     {
      "t": "cards",
      "unit": "erreurs",
      "open": true,
      "items": [
       {
        "num": "1",
        "title": "Statut inconnu interprété comme « Cessée ».",
        "fields": [
         {
          "tone": "plain",
          "md": "Un test d'intégration traitait toute valeur différente de `A`, y compris une valeur absente, comme le statut `C`. Le test ne vérifie désormais un libellé métier que si la vraie réponse contient explicitement `A` ou `C` ; sinon il reste neutre. Cela corrige le **test**, pas les défauts semblables encore présents dans l'application."
         }
        ]
       },
       {
        "num": "2",
        "title": "Ordre des propriétés d'un export JSON.",
        "fields": [
         {
          "tone": "plain",
          "md": "Un test exigeait un ordre exact des noms de propriétés. Comme cet ordre n'est pas une exigence du document exporté, l'assertion a été corrigée pour vérifier le contenu sans imposer cet ordre. L'ordre des entreprises du tableau, lui, reste vérifiable lorsqu'il a un sens fonctionnel."
         }
        ]
       }
      ]
     },
     {
      "t": "md",
      "md": "L'[audit final, section 20](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md#20-findings-classifi%C3%A9s), relève aussi deux pistes **optionnelles** : mieux fermer quatre contextes de navigateur créés manuellement en cas d'échec, et harmoniser sept titres de tests sans tag si les campagnes filtrées par tag deviennent importantes. Il ne les présente pas comme des corrections déjà effectuées."
     }
    ]
   },
   {
    "id": "defauts",
    "label": "Défauts de l’application",
    "heading": "3. Les 14 défauts de l'application découverts ou suivis",
    "blocks": [
     {
      "t": "md",
      "md": "**Point essentiel :** les 14 défauts sont indiqués **ouverts** dans l'audit. Pour 12 d'entre eux, un test conserve le bon résultat attendu mais porte `test.fixme` : Playwright le signale comme cas connu et ne l'exécute pas normalement. C'est un suivi explicite, **pas une réparation du produit**. Les deux autres sont des dettes d'accessibilité documentées sans désactiver les parcours fonctionnels."
     },
     {
      "t": "cards",
      "unit": "défauts",
      "cap": "Défaut",
      "search": true,
      "split": true,
      "filters": [
       {
        "id": "fixme",
        "label": "Test en fixme",
        "short": "fixme"
       },
       {
        "id": "sans-fixme",
        "label": "Dette d’accessibilité (sans fixme)",
        "short": "sans fixme"
       }
      ],
      "items": [
       {
        "title": "BUG-001 — Filtre Commune",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "L'interface peut envoyer une commune sous une forme que l'API refuse avec HTTP 400."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test d'intégration avec la vraie API, `fixme` ; résultat attendu : requête acceptée puis résultats ou état vide fonctionnel."
         }
        ]
       },
       {
        "title": "BUG-002 — Taille de page",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Changer le nombre de résultats par page ne recharge pas immédiatement la page 1 avec les bons résultats."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` du rechargement et de la cohérence de l'affichage."
         }
        ]
       },
       {
        "title": "BUG-003 — Tri par pertinence",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Revenir à « Pertinence » ne restaure pas l'ordre initial des résultats courants."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` de l'ordre attendu."
         }
        ]
       },
       {
        "title": "BUG-004 — Statut dans une fiche",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Un statut absent peut être affiché à tort comme « Cessée »."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` exigeant un affichage neutre."
         }
        ]
       },
       {
        "title": "BUG-005 — Favoris",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Le cœur de la fiche ne reflète pas immédiatement l'ajout ou le retrait réellement enregistré."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` de la cohérence entre vues et stockage."
         }
        ]
       },
       {
        "title": "BUG-006 — Accessibilité des favoris",
        "tag": "sans-fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Le contrôle en forme de cœur n'expose pas clairement son nom ou son état aux technologies d'assistance."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Défaut documenté sans `fixme` ; le parcours fonctionnel reste testé."
         }
        ]
       },
       {
        "title": "BUG-007 — Statistiques",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Une entreprise sans statut peut être comptée comme active ou cessée alors que l'information manque."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` exigeant qu'elle ne soit comptée dans aucune de ces catégories."
         }
        ]
       },
       {
        "title": "BUG-008 — Comparaison",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Des valeurs absentes, notamment le statut, peuvent devenir de fausses informations dans le tableau."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` de la neutralité et de la bonne association aux colonnes."
         }
        ]
       },
       {
        "title": "BUG-009 — Identité de l'historique",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Deux recherches différant par le statut peuvent être fusionnées, ce qui fait disparaître une entrée."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` exigeant deux entrées distinctes."
         }
        ]
       },
       {
        "title": "BUG-010 — Ordre de l'historique",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Changer page, taille ou tri peut modifier artificiellement l'ordre des recherches récentes."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` conservant la vraie chronologie."
         }
        ]
       },
       {
        "title": "BUG-011 — Nom d'une recherche sauvegardée",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Un nom ne contenant que des espaces peut être accepté."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Cas supplémentaire `TC-SAVED-008`, `fixme`, demandant le refus de ce nom."
         }
        ]
       },
       {
        "title": "BUG-012 — Accessibilité de la suppression",
        "tag": "sans-fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Plusieurs boutons « × » n'indiquent pas quelle recherche ils suppriment."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Défaut documenté sans `fixme` ; la suppression fonctionnelle reste testée."
         }
        ]
       },
       {
        "title": "BUG-013 — Export de résultats obsolètes",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Pendant le chargement d'une nouvelle recherche, l'export peut contenir les résultats de l'ancienne."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` exigeant un export cohérent avec la recherche courante."
         }
        ]
       },
       {
        "title": "BUG-014 — Page invalide dans l'URL",
        "tag": "fixme",
        "fields": [
         {
          "label": "Problème, en clair",
          "tone": "problem",
          "md": "Un lien contenant `page=abc` peut produire une pagination ou une requête invalide."
         },
         {
          "label": "Suivi dans la suite QA",
          "tone": "track",
          "md": "Test UI `fixme` exigeant une normalisation à la page 1."
         }
        ]
       }
      ]
     },
     {
      "t": "md",
      "md": "Source détaillée : [audit final, section 5 — défauts connus](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md#5-audit-des-d%C3%A9fauts-connus)."
     }
    ]
   },
   {
    "id": "resultat",
    "label": "Résultat et limites",
    "heading": "4. Résultat et limites",
    "blocks": [
     {
      "t": "md",
      "md": "La **baseline finale documentée** compte **84 tests : 72 réussis, 12 `fixme`/ignorés pour défaut connu, 0 échec inattendu**. Elle couvre les **13 fonctionnalités du périmètre retenu**. Les 83 cas présents dans les plans ont une automatisation ; le 84e, `TC-SAVED-008`, a été ajouté pour BUG-011. La documentation indique un pipeline et un portail opérationnels, ainsi qu'une clôture technique possible du **projet QA**.\n\nCette clôture ne ferme **aucun des 14 défauts produit**. Les tests avec la vraie API dépendent encore du réseau et d'un service externe ; les tests avec réponses simulées prouvent le comportement de l'interface face à ces réponses, pas celui de l'API publique. Pour connaître l'état actuel d'un défaut, il faudrait aussi vérifier le dépôt et les déploiements de l'application testée."
     }
    ]
   },
   {
    "id": "references",
    "label": "Références",
    "heading": "Références",
    "blocks": [
     {
      "t": "md",
      "md": "- [Dépôt d'automatisation QA](https://github.com/maximejoannis/french-companies-explorer-playwright-agents)\n- [Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md)\n- [Audit final](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md)\n- [README et commandes de reproduction](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/README.md)\n- [Portail des rapports QA](https://maximejoannis.github.io/french-companies-explorer-playwright-agents/)"
     }
    ]
   }
  ]
 }
};
