*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem
Library    String

*** Variables ***
${URL}            http://livraison3.testacademy.fr
${NAVIGATEUR}     chrome
${REMOTE_URL}     None

# --- Auth (existant) ---
${LIEN SE CONNECTER}          xpath=//a[contains(text(),'Se connecter')]
${LIEN SE DECONNECTER}        xpath=(//a[contains(text(),'Se déconnecter')])[3]
${CHAMP NOM UTILISATEUR}      name=username
${CHAMP MOT DE PASSE}         name=password
${UTILISATEUR VALIDE}         mjoan
${MOT DE PASSE VALIDE}        rt
${BOUTON SE CONNECTER}        css=.homey_login_button
${ZONE ERREUR}                css=#modal-login .error
${TITRE PAGE TABLEAU DE BORD} Tableau de bord - Livraison 3

# --- Parcours home -> annonce (locators du .side) ---
${BTN_CHERCHER_HOME}          css=.search-button > .btn-primary:nth-child(1)
${PREMIERE_ANNONCE_TRIGGER}   css=.infobox_trigger:nth-child(1) .hover-effect

# --- Contacter l'hôte (HTML + .side) ---
${BTN_CONTACTER_HOTE}         xpath=//button[@data-target='#modal-contact-host']
${MODAL_CONTACTER_HOTE}       id=modal-contact-host
${BTN_FERMER_MODAL_CONTACT}   css=#modal-contact-host button.close
${TITRE_MODAL_CONTACT}        css=#modal-contact-host .modal-title

${FORM_CONTACTER_HOTE}        xpath=//div[@id='modal-contact-host']//form[@method='POST']

${CHAMP_CONTACT_NOM}          name=name
${CHAMP_CONTACT_EMAIL}        name=email
${CHAMP_CONTACT_TELEPHONE}    name=phone
${CHAMP_CONTACT_MESSAGE}      name=message

${BTN_CONTACT_SOUMETTRE}      css=#modal-contact-host .contact_listing_host
${ZONE_CONTACT_MESSAGES}      css=#modal-contact-host .homey_contact_messages

# --- Champs cachés (HTML) ---
${HIDDEN_TARGET_EMAIL}            xpath=//div[@id='modal-contact-host']//input[@name='target_email']
${HIDDEN_HOST_CONTACT_SECURITY}   xpath=//div[@id='modal-contact-host']//input[@name='host_contact_security']
${HIDDEN_PERMALINK}              xpath=//div[@id='modal-contact-host']//input[@name='permalink']
${HIDDEN_LISTING_TITLE}           xpath=//div[@id='modal-contact-host']//input[@name='listing_title']
${HIDDEN_ACTION}                 xpath=//div[@id='modal-contact-host']//input[@name='action']


*** Keywords ***
# ---------- Setup / Teardown ----------
Setup Test
    Log    ==================================================    console=yes
    Log    [SETUP] Démarrage du test: ${TEST NAME}    console=yes
    Log    [SETUP] URL cible: ${URL}    console=yes
    Log    [SETUP] Navigateur: ${NAVIGATEUR}    console=yes
    Log    [SETUP] REMOTE_URL: ${REMOTE_URL}    console=yes
    Log    ==================================================    console=yes

    Ouvrir Le Navigateur Et Accéder A L'Application

    ${url}=    Get Location
    Log    [SETUP] URL ouverte: ${url}    console=yes

Teardown Test
    Run Keyword If Test Failed    Capturer Preuves Echec

    ${url}=    Get Location
    Log    [TEARDOWN] URL finale: ${url}    console=yes
    Log    [TEARDOWN] Fin du test: ${TEST NAME}    console=yes
    Log    ==================================================    console=yes

    Fermer Le Navigateur


Capturer Preuves Echec
    ${ts}=    Get Current Date    result_format=%Y%m%d_%H%M%S
    ${nom}=   Set Variable    ${TEST NAME}

    # Nettoyage pour noms de fichiers (CI friendly)
    ${safe}=    Replace String    ${nom}    ${SPACE}    _
    ${safe}=    Replace String    ${safe}    /    _
    ${safe}=    Replace String    ${safe}    :    _
    ${safe}=    Replace String    ${safe}    \    _

    Log    [ECHEC] Capture des preuves pour: ${nom}    console=yes

    # Mettre les preuves dans results/ (uploadé en artefact)
    Create Directory    results

    Capture Page Screenshot    results/FAIL_${safe}_${ts}.png

    ${html}=    Get Source
    Create File    results/FAIL_${safe}_${ts}.html    ${html}    encoding=UTF-8

    ${url}=    Get Location
    Log    [ECHEC] URL: ${url}    console=yes


# ---------- Navigation ----------
Ouvrir Le Navigateur Et Accéder A L'Application
    Run Keyword If    '${REMOTE_URL}'!='None'
    ...    Open Browser    ${URL}    ${NAVIGATEUR}    remote_url=${REMOTE_URL}
    ...    ELSE
    ...    Open Browser    ${URL}    ${NAVIGATEUR}

    Maximize Browser Window

Fermer Le Navigateur
    Close Browser


# ---------- Parcours ----------
Accéder A La Page De Connexion
    Click Element    ${LIEN SE CONNECTER}

Aller Sur La Premiere Annonce Depuis La Home
    Wait Until Element Is Visible    ${BTN_CHERCHER_HOME}
    Click Element    ${BTN_CHERCHER_HOME}
    Execute Javascript    window.scrollTo(0,0)
    Wait Until Element Is Visible    ${PREMIERE_ANNONCE_TRIGGER}
    Click Element    ${PREMIERE_ANNONCE_TRIGGER}

Ouvrir La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_CONTACTER_HOTE}
    Click Element    ${BTN_CONTACTER_HOTE}
    Wait Until Element Is Visible    ${MODAL_CONTACTER_HOTE}

