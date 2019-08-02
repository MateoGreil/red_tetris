/*
**  type ROTE :
**    permet au reducer de savoir que c'est une action de rotation qui est demandée
*/
export const ROTE = 'ROTE'

/*
**  other Direction :
**    ne correspond a aucune variable predefini des actions creators. Permet ici simplement de savoir
**    dans quelle direction la piece sera tournee.
*/
export const rotation = {
  CW_ROT: 'CW_ROT',
  CTCW_ROT: 'CTCW_ROT',
}

/*
**  Action rote :
**    l'action creators est envoyé aux reducers. l'action permet de savoir, grace a ses parametres, ce que doit faire le
**    reducer (type d'action : rote, donc devra tourner une piece, avec comme variable
**    supplementaire le sens de la rotation)
*/
export function rote(rotation) {
  return { type: ROTE, rotation }
}