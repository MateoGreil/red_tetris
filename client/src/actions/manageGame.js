/*
**  type GAME_MANAGER :
**    permet au reducer de savoir que c'est une action de management de la game de red_tetris qui est demandé
*/
export const MANAGE_GAME = 'MANAGE_GAME'

/*
**  other Options :
**    ne correspond a aucune variable predefini des actions creators. Permet ici simplement de savoir
**    quelle commande est demandé
*/
export const Options = {
  START: 'START'
}

/*
**  Action manageGame :
**    l'action creators est envoyé aux reducers. l'action permet de savoir, grace a ses parametres, ce que doit faire le
**    reducer (type d'action : GAME_MANAGER, donc devra manage la game, avec comme variable
**    supplementaire l'option)
*/
export function manageGame(option) {
  return { type: MANAGE_GAME, option }
}