import React from 'react'
import PropTypes from 'prop-types'
import RightPanel from '../components/RightPanel/RightPanel'
import {connect} from 'react-redux'


/*
** LeftPanel est un container : il contiendra le component LeftPanel.
*/


/*
**  const mapDispatchToProps = dispatch => ({
**    move: moves => dispatch(move(moves))
**    })
*/



/*
**  connect est simplement la fonction qui va permettre de connecter tout ça ensemble
**  et de créer le container : lie mes deux fonctions precedentes, avec le component (ici, GameBoard).
**  C'est le retour de cette fonction qui donne le container. C'est pourquoi je l'ai mis en export.
*/

export default connect(
)(RightPanel)
