import React from 'react'

import { connect } from 'react-redux'
import { manageGame } from '../actions/manageGame'
import App from '../components/App/App'

/*
**  GameBoardContainer est un container : il contiendra le components GameBoard.
*/


/*
**  mapStateToProps envoie au components provisianalArray, qui est recupéré dans le state Redux.
**  Je lui envoie ici provisionalArray, car c'est sur ce dernier que sont appliqué les pieces
**  qui sont encore en deplacement. Si je lui avais envoyé state.move.array, seul les pieces
**  fixe seraient apparus.
**  Il sera recuperable au nom de board, dans les props du component.
*/

const mapStateToProps = state => ({
  error: state.manageGame.error
})


/*
**  mapDispatchToProps envoie au components le dispatch move. Ce qui permettra au components
**  de faire des appels a cette fonctions.
**  Il sera recuperable au nom de move, dans les props du component.
*/

const mapDispatchToProps = dispatch => ({
})


/*
**  connect est simplement la fonction qui va permettre de connecter tout ça ensemble
**  et de créer le container : lie mes deux fonctions precedentes, avec le component (ici, GameBoard).
**  C'est le retour de cette fonction qui donne le container. C'est pourquoi je l'ai mis en export.
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
