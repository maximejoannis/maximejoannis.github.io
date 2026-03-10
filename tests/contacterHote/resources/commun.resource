*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem
Library    String

*** Variables ***
${URL}            http://livraison3.testacademy.fr
${NAVIGATEUR}     chrome
${REMOTE_URL}     None

# --- Timeouts centralisés ---
${TIMEOUT_UI}           15s
${TIMEOUT_LONG}         30s
${SELENIUM_TIMEOUT}     15s
${SELENIUM_IMPLICIT}    0s

# --- Auth (existant) ---
${LIEN SE CONNECTER}             xpath=//a[contains(text(),'Se connecter')]
${LIEN SE DECONNECTER}           xpath=(//a[contains(text(),'Se déconnecter')])[3]
${CHAMP NOM UTILISATEUR}         name=username
${CHAMP MOT DE PASSE}            name=password
${UTILISATEUR VALIDE}            mjoan
${MOT DE PASSE VALIDE}           rt
${BOUTON SE CONNECTER}           css=.homey_login_button
${ZONE ERREUR}                   css=#modal-login .error
${TITRE PAGE TABLEAU DE BORD}    Tableau de bord - Livraison 3

# --- Parcours home -> annonce ---
${BTN_CHERCHER_HOME}             css=.search-button .btn-primary
${PREMIERE_ANNONCE_TRIGGER}      xpath=(//div[contains(@class,'infobox_trigger')]//*[contains(@class,'hover-effect')])[1]

# --- Contacter l'hôte ---
${BTN_CONTACTER_HOTE}            xpath=//button[@data-target='#modal-contact-host']
${MODAL_CONTACTER_HOTE}          id=modal-contact-host
${BTN_FERMER_MODAL_CONTACT}      css=#modal-contact-host button.close
${TITRE_MODAL_CONTACT}           css=#modal-contact-host .modal-title

${FORM_CONTACTER_HOTE}           xpath=//div[@id='modal-contact-host']//form[@method='POST']

${CHAMP_CONTACT_NOM}             name=name
${CHAMP_CONTACT_EMAIL}           name=email
${CHAMP_CONTACT_TELEPHONE}       name=phone
${CHAMP_CONTACT_MESSAGE}         name=message

${BTN_CONTACT_SOUMETTRE}         css=#modal-contact-host .contact_listing_host
${ZONE_CONTACT_MESSAGES}         css=#modal-contact-host .homey_contact_messages

# --- Champs cachés ---
${HIDDEN_TARGET_EMAIL}            xpath=//div[@id='modal-contact-host']//input[@name='target_email']
${HIDDEN_HOST_CONTACT_SECURITY}   xpath=//div[@id='modal-contact-host']//input[@name='host_contact_security']
${HIDDEN_PERMALINK}               xpath=//div[@id='modal-contact-host']//input[@name='permalink']
${HIDDEN_LISTING_TITLE}           xpath=//div[@id='modal-contact-host']//input[@name='listing_title']
${HIDDEN_ACTION}                  xpath=//div[@id='modal-contact-host']//input[@name='action']

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

    ${url}=    Safe Get Location
    Log    [SETUP] URL ouverte: ${url}    console=yes

Teardown Test
    Run Keyword If Test Failed    Capturer Preuves Echec

    ${url}=    Safe Get Location
    Log    [TEARDOWN] URL finale: ${url}    console=yes
    Log    [TEARDOWN] Fin du test: ${TEST NAME}    console=yes
    Log    ==================================================    console=yes

    Safe Close Browser

# ---------- Utils ----------
Sanitize Filename
    [Arguments]    ${name}
    ${safe}=    Replace String Using Regexp    ${name}    ["<>:|*?\r\n]    _
    ${safe}=    Replace String Using Regexp    ${safe}    [\\/]    _
    ${safe}=    Replace String Using Regexp    ${safe}    \s+    _
    RETURN    ${safe}

Safe Get Location
    ${res}=    Run Keyword And Ignore Error    Get Location
    ${status}=    Set Variable    ${res}[0]
    IF    $status != 'PASS'
        RETURN    N/A
    END

    ${value}=    Set Variable    ${res}[1]
    IF    $value == $NONE
        RETURN    N/A
    END

    RETURN    ${value}

Safe Capture Page Screenshot
    [Arguments]    ${path}
    Run Keyword And Ignore Error    Capture Page Screenshot    ${path}

Safe Get Source
    ${res}=    Run Keyword And Ignore Error    Get Source
    RETURN    ${res}

Safe Close Browser
    Run Keyword And Ignore Error    Close Browser

Capturer Preuves Echec
    ${ts}=      Get Current Date    result_format=%Y%m%d_%H%M%S
    ${nom}=     Set Variable    ${TEST NAME}
    ${safe}=    Sanitize Filename    ${nom}

    Log    [ECHEC] Capture des preuves pour: ${nom}    console=yes

    Create Directory    results
    Safe Capture Page Screenshot    results/FAIL_${safe}_${ts}.png

    ${src}=    Safe Get Source
    ${src_status}=    Set Variable    ${src}[0]
    IF    $src_status == 'PASS'
        ${src_value}=    Set Variable    ${src}[1]
        Create File    results/FAIL_${safe}_${ts}.html    ${src_value}    encoding=UTF-8
    END

    ${url}=    Safe Get Location
    Log    [ECHEC] URL: ${url}    console=yes

Wait And Scroll To Element
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT_UI}
    Wait Until Page Contains Element    ${locator}    ${timeout}
    Scroll Element Into View    ${locator}

Cliquer Sur Element De Facon Robuste
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT_UI}
    Wait Until Page Contains Element    ${locator}    ${timeout}
    Scroll Element Into View    ${locator}
    Wait Until Keyword Succeeds    3x    1s    Click Element    ${locator}

Cliquer Sur Element CSS De Facon Robuste
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT_UI}
    Wait Until Page Contains Element    ${locator}    ${timeout}
    Scroll Element Into View    ${locator}
    ${clicked}=    Run Keyword And Return Status    Wait Until Keyword Succeeds    2x    1s    Click Element    ${locator}
    IF    not ${clicked}
        ${css}=    Replace String    ${locator}    css=
        Execute Javascript    document.querySelector(arguments[0]).click();    ${css}
    END