Fermer La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_FERMER_MODAL_CONTACT}
    Click Element    ${BTN_FERMER_MODAL_CONTACT}


# ---------- Form helpers ----------
Renseigner Le Formulaire Contacter L'Hote
    [Arguments]    ${nom}    ${email}    ${telephone}    ${message}
    Wait Until Element Is Visible    ${CHAMP_CONTACT_NOM}
    Click Element    ${CHAMP_CONTACT_NOM}
    Input Text       ${CHAMP_CONTACT_NOM}        ${nom}
    Click Element    ${CHAMP_CONTACT_EMAIL}
    Input Text       ${CHAMP_CONTACT_EMAIL}      ${email}
    Click Element    ${CHAMP_CONTACT_TELEPHONE}
    Input Text       ${CHAMP_CONTACT_TELEPHONE}  ${telephone}
    Click Element    ${CHAMP_CONTACT_MESSAGE}
    Input Text       ${CHAMP_CONTACT_MESSAGE}    ${message}

Soumettre Le Formulaire Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_CONTACT_SOUMETTRE}
    Click Element    ${BTN_CONTACT_SOUMETTRE}

Textfield Value Should Be
    [Arguments]    ${locator}    ${expected}
    ${value}=    Get Value    ${locator}
    Should Be Equal    ${value}    ${expected}

Textarea Value Should Be
    [Arguments]    ${locator}    ${expected}
    ${value}=    Get Value    ${locator}
    Should Be Equal    ${value}    ${expected}

Element Attribute Should Be
    [Arguments]    ${locator}    ${attribute}    ${expected}
    ${value}=    Get Element Attribute    ${locator}    ${attribute}
    Should Be Equal    ${value}    ${expected}

Element Attribute Should Not Be Empty
    [Arguments]    ${locator}    ${attribute}
    ${value}=    Get Element Attribute    ${locator}    ${attribute}
    Should Not Be Empty    ${value}
