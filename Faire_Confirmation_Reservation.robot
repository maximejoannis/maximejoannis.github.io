*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                http://livraison3.testacademy.fr
${USERNAME}           name=username
${PASSWORD}           name=password
${VALID_USERNAME}     Hotetest
${VALID_PASSWORD}     test
${CONNEXION_BUTTON}   css=.homey_login_button
${RESERVATION_LINK}   xpath=(//a[contains(text(),'Réservations')])[3]
${ROWS_XPATH}         xpath=//table[@id='reservations']/tr
${STATUS_XPATH}       xpath=td[1]/span[contains(@class, 'label-secondary')]
${RESERVATION_7375}   xpath=//a[@href='http://livraison3.testacademy.fr/index.php/reservations/?reservation_detail=7375']
${CONFIRMATION_BTN}   xpath=//section[@id='body-area']/div[3]/aside/button

*** Keywords ***
Ouvrir Le Navigateur
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Se Connecter
    Click Element    xpath=//a[contains(text(),'Se connecter')]
    Wait Until Element Is Visible    ${USERNAME}    10s
    Input Text    ${USERNAME}    ${VALID_USERNAME}
    Input Text    ${PASSWORD}    ${VALID_PASSWORD}
    Click Element    ${CONNEXION_BUTTON}

Aller Sur Reservation
    Wait Until Element Is Visible    ${RESERVATION_LINK}    10s
    Click Element    ${RESERVATION_LINK}

Confirmer La Réservation
    Wait Until Element Is Visible    ${RESERVATION_7375}    10s
    Click Element    ${RESERVATION_7375}
    Wait Until Element Is Visible    ${CONFIRMATION_BTN}    10s
    Click Element    ${CONFIRMATION_BTN}

*** Test Cases ***
Test Réservation
    Ouvrir Le Navigateur
    Se Connecter
    Aller Sur Reservation
    Confirmer La Réservation