# ---------- Navigation ----------
Ouvrir Le Navigateur Et Accéder A L'Application
    IF    '${REMOTE_URL}' != 'None'
        Open Browser    ${URL}    ${NAVIGATEUR}    remote_url=${REMOTE_URL}
    ELSE
        Open Browser    ${URL}    ${NAVIGATEUR}
    END

    Set Window Size    1600    1200
    Set Selenium Timeout    ${SELENIUM_TIMEOUT}
    Set Selenium Implicit Wait    ${SELENIUM_IMPLICIT}
    Wait Until Keyword Succeeds    5x    2s    Wait Until Page Contains Element    css=body    ${TIMEOUT_UI}

Fermer Le Navigateur
    Close Browser

# ---------- Parcours ----------
Accéder A La Page De Connexion
    Click Element    ${LIEN SE CONNECTER}

Aller Sur La Premiere Annonce Depuis La Home
    Wait Until Page Contains Element    css=body    ${TIMEOUT_UI}
    Set Window Size    1600    1200
    Execute Javascript    window.scrollTo(0, 0)

    ${bouton_recherche_present}=    Run Keyword And Return Status
    ...    Wait Until Page Contains Element    ${BTN_CHERCHER_HOME}    5s

    IF    ${bouton_recherche_present}
        Log    [INFO] Bouton rechercher détecté sur la home.    console=yes
        Scroll Element Into View    ${BTN_CHERCHER_HOME}
        Run Keyword And Ignore Error    Click Element    ${BTN_CHERCHER_HOME}
        Sleep    2s
    ELSE
        Log    [INFO] Bouton rechercher absent, on tente l'accès direct à la première annonce.    console=yes
    END

    Wait Until Page Contains Element    ${PREMIERE_ANNONCE_TRIGGER}    ${TIMEOUT_UI}
    Scroll Element Into View    ${PREMIERE_ANNONCE_TRIGGER}
    Wait Until Keyword Succeeds    3x    2s    Click Element    ${PREMIERE_ANNONCE_TRIGGER}

Ouvrir La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_CONTACTER_HOTE}    ${TIMEOUT_UI}
    Click Element    ${BTN_CONTACTER_HOTE}
    Wait Until Element Is Visible    ${MODAL_CONTACTER_HOTE}    ${TIMEOUT_UI}

Fermer La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_FERMER_MODAL_CONTACT}    ${TIMEOUT_UI}
    Click Element    ${BTN_FERMER_MODAL_CONTACT}

# ---------- Form helpers ----------
Renseigner Le Formulaire Contacter L'Hote
    [Arguments]    ${nom}    ${email}    ${telephone}    ${message}
    Wait Until Element Is Visible    ${CHAMP_CONTACT_NOM}    ${TIMEOUT_UI}
    Click Element    ${CHAMP_CONTACT_NOM}
    Input Text    ${CHAMP_CONTACT_NOM}    ${nom}
    Click Element    ${CHAMP_CONTACT_EMAIL}
    Input Text    ${CHAMP_CONTACT_EMAIL}    ${email}
    Click Element    ${CHAMP_CONTACT_TELEPHONE}
    Input Text    ${CHAMP_CONTACT_TELEPHONE}    ${telephone}
    Click Element    ${CHAMP_CONTACT_MESSAGE}
    Input Text    ${CHAMP_CONTACT_MESSAGE}    ${message}

Soumettre Le Formulaire Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_CONTACT_SOUMETTRE}    ${TIMEOUT_UI}
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
