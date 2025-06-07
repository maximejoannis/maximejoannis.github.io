*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                          http://livraison3.testacademy.fr
${BROWSER}                      chrome
${LOCATOR_BTN_ACCUEIL}          xpath=//header[@id='homey_nav_sticky']/div/div/div/a/img
${LOCATOR_BTN_CHERCHER}         xpath=//button[@type='submit']
${LOCATOR_BTN_SECTION}          xpath=//div[@id='section-body']/section/div[2]/div/div/div/form/div/div/div/button/span
${LOCATOR_INPUT_RECHERCHE}      xpath=//input[@type='text']
${LOCATOR_BTN_RECHERCHER}       xpath=(//button[@type='button'])[12]
${LOCATOR_TITRE_OFFRE}          xpath=//a[contains(text(),'Spacious Single Room')]
${LOCATOR_INPUT_ARRIVEE}        xpath=//input[@name='arrive']
${LOCATOR_INPUT_DEPART}         xpath=//input[@name='depart']
${LOCATOR_INPUT_VOYAGEURS}      xpath=//input[@name='guest']
${LOCATOR_BTN_AJOUT_VOYAGEUR}   xpath=//div[3]/div/div/button/i
${LOCATOR_BTN_RECHERCHE_FINAL}  xpath=(//button[@type='button'])[12]
${LOCATOR_LIEN_STUDIO}          css=.table-block > .title-head-left a
${LOCATOR_BTN_RESERVATION}      xpath=//button[@id='request_for_reservation']
${MESSAGE_ERREUR}               xpath=//*[contains(text(),'Vous devez vous connecter pour effectuer une réservation')]

*** Test Cases ***
Faire Une Demande De Réservation En Tant Qu'Utilisateur Connecté
    Ouvrir Navigateur Et Accéder Au Site
    Cliquer sur le menu Accueil
    Chercher une offre de réservation
    Effectuer la demande de réservation
    Vérifier Message D'Erreur Connexion Requise

*** Keywords ***
Ouvrir Navigateur Et Accéder Au Site
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Implicit Wait    10s

Cliquer sur le menu Accueil
    Wait Until Element Is Visible  ${LOCATOR_BTN_ACCUEIL}  timeout=10s
    Wait Until Element Is Enabled  ${LOCATOR_BTN_ACCUEIL}  timeout=10s
    Sleep  3s
    Scroll Element Into View  ${LOCATOR_BTN_ACCUEIL}
    Click Element  ${LOCATOR_BTN_ACCUEIL}

Chercher une offre de réservation
    Wait Until Element Is Visible  ${LOCATOR_BTN_CHERCHER}  timeout=10s
    Click Element  ${LOCATOR_BTN_CHERCHER}
    Wait Until Element Is Visible  ${LOCATOR_BTN_SECTION}  timeout=10s
    Click Element  ${LOCATOR_BTN_SECTION}
    Wait Until Element Is Visible  ${LOCATOR_INPUT_RECHERCHE}  timeout=10s
    Click Element  ${LOCATOR_INPUT_RECHERCHE}
    Input Text  ${LOCATOR_INPUT_RECHERCHE}   text=San Francisco
    Input Text  ${LOCATOR_INPUT_ARRIVEE}     text=2025-05-20
    Input Text  ${LOCATOR_INPUT_DEPART}      text=2025-05-25
    Press Key  ${LOCATOR_INPUT_RECHERCHE}    \\13
    Click Element  ${LOCATOR_INPUT_VOYAGEURS}
    Click Element  ${LOCATOR_BTN_AJOUT_VOYAGEUR}
    Click Element  xpath=(//button[@type='button'])[9]
    Click Element  ${LOCATOR_BTN_RECHERCHE_FINAL}
    Wait Until Element Is Visible  ${LOCATOR_TITRE_OFFRE}  timeout=10s
    Click Element  ${LOCATOR_TITRE_OFFRE}

Effectuer la demande de réservation
    Wait Until Element Is Visible  ${LOCATOR_LIEN_STUDIO}  timeout=10s
    Wait Until Element Is Enabled  ${LOCATOR_LIEN_STUDIO}  timeout=10s
    Sleep  3s
    Scroll Element Into View  ${LOCATOR_LIEN_STUDIO}
    Click Element  ${LOCATOR_LIEN_STUDIO}
    Wait Until Element Is Visible  ${LOCATOR_BTN_RESERVATION}  timeout=10s
    Click Element  ${LOCATOR_BTN_RESERVATION}

Vérifier Message D'Erreur Connexion Requise
    Wait Until Element Is Visible    ${MESSAGE_ERREUR}
    Element Should Contain    ${MESSAGE_ERREUR}    Vous devez vous connecter pour effectuer une réservation

