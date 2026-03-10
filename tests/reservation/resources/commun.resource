*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem
Library    String

*** Variables ***
${URL}    http://livraison3.testacademy.fr
${NAVIGATEUR}    chrome
${REMOTE_URL}    None

# --- Timeouts centralisés ---
${TIMEOUT_UI}           15s
${TIMEOUT_LONG}         30s
${SELENIUM_TIMEOUT}     15s
${SELENIUM_IMPLICIT}    0s

# --- Auth (existant) ---
${LIEN SE CONNECTER}    xpath=//a[contains(text(),'Se connecter')]
${LIEN SE_DECONNECTER}    xpath=(//a[contains(text(),'Se déconnecter')])[3]
${CHAMP NOM UTILISATEUR}    name=username
${CHAMP MOT DE PASSE}    name=password
${UTILISATEUR VALIDE}    mjoan
${MOT DE PASSE VALIDE}    rt
${BOUTON SE CONNECTER}    css=.homey_login_button
${ZONE ERREUR}    css=#modal-login .error
${TITRE PAGE TABLEAU DE BORD}    Tableau de bord - Livraison 3

# --- Parcours home -> annonce ---
${BTN_CHERCHER_HOME}    css=.search-button > .btn-primary:nth-child(1)
${PREMIERE_ANNONCE_TRIGGER}    css=.infobox_trigger:nth-child(1) .hover-effect

# --- Demande de réservation ---
${CHAMP_RESERVATION_ARRIVEE}    name=arrive
${CHAMP_RESERVATION_DEPART}    name=depart
${CHAMP_RESERVATION_VOYAGEURS}    name=guests

# Calendrier : locators rendus plus robustes
${CALENDRIER_WRAPPER}    id=single-booking-search-calendar
${CALENDRIER_JOUR_COURANT}    css=#single-booking-search-calendar .current-day
${CALENDRIER_JOUR_DEPART}    xpath=(//div[@id='single-booking-search-calendar']//td[not(contains(@class,'disabled')) and not(contains(@class,'past')) and not(contains(@class,'week')) and .//span[contains(@class,'day-number')]])[2]

${BTN_ADULTE_PLUS}    css=.sidebar-booking-module-body:nth-child(2) .adult_plus > .fa
${BTN_ENFANT_PLUS}    css=.sidebar-booking-module-body:nth-child(2) .child_plus > .fa
${BTN_APPLIQUER_VOYAGEURS}    css=.sidebar-booking-module-body:nth-child(2) .guest-apply-btn > .btn

${CHK_EXTRA_BREAKFAST}    css=#homey_remove_on_mobile input[name="extra_price[]"][data-name="Breakfast"]
${LBL_EXTRA_BREAKFAST}    xpath=//div[@id='homey_remove_on_mobile']//label[contains(@class,'homey_extra_price')][.//span[contains(@class,'control-text') and normalize-space(.)='Breakfast']]

${CHK_EXTRA_LUNCH}    css=#homey_remove_on_mobile input[name="extra_price[]"][data-name="Lunch"]
${LBL_EXTRA_LUNCH}    xpath=//div[@id='homey_remove_on_mobile']//label[contains(@class,'homey_extra_price')][.//span[contains(@class,'control-text') and normalize-space(.)='Lunch']]

${CHK_EXTRA_DINNER}    css=#homey_remove_on_mobile input[name="extra_price[]"][data-name="Dinner"]
${LBL_EXTRA_DINNER}    xpath=//div[@id='homey_remove_on_mobile']//label[contains(@class,'homey_extra_price')][.//span[contains(@class,'control-text') and normalize-space(.)='Dinner']]

${BTN_DEMANDE_RESERVATION}    id=request_for_reservation
${MSG_CONNEXION_POUR_RESERVATION}    Vous devez vous connecter pour effectuer une réservation

# --- Contacter l'hôte ---
${BTN_CONTACTER_HOTE}    xpath=//button[@data-target='#modal-contact-host']
${MODAL_CONTACTER_HOTE}    id=modal-contact-host
${BTN_FERMER_MODAL_CONTACT}    css=#modal-contact-host button.close
${TITRE_MODAL_CONTACT}    css=#modal-contact-host .modal-title

${FORM_CONTACTER_HOTE}    xpath=//div[@id='modal-contact-host']//form[@method='POST']

${CHAMP_CONTACT_NOM}    name=name
${CHAMP_CONTACT_EMAIL}    name=email
${CHAMP_CONTACT_TELEPHONE}    name=phone
${CHAMP_CONTACT_MESSAGE}    name=message

${BTN_CONTACT_SOUMETTRE}    css=#modal-contact-host .contact_listing_host
${ZONE_CONTACT_MESSAGES}    css=#modal-contact-host .homey_contact_messages


*** Keywords ***
Setup Test
    Log    [SETUP] ${TEST NAME}    console=yes
    Ouvrir Le Navigateur Et Accéder A L'Application
    ${url}=    Safe Get Location
    Log    [SETUP] URL ouverte: ${url}    console=yes

Teardown Test
    Run Keyword If Test Failed    Capturer Preuves Echec
    ${url}=    Safe Get Location
    Log    [TEARDOWN] URL finale: ${url}    console=yes
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
    ${value}=     Set Variable    ${res}[1]
    IF    '${status}' != 'PASS' or '${value}' == '${NONE}'
        ${value}=    Set Variable    N/A
    END
    RETURN    ${value}

Safe Capture Page Screenshot
    [Arguments]    ${path}
    Run Keyword And Ignore Error    Capture Page Screenshot    ${path}

Safe Close Browser
    Run Keyword And Ignore Error    Close Browser


Capturer Preuves Echec
    ${ts}=    Get Current Date    result_format=%Y%m%d_%H%M%S
    ${nom}=   Set Variable    ${TEST NAME}
    ${safe}=    Sanitize Filename    ${nom}

    Create Directory    results

    Safe Capture Page Screenshot    results/FAIL_${safe}_${ts}.png

    ${src}=    Run Keyword And Ignore Error    Get Source
    IF    '${src}[0]' == 'PASS'
        Create File    results/FAIL_${safe}_${ts}.html    ${src}[1]    encoding=UTF-8
    END

    ${url}=    Safe Get Location
    Log    [ECHEC] URL: ${url}    console=yes


Ouvrir Le Navigateur Et Accéder A L'Application
    Run Keyword If    '${REMOTE_URL}'!='None'
    ...    Open Browser    ${URL}    ${NAVIGATEUR}    remote_url=${REMOTE_URL}
    ...    ELSE
    ...    Open Browser    ${URL}    ${NAVIGATEUR}

    Set Window Size    1920    1080
    Set Selenium Timeout    ${SELENIUM_TIMEOUT}
    Set Selenium Implicit Wait    ${SELENIUM_IMPLICIT}


Fermer Le Navigateur
    Close Browser

# =========================
# Utilitaires "métier" (logging clair)
# =========================
Etape
    [Arguments]    ${message}
    Log    [ETAPE] ${message}    console=yes

Attendre Que Le Champ Reservation Soit Renseigne
    [Arguments]    ${locator}
    Wait Until Keyword Succeeds    5x    1s    Field Value Should Not Be Empty    ${locator}

Selectionner La Premiere Date Disponible De Depart
    Wait Until Page Contains Element    ${CALENDRIER_WRAPPER}    ${TIMEOUT_UI}
    Wait Until Element Is Visible    ${CALENDRIER_JOUR_DEPART}    ${TIMEOUT_UI}
    Scroll Element Into View    ${CALENDRIER_JOUR_DEPART}
    Click Element    ${CALENDRIER_JOUR_DEPART}

# =========================
# Auth (existant)
# =========================
Accéder A La Page De Connexion
    Click Element    ${LIEN SE CONNECTER}

Saisir Le Nom D'Utilisateur
    [Arguments]    ${utilisateur valide}
    Wait Until Element Is Visible    ${CHAMP NOM UTILISATEUR}    ${TIMEOUT_UI}
    Click Element    ${CHAMP NOM UTILISATEUR}
    Input Text    ${CHAMP NOM UTILISATEUR}    ${utilisateur valide}

Saisir Le Mot De Passe
    [Arguments]    ${mot de passe}
    Input Text    ${CHAMP MOT DE PASSE}    ${mot de passe}

Soumette Le Formulaire De Connexion
    Click Button    ${BOUTON SE CONNECTER}

# =========================
# Parcours home -> annonce
# =========================
Aller Sur La Premiere Annonce Depuis La Home
    Etape    Aller sur la première annonce depuis la home
    Wait Until Element Is Visible    ${BTN_CHERCHER_HOME}    ${TIMEOUT_UI}
    Click Element    ${BTN_CHERCHER_HOME}
    Execute Javascript    window.scrollTo(0,0)
    Wait Until Element Is Visible    ${PREMIERE_ANNONCE_TRIGGER}    ${TIMEOUT_UI}
    Click Element    ${PREMIERE_ANNONCE_TRIGGER}

# =========================
# Demande de réservation (non connecté)
# =========================
Selectionner Une Date D'Arrivee Et Une Date De Depart
    Etape    Sélectionner une date d'arrivée et une date de départ
    Wait Until Element Is Visible    ${CHAMP_RESERVATION_ARRIVEE}    ${TIMEOUT_UI}
    Click Element    ${CHAMP_RESERVATION_ARRIVEE}

    Wait Until Element Is Visible    ${CALENDRIER_JOUR_COURANT}    ${TIMEOUT_UI}
    Scroll Element Into View    ${CALENDRIER_JOUR_COURANT}
    Click Element    ${CALENDRIER_JOUR_COURANT}
    Attendre Que Le Champ Reservation Soit Renseigne    ${CHAMP_RESERVATION_ARRIVEE}

    Selectionner La Premiere Date Disponible De Depart
    Attendre Que Le Champ Reservation Soit Renseigne    ${CHAMP_RESERVATION_DEPART}

Selectionner Des Voyageurs (1 Adulte + 1 Enfant)
    Etape    Sélectionner des voyageurs (1 adulte + 1 enfant)
    Wait Until Element Is Visible    ${CHAMP_RESERVATION_VOYAGEURS}    ${TIMEOUT_UI}
    Click Element    ${CHAMP_RESERVATION_VOYAGEURS}
    Wait Until Element Is Visible    ${BTN_ADULTE_PLUS}    ${TIMEOUT_UI}
    Click Element    ${BTN_ADULTE_PLUS}
    Wait Until Element Is Visible    ${BTN_ENFANT_PLUS}    ${TIMEOUT_UI}
    Click Element    ${BTN_ENFANT_PLUS}
    Wait Until Element Is Visible    ${BTN_APPLIQUER_VOYAGEURS}    ${TIMEOUT_UI}
    Click Element    ${BTN_APPLIQUER_VOYAGEURS}

Ouvrir Le Calendrier (Champ Arrivee)
    Etape    Ouvrir le calendrier via le champ arrivée
    Wait Until Element Is Visible    ${CHAMP_RESERVATION_ARRIVEE}    ${TIMEOUT_UI}
    Click Element    ${CHAMP_RESERVATION_ARRIVEE}
    Wait Until Element Is Visible    ${CALENDRIER_JOUR_COURANT}    ${TIMEOUT_UI}

Ouvrir Le Sélecteur Voyageurs
    Etape    Ouvrir le sélecteur voyageurs
    Wait Until Element Is Visible    ${CHAMP_RESERVATION_VOYAGEURS}    ${TIMEOUT_UI}
    Click Element    ${CHAMP_RESERVATION_VOYAGEURS}
    Wait Until Element Is Visible    ${BTN_APPLIQUER_VOYAGEURS}    ${TIMEOUT_UI}

Selectionner L'Extra "Breakfast"
    Etape    Sélectionner l'extra Breakfast
    Wait Until Page Contains Element    ${LBL_EXTRA_BREAKFAST}    ${TIMEOUT_UI}
    Scroll Element Into View    ${LBL_EXTRA_BREAKFAST}
    Wait Until Element Is Visible    ${LBL_EXTRA_BREAKFAST}    ${TIMEOUT_UI}
    Click Element    ${LBL_EXTRA_BREAKFAST}

Selectionner L'Extra "Lunch"
    Etape    Sélectionner l'extra Lunch
    Wait Until Page Contains Element    ${LBL_EXTRA_LUNCH}    ${TIMEOUT_UI}
    Scroll Element Into View    ${LBL_EXTRA_LUNCH}
    Wait Until Element Is Visible    ${LBL_EXTRA_LUNCH}    ${TIMEOUT_UI}
    Click Element    ${LBL_EXTRA_LUNCH}

Selectionner L'Extra "Dinner"
    Etape    Sélectionner l'extra Dinner
    Wait Until Page Contains Element    ${LBL_EXTRA_DINNER}    ${TIMEOUT_UI}
    Scroll Element Into View    ${LBL_EXTRA_DINNER}
    Wait Until Element Is Visible    ${LBL_EXTRA_DINNER}    ${TIMEOUT_UI}
    Click Element    ${LBL_EXTRA_DINNER}

Cliquer Sur "Demande De Réservation"
    Etape    Cliquer sur Demande de réservation
    Wait Until Page Contains Element    ${BTN_DEMANDE_RESERVATION}    ${TIMEOUT_UI}
    Scroll Element Into View    ${BTN_DEMANDE_RESERVATION}
    Wait Until Element Is Visible    ${BTN_DEMANDE_RESERVATION}    ${TIMEOUT_UI}
    Click Button    ${BTN_DEMANDE_RESERVATION}

# =========================
# Contacter l'hôte
# =========================
Ouvrir La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_CONTACTER_HOTE}    ${TIMEOUT_UI}
    Click Element    ${BTN_CONTACTER_HOTE}
    Wait Until Element Is Visible    ${MODAL_CONTACTER_HOTE}    ${TIMEOUT_UI}

Fermer La Modal Contacter L'Hote
    Wait Until Element Is Visible    ${BTN_FERMER_MODAL_CONTACT}    ${TIMEOUT_UI}
    Click Element    ${BTN_FERMER_MODAL_CONTACT}

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

# =========================
# Assertions utilitaires
# =========================
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

Field Value Should Not Be Empty
    [Arguments]    ${locator}
    ${value}=    Get Value    ${locator}
    Should Not Be Empty    ${value}
