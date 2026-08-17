# Portfolio QA — Maxime Joannis

Portfolio statique moderne, responsive et **100 % français**, construit en HTML5, CSS3 et JavaScript vanilla.

## Lancer localement

Ouvrir `index.html` directement dans un navigateur, ou démarrer un serveur local :

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Structure

- `index.html` : page portfolio principale
- `assets/css/styles.css` : thème, responsive et animations
- `assets/js/app.js` : contenu dynamique, projets, stabilité GitHub Actions, animations et navigation
- `assets/img/maxime-joannis.jpg` : photo de profil fournie

## Projets présentés

1. SauceDemo QA Automation — actif
2. Restful Booker Playwright — actif
3. SauceDemo V2 — grisé / bientôt disponible
4. Restful Booker V2 — grisé / bientôt disponible

## Stabilité pipeline

Pour SauceDemo et Restful Booker, la valeur « stabilité pipeline » n'est pas un bouton. Elle est calculée côté navigateur à partir de l'API REST publique GitHub Actions :

`GET /repos/{owner}/{repo}/actions/runs?per_page=20`

Le taux affiché correspond au nombre de conclusions `success` divisé par le nombre d'exécutions `completed` parmi les 20 dernières exécutions retournées. En cas d'indisponibilité de l'API ou de dépassement du quota public, la valeur affichée devient `N/D`.

## Principes implémentés

- site uniquement en français ;
- responsive, navigation fixe et scroll fluide ;
- Intersection Observer et respect de `prefers-reduced-motion` ;
- quatre cartes projets, dont deux V2 volontairement grisées ;
- quatre projets animés en orbite autour de la photo de profil ;
- section « Apprentissages » issue des travaux présentés ;
- aucune librairie JavaScript externe.

## Filtrage des projets
La section Projets comporte des filtres accessibles : Tous, Automatisation, UI + API et À venir. Les compteurs sont calculés depuis les métadonnées des projets dans `assets/js/app.js`.

## Activer le formulaire de contact Formspree

Le formulaire est déjà intégré dans `index.html` et utilise une soumission AJAX sans rechargement de page.

1. Créer un formulaire sur Formspree avec l'adresse de réception `maxime.joannis6@gmail.com`.
2. Copier l'identifiant du formulaire fourni par Formspree (exemple : `xabcdefg`).
3. Dans `index.html`, remplacer :
   `https://formspree.io/f/moeakwea`
   par :
   `https://formspree.io/f/moeakwea`
4. Déployer de nouveau le portfolio sur GitHub Pages.
5. Effectuer un premier envoi de test et, si Formspree le demande, confirmer l'adresse Gmail.

Le formulaire contient : Nom, Email, Objet, Message, validation navigateur, état d'envoi, message de succès/erreur et champ honeypot anti-spam.


## V10
- Endpoint Formspree conservé sur le Form ID actif `mwlerboo`.


## V12
- Footer agrandi sur toutes les pages du portfolio et des portails QA.
- Hauteur minimale desktop : 220 px ; mobile : 190 px.
- Contenu centré verticalement pour un rendu de véritable pied de page.


## V14 — Footer
Footer étendu inspiré du modèle fourni, mais réaligné sur la charte claire du portfolio (Poppins, #2563eb / #1e40af, fonds blanc / #f3f4f6, interactions sobres).
