import React from 'react'
import PropTypes from 'prop-types'
import LeftPanel from '../components/LeftPanel/LeftPanel'
import {connect} from 'react-redux'


/*
** LeftPanel est un container : il contiendra le component LeftPanel.
*/
const mapStateToProps = state => ({
    players: state.manageGame.players,
    user: state.manageGame.username,
    gameName: state.manageGame.gameName,
    nextPiece: state.manageGame.tetriminos[1],
    score: state.manageGame.score
  })

export default connect(
    mapStateToProps
)(LeftPanel)
