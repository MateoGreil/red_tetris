/*
**  type MOVE :
**    permet au reducer de savoir que c'est une action de mouvement de red_tetris qui est demandé
*/
export const GAME_MANAGER = 'GAME_MANAGER'

/*
**  other Direction :
**    ne correspond a aucune variable predefini des actions creators. Permet ici simplement de savoir
**    dans quelle direction se deplacera la piece.
*/
export const Options = {
  RIGHT_TRANSLATION: 'RIGHT_TRANSLATION',
  LEFT_TRANSLATION: 'LEFT_TRANSLATION',
  DOWN_TRANSLATION: 'DOWN_TRANSLATION',
  BOTTOM_TRANSLATION: 'BOTTOM_TRANSLATION',
  CLOCKWORK_ROTATION: 'CLOCKWORK_TRANSLATION',
  COUNTER_CLOCKWORK_ROTATION: 'COUNTER_CLOCKWORK_ROTATION',

  START: 'START'
}

/*
**  Action move :
**    l'action creators est envoyé aux reducers. l'action permet de savoir, grace a ses parametres, ce que doit faire le
**    reducer (type d'action : move, donc devra deplacer une piece, avec comme variable
**    supplementaire la direction)
*/
export function manageGame(option) {
  return { type: GAME_MANAGER, option }
}
