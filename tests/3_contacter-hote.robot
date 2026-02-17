*** Settings ***
Resource        commun.resource
Test Setup      Setup Test
Test Teardown   Teardown Test

*** Test Cases ***
CT1 - Ouvrir la modal "Contacter l'hôte" depuis une annonce
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${MODAL_CONTACTER_HOTE}

CT2 - Vérifier la présence des champs du formulaire "Contacter l'hôte"
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${CHAMP_CONTACT_NOM}
    Page Should Contain Element    ${CHAMP_CONTACT_EMAIL}
    Page Should Contain Element    ${CHAMP_CONTACT_TELEPHONE}
    Page Should Contain Element    ${CHAMP_CONTACT_MESSAGE}
    Page Should Contain Element    ${BTN_CONTACT_SOUMETTRE}
    Page Should Contain Element    ${ZONE_CONTACT_MESSAGES}

CT3 - Renseigner les champs et soumettre le formulaire "Contacter l'hôte"
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Renseigner Le Formulaire Contacter L'Hote    JOANNIS    maxime.joannis6@gmail.com    0254129875    Test
    Soumettre Le Formulaire Contacter L'Hote
    Textfield Value Should Be    ${CHAMP_CONTACT_NOM}        JOANNIS
    Textfield Value Should Be    ${CHAMP_CONTACT_EMAIL}      maxime.joannis6@gmail.com
    Textfield Value Should Be    ${CHAMP_CONTACT_TELEPHONE}  0254129875
    Textarea Value Should Be     ${CHAMP_CONTACT_MESSAGE}    Test

CT4 - Fermer la modal "Contacter l'hôte" via le bouton X
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Fermer La Modal Contacter L'Hote
    Wait Until Element Is Not Visible    ${MODAL_CONTACTER_HOTE}    timeout=5s

CT5 - Vérifier la présence des champs cachés du formulaire de contact
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${HIDDEN_TARGET_EMAIL}
    Page Should Contain Element    ${HIDDEN_HOST_CONTACT_SECURITY}
    Page Should Contain Element    ${HIDDEN_PERMALINK}
    Page Should Contain Element    ${HIDDEN_LISTING_TITLE}
    Page Should Contain Element    ${HIDDEN_ACTION}

CT6 - Vérifier le titre de la modal "Contactez l'hôte"
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${TITRE_MODAL_CONTACT}
    Element Text Should Be        ${TITRE_MODAL_CONTACT}    Contactez l'hôte

CT7 - Vérifier les placeholders des champs du formulaire "Contacter l'hôte"
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Element Attribute Should Be    ${CHAMP_CONTACT_NOM}        placeholder    Nom
    Element Attribute Should Be    ${CHAMP_CONTACT_EMAIL}      placeholder    Email
    Element Attribute Should Be    ${CHAMP_CONTACT_TELEPHONE}  placeholder    Téléphone
    Element Attribute Should Be    ${CHAMP_CONTACT_MESSAGE}    placeholder    Message

CT8 - Vérifier que le formulaire "Contacter l'hôte" est en méthode POST
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${FORM_CONTACTER_HOTE}
    ${method}=    Get Element Attribute    ${FORM_CONTACTER_HOTE}    method
    ${method}=    Convert To Lower Case    ${method}
    Should Be Equal As Strings    ${method}    post

CT9 - Vérifier les attributs du bouton "Soumettre" (type + class)
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Page Should Contain Element    ${BTN_CONTACT_SOUMETTRE}
    Element Attribute Should Be    ${BTN_CONTACT_SOUMETTRE}    type    submit
    ${class}=    Get Element Attribute    ${BTN_CONTACT_SOUMETTRE}    class
    Should Contain    ${class}    contact_listing_host

CT10 - Vérifier que les champs cachés ont bien une valeur (value non vide)
    Aller Sur La Premiere Annonce Depuis La Home
    Ouvrir La Modal Contacter L'Hote
    Element Attribute Should Not Be Empty    ${HIDDEN_TARGET_EMAIL}            value
    Element Attribute Should Not Be Empty    ${HIDDEN_HOST_CONTACT_SECURITY}   value
    Element Attribute Should Not Be Empty    ${HIDDEN_PERMALINK}              value
    Element Attribute Should Not Be Empty    ${HIDDEN_LISTING_TITLE}           value
    Element Attribute Should Not Be Empty    ${HIDDEN_ACTION}                 value
