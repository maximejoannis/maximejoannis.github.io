*** Variables ***
${CHAMP_RESERVATION_ARRIVEE}        id=check_in_date
${CHAMP_RESERVATION_DEPART}         id=check_out_date
${CHAMP_RESERVATION_VOYAGEURS}      id=guests
${BTN_DEMANDE_RESERVATION}          css=.request_reservation

${CHK_EXTRA_BREAKFAST}              id=extra_breakfast
${CHK_EXTRA_LUNCH}                  id=extra_lunch
${CHK_EXTRA_DINNER}                 id=extra_dinner

${MSG_CONNEXION_POUR_RESERVATION}   Vous devez vous connecter

*** Keywords ***
Selectionner Une Date D'Arrivee Et Une Date De Depart
    Click Element    ${CHAMP_RESERVATION_ARRIVEE}
    # actions calendrier

Selectionner Des Voyageurs (1 Adulte + 1 Enfant)
    Click Element    ${CHAMP_RESERVATION_VOYAGEURS}
    # actions sélecteur

Selectionner L'Extra "Breakfast"
    Click Element    ${CHK_EXTRA_BREAKFAST}

Selectionner L'Extra "Lunch"
    Click Element    ${CHK_EXTRA_LUNCH}

Selectionner L'Extra "Dinner"
    Click Element    ${CHK_EXTRA_DINNER}

Cliquer Sur "Demande De Réservation"
    Click Element    ${BTN_DEMANDE_RESERVATION}
