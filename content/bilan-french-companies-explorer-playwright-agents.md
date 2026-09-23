# Bilan du projet French Companies Explorer Playwright Agents

*Bilan établi à partir du dépôt et de sa documentation, consultés le 23 septembre 2026.*

## Ce que couvre ce bilan

Ce document résume les difficultés de construction de la suite de tests, les corrections apportées aux tests et les défauts de l'application découverts pendant le projet. Il s'appuie sur la [Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md), l'[audit final](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md) et le [README](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/README.md). Les anciennes conversations ne sont pas accessibles ici : il s'agit d'un bilan des problèmes documentés, pas d'un journal exhaustif de chaque échange ou incident.

Le dépôt concerne **l'automatisation des tests** de French Companies Explorer. Les anomalies de l'application qu'il révèle ne sont pas corrigées dans ce dépôt.

## 1. Problèmes rencontrés dans la construction des tests

| Difficulté | Pourquoi c'était un problème | Réponse mise en place |
| --- | --- | --- |
| API gouvernementale externe | Le réseau, la disponibilité du service et les données publiques peuvent changer sans que le projet les contrôle. | Six tests interrogent la vraie API et vérifient des propriétés observables, comme la structure des réponses, sans figer une entreprise ou un total de résultats. |
| Trouver le bon dosage entre simulation et réalité | Des tests entièrement simulés pourraient manquer une panne d'intégration ; trop de tests réels seraient fragiles et coûteux. | Trois niveaux complémentaires : **6 API réels, 75 UI avec réponses simulées, 3 parcours UI + API réels**. Les simulations, ou *mocks*, servent à fournir des réponses prévisibles pour tester l'interface. |
| Réponses tardives et tests instables | Une recherche ou une pagination ne se termine pas instantanément ; un test peut regarder la page trop tôt. | Attentes sur un état visible et sur la réponse réseau précise, préparées avant l'action. Pas de temporisation fixe employée comme solution générale. |
| Données conservées dans le navigateur | Favoris, comparaison, historique, recherches sauvegardées et thème utilisent `localStorage`. Un scénario pouvait dépendre de ce qu'un autre avait laissé. | État initial maîtrisé pour chaque test ; vérification du stockage, des rechargements réels et, lorsque pertinent, de l'absence d'effet sur les autres données. |
| Risque de confondre ce que fait le produit avec ce qu'il devrait faire | Un test « réparé » pour accepter une erreur de l'application donnerait un faux résultat vert. | Critères d'acceptation conservés comme référence ; défauts décrits séparément et tests attendus conservés avec `test.fixme` quand le produit les empêche de réussir. Les agents IA sont cadrés par `AGENTS.md` et leurs propositions revues. |
| Couverture difficile à interpréter | Le code source du produit et de l'API ne fait pas partie de ce dépôt, et des tests sont volontairement désactivés. | Chaîne de traçabilité **besoin → User Story → critère → cas de test → automatisation** et rapport calculé depuis les sources. « 100 % » signifie que tous les cas planifiés dans le périmètre choisi ont une automatisation ; cela ne mesure pas le code exécuté ni toute l'application. |
| Rapports éparpillés | Des rapports Playwright, Allure, qualité et couverture séparés compliquaient la lecture des résultats. | GitHub Actions lance les contrôles, conserve les preuves et publie un [portail QA consolidé](https://maximejoannis.github.io/french-companies-explorer-playwright-agents/). |

Ces défis et réponses sont décrits dans la [section 9 de la Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md#9-d%C3%A9fis-rencontr%C3%A9s).

## 2. Erreurs détectées dans les tests et corrigées

L'audit a demandé deux corrections avant la clôture ; la Sprint Review indique qu'elles ont été intégrées :

1. **Statut inconnu interprété comme « Cessée ».** Un test d'intégration traitait toute valeur différente de `A`, y compris une valeur absente, comme le statut `C`. Le test ne vérifie désormais un libellé métier que si la vraie réponse contient explicitement `A` ou `C` ; sinon il reste neutre. Cela corrige le **test**, pas les défauts semblables encore présents dans l'application.
2. **Ordre des propriétés d'un export JSON.** Un test exigeait un ordre exact des noms de propriétés. Comme cet ordre n'est pas une exigence du document exporté, l'assertion a été corrigée pour vérifier le contenu sans imposer cet ordre. L'ordre des entreprises du tableau, lui, reste vérifiable lorsqu'il a un sens fonctionnel.

L'[audit final, section 20](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md#20-findings-classifi%C3%A9s), relève aussi deux pistes **optionnelles** : mieux fermer quatre contextes de navigateur créés manuellement en cas d'échec, et harmoniser sept titres de tests sans tag si les campagnes filtrées par tag deviennent importantes. Il ne les présente pas comme des corrections déjà effectuées.

## 3. Les 14 défauts de l'application découverts ou suivis

**Point essentiel :** les 14 défauts sont indiqués **ouverts** dans l'audit. Pour 12 d'entre eux, un test conserve le bon résultat attendu mais porte `test.fixme` : Playwright le signale comme cas connu et ne l'exécute pas normalement. C'est un suivi explicite, **pas une réparation du produit**. Les deux autres sont des dettes d'accessibilité documentées sans désactiver les parcours fonctionnels.

| Défaut | Problème, en clair | Suivi dans la suite QA |
| --- | --- | --- |
| **BUG-001 — Filtre Commune** | L'interface peut envoyer une commune sous une forme que l'API refuse avec HTTP 400. | Test d'intégration avec la vraie API, `fixme` ; résultat attendu : requête acceptée puis résultats ou état vide fonctionnel. |
| **BUG-002 — Taille de page** | Changer le nombre de résultats par page ne recharge pas immédiatement la page 1 avec les bons résultats. | Test UI `fixme` du rechargement et de la cohérence de l'affichage. |
| **BUG-003 — Tri par pertinence** | Revenir à « Pertinence » ne restaure pas l'ordre initial des résultats courants. | Test UI `fixme` de l'ordre attendu. |
| **BUG-004 — Statut dans une fiche** | Un statut absent peut être affiché à tort comme « Cessée ». | Test UI `fixme` exigeant un affichage neutre. |
| **BUG-005 — Favoris** | Le cœur de la fiche ne reflète pas immédiatement l'ajout ou le retrait réellement enregistré. | Test UI `fixme` de la cohérence entre vues et stockage. |
| **BUG-006 — Accessibilité des favoris** | Le contrôle en forme de cœur n'expose pas clairement son nom ou son état aux technologies d'assistance. | Défaut documenté sans `fixme` ; le parcours fonctionnel reste testé. |
| **BUG-007 — Statistiques** | Une entreprise sans statut peut être comptée comme active ou cessée alors que l'information manque. | Test UI `fixme` exigeant qu'elle ne soit comptée dans aucune de ces catégories. |
| **BUG-008 — Comparaison** | Des valeurs absentes, notamment le statut, peuvent devenir de fausses informations dans le tableau. | Test UI `fixme` de la neutralité et de la bonne association aux colonnes. |
| **BUG-009 — Identité de l'historique** | Deux recherches différant par le statut peuvent être fusionnées, ce qui fait disparaître une entrée. | Test UI `fixme` exigeant deux entrées distinctes. |
| **BUG-010 — Ordre de l'historique** | Changer page, taille ou tri peut modifier artificiellement l'ordre des recherches récentes. | Test UI `fixme` conservant la vraie chronologie. |
| **BUG-011 — Nom d'une recherche sauvegardée** | Un nom ne contenant que des espaces peut être accepté. | Cas supplémentaire `TC-SAVED-008`, `fixme`, demandant le refus de ce nom. |
| **BUG-012 — Accessibilité de la suppression** | Plusieurs boutons « × » n'indiquent pas quelle recherche ils suppriment. | Défaut documenté sans `fixme` ; la suppression fonctionnelle reste testée. |
| **BUG-013 — Export de résultats obsolètes** | Pendant le chargement d'une nouvelle recherche, l'export peut contenir les résultats de l'ancienne. | Test UI `fixme` exigeant un export cohérent avec la recherche courante. |
| **BUG-014 — Page invalide dans l'URL** | Un lien contenant `page=abc` peut produire une pagination ou une requête invalide. | Test UI `fixme` exigeant une normalisation à la page 1. |

Source détaillée : [audit final, section 5 — défauts connus](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md#5-audit-des-d%C3%A9fauts-connus).

## 4. Résultat et limites

La **baseline finale documentée** compte **84 tests : 72 réussis, 12 `fixme`/ignorés pour défaut connu, 0 échec inattendu**. Elle couvre les **13 fonctionnalités du périmètre retenu**. Les 83 cas présents dans les plans ont une automatisation ; le 84e, `TC-SAVED-008`, a été ajouté pour BUG-011. La documentation indique un pipeline et un portail opérationnels, ainsi qu'une clôture technique possible du **projet QA**.

Cette clôture ne ferme **aucun des 14 défauts produit**. Les tests avec la vraie API dépendent encore du réseau et d'un service externe ; les tests avec réponses simulées prouvent le comportement de l'interface face à ces réponses, pas celui de l'API publique. Pour connaître l'état actuel d'un défaut, il faudrait aussi vérifier le dépôt et les déploiements de l'application testée.

## Références

- [Dépôt d'automatisation QA](https://github.com/maximejoannis/french-companies-explorer-playwright-agents)
- [Sprint Review](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/SPRINT-REVIEW.md)
- [Audit final](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/AUDIT-FINAL.md)
- [README et commandes de reproduction](https://github.com/maximejoannis/french-companies-explorer-playwright-agents/blob/main/README.md)
- [Portail des rapports QA](https://maximejoannis.github.io/french-companies-explorer-playwright-agents/)
