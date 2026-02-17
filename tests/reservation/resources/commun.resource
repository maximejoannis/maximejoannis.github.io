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

${CALENDRIER_JOUR_COURANT}    css=.block-body-sidebar > #single-listing-date-range > #single-booking-search-calendar .current-day
${CALENDRIER_JOUR_DEPART}    css=.block-body-sidebar > #single-listing-date-range > #single-booking-search-calendar > .single-listing-calendar-wrap:nth-child(2) .current-month:nth-child(29) > .day-number

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

Teardown Test
    Run Keyword If Test Failed    Capturer Preuves Echec
    Close Browser


Capturer Preuves Echec
    ${ts}=    Get Current Date    result_format=%Y%m%d_%H%M%S
    ${nom}=   Set Variable    ${TEST NAME}

    ${safe}=    Replace String    ${nom}    ${SPACE}    _
    ${safe}=    Replace String    ${safe}    "    _
    ${safe}=    Replace String    ${safe}    :    _
    ${safe}=    Replace String    ${safe}    /    _

    Create Directory    results

    Capture Page Screenshot    results/FAIL_${safe}_${ts}.png
    ${html}=    Get Source
    Create File    results/FAIL_${safe}_${ts}.html    ${html}    encoding=UTF-8


Ouvrir Le Navigateur Et Accéder A L'Application
    Run Keyword If    '${REMOTE_URL}'!='None'
    ...    Open Browser    ${URL}    ${NAVIGATEUR}    remote_url=${REMOTE_URL}
    ...    ELSE
    ...    Open Browser    ${URL}    ${NAVIGATEUR}

    Maximize Browser Window
    Set Selenium Timeout    ${SELENIUM_TIMEOUT}
    Set Selenium Implicit Wait    ${SELENIUM_IMPLICIT}


Fermer Le Navigateur
    Close Browser
