*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem
Library    String

*** Variables ***
${URL}            http://livraison3.testacademy.fr
${NAVIGATEUR}     chrome
${REMOTE_URL}     None

${BTN_CHERCHER_HOME}          css=.search-button > .btn-primary:nth-child(1)
${PREMIERE_ANNONCE_TRIGGER}   css=.infobox_trigger:nth-child(1) .hover-effect

*** Keywords ***
Setup Test
    Log    [SETUP] ${TEST NAME}    console=yes
    Ouvrir Le Navigateur Et Accéder A L'Application

Teardown Test
    Run Keyword If Test Failed    Capturer Preuves Echec
    Close Browser

Ouvrir Le Navigateur Et Accéder A L'Application
    Run Keyword If    '${REMOTE_URL}'!='None'
    ...    Open Browser    ${URL}    ${NAVIGATEUR}    remote_url=${REMOTE_URL}
    ...    ELSE
    ...    Open Browser    ${URL}    ${NAVIGATEUR}
    Maximize Browser Window

Aller Sur La Premiere Annonce Depuis La Home
    Wait Until Element Is Visible    ${BTN_CHERCHER_HOME}
    Click Element    ${BTN_CHERCHER_HOME}
    Wait Until Element Is Visible    ${PREMIERE_ANNONCE_TRIGGER}
    Click Element    ${PREMIERE_ANNONCE_TRIGGER}

Capturer Preuves Echec
    ${ts}=    Get Current Date    result_format=%Y%m%d_%H%M%S
    ${nom}=   Set Variable    ${TEST NAME}

    # --- Nettoyage robuste pour noms de fichiers (compat NTFS / GitHub artifacts) ---
    ${safe}=    Replace String    ${nom}    ${SPACE}    _
    ${safe}=    Replace String    ${safe}    /    _
    ${safe}=    Replace String    ${safe}    \    _
    ${safe}=    Replace String    ${safe}    :    _
    ${safe}=    Replace String    ${safe}    "    _
    ${safe}=    Replace String    ${safe}    '    _
    ${safe}=    Replace String    ${safe}    <    _
    ${safe}=    Replace String    ${safe}    >    _
    ${safe}=    Replace String    ${safe}    |    _
    ${safe}=    Replace String    ${safe}    *    _
    ${safe}=    Replace String    ${safe}    ?    _

    Create Directory    results

    Log    [ECHEC] Screenshot + HTML pour: ${nom}    console=yes
    Capture Page Screenshot    results/FAIL_${safe}_${ts}.png

    ${html}=    Get Source
    Create File    results/FAIL_${safe}_${ts}.html    ${html}    encoding=UTF-8

    ${url}=    Get Location
    Log    [ECHEC] URL: ${url}    console=yes
