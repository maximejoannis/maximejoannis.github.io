*** Settings ***
Resource    resources/commun.resource
Test Setup       Setup Test
Test Teardown    Teardown Test

*** Test Cases ***
CT1 - Accéder à une annonce et vérifier la présence du module de réservation
    Aller Sur La Premiere Annonce Depuis La Home
    Page Should Contain Element    ${CHAMP_RESERVATION_ARRIVEE}
    Page Should Contain Element    ${CHAMP_RESERVATION_DEPART}
    Page Should Contain Element    ${CHAMP_RESERVATION_VOYAGEURS}
    Page Should Contain Element    ${BTN_DEMANDE_RESERVATION}

# ================================================================
# TESTS EN QUARANTAINE (QUARANTINE TESTS)
#
# Les tests ci-dessous sont temporairement exclus de l’exécution
# automatique dans le pipeline CI/CD (GitHub Actions) via l’option :
#
#    robot --exclude quarantine tests/
#
# Raison :
# Ces tests sont instables (flaky) en raison du comportement dynamique
# du composant DatePicker et/ou de messages UI dépendants du contexte
# de réservation.
#
# Symptômes observés :
# - champ date parfois non renseigné après sélection calendrier
# - message "Vous devez vous connecter" non toujours déclenché
# - rendu du calendrier dépendant du DOM dynamique
#
# Décision QA :
# Les tests sont conservés pour investigation future mais exclus
# temporairement afin de maintenir un pipeline CI stable.
#
# Action future :
# - stabiliser les locators du calendrier
# - sécuriser la sélection de dates
# - vérifier le déclenchement du message de connexion
#
# Auteur : Maxime Joannis – QA Automation
# ================================================================
CT2 - Sélectionner une date d'arrivée et une date de départ
    [Tags]    quarantine
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner Une Date D'Arrivee Et Une Date De Depart
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_ARRIVEE}
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_DEPART}

CT3 - Sélectionner des voyageurs (adulte + enfant) et appliquer
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner Des Voyageurs (1 Adulte + 1 Enfant)
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_VOYAGEURS}

CT4 - Sélectionner un extra ("Breakfast")
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner L'Extra "Breakfast"
    Checkbox Should Be Selected    ${CHK_EXTRA_BREAKFAST}

# ================================================================
# TESTS EN QUARANTAINE (QUARANTINE TESTS)
#
# Les tests ci-dessous sont temporairement exclus de l’exécution
# automatique dans le pipeline CI/CD (GitHub Actions) via l’option :
#
#    robot --exclude quarantine tests/
#
# Raison :
# Ces tests sont instables (flaky) en raison du comportement dynamique
# du composant DatePicker et/ou de messages UI dépendants du contexte
# de réservation.
#
# Symptômes observés :
# - champ date parfois non renseigné après sélection calendrier
# - message "Vous devez vous connecter" non toujours déclenché
# - rendu du calendrier dépendant du DOM dynamique
#
# Décision QA :
# Les tests sont conservés pour investigation future mais exclus
# temporairement afin de maintenir un pipeline CI stable.
#
# Action future :
# - stabiliser les locators du calendrier
# - sécuriser la sélection de dates
# - vérifier le déclenchement du message de connexion
#
# Auteur : Maxime Joannis – QA Automation
# ================================================================
CT5 - Demande de réservation non connecté affiche le message "Vous devez vous connecter..."
    [Tags]    quarantine
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner Une Date D'Arrivee Et Une Date De Depart
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_ARRIVEE}
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_DEPART}
    Selectionner Des Voyageurs (1 Adulte + 1 Enfant)
    Field Value Should Not Be Empty    ${CHAMP_RESERVATION_VOYAGEURS}
    Cliquer Sur "Demande De Réservation"
    Wait Until Page Contains    ${MSG_CONNEXION_POUR_RESERVATION}    15s
    Page Should Contain    ${MSG_CONNEXION_POUR_RESERVATION}

CT6 - Vérifier les attributs des champs (readonly + placeholders)
    Aller Sur La Premiere Annonce Depuis La Home
    Element Attribute Should Not Be Empty    ${CHAMP_RESERVATION_ARRIVEE}    readonly
    Element Attribute Should Not Be Empty    ${CHAMP_RESERVATION_DEPART}    readonly
    Element Attribute Should Not Be Empty    ${CHAMP_RESERVATION_VOYAGEURS}    readonly
    Element Attribute Should Be    ${CHAMP_RESERVATION_ARRIVEE}    placeholder    Début
    Element Attribute Should Be    ${CHAMP_RESERVATION_DEPART}    placeholder    Fin
    Element Attribute Should Be    ${CHAMP_RESERVATION_VOYAGEURS}    placeholder    Voyageurs

# ================================================================
# TESTS EN QUARANTAINE (QUARANTINE TESTS)
#
# Les tests ci-dessous sont temporairement exclus de l’exécution
# automatique dans le pipeline CI/CD (GitHub Actions) via l’option :
#
#    robot --exclude quarantine tests/
#
# Raison :
# Ces tests sont instables (flaky) en raison du comportement dynamique
# du composant DatePicker et/ou de messages UI dépendants du contexte
# de réservation.
#
# Symptômes observés :
# - champ date parfois non renseigné après sélection calendrier
# - message "Vous devez vous connecter" non toujours déclenché
# - rendu du calendrier dépendant du DOM dynamique
#
# Décision QA :
# Les tests sont conservés pour investigation future mais exclus
# temporairement afin de maintenir un pipeline CI stable.
#
# Action future :
# - stabiliser les locators du calendrier
# - sécuriser la sélection de dates
# - vérifier le déclenchement du message de connexion
#
# Auteur : Maxime Joannis – QA Automation
# ================================================================
CT7 - Ouvrir le calendrier via le champ arrivée affiche le calendrier
    [Tags]    quarantine
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir Le Calendrier (Champ Arrivee)
    Page Should Contain Element    ${CALENDRIER_JOUR_COURANT}

CT8 - Ouvrir le sélecteur de voyageurs affiche le bouton Appliquer
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir Le Sélecteur Voyageurs
    Page Should Contain Element    ${BTN_APPLIQUER_VOYAGEURS}

CT9 - Sélectionner un extra ("Lunch")
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner L'Extra "Lunch"
    Checkbox Should Be Selected    ${CHK_EXTRA_LUNCH}

CT10 - Sélectionner plusieurs extras (Breakfast + Lunch + Dinner)
    Aller Sur La Premiere Annonce Depuis La Home
    Selectionner L'Extra "Breakfast"
    Selectionner L'Extra "Lunch"
    Selectionner L'Extra "Dinner"
    Checkbox Should Be Selected    ${CHK_EXTRA_BREAKFAST}
    Checkbox Should Be Selected    ${CHK_EXTRA_LUNCH}
    Checkbox Should Be Selected    ${CHK_EXTRA_DINNER}
