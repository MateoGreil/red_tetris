import React from 'react'

import { connect } from 'react-redux'
import { move } from '../actions/actions'
import GameBoard from '../components/GameBoard/GameBoard'

const mapStateToProps = state => ({
  board: state.move.provisionalArray
})

const mapDispatchToProps = dispatch => ({
  move: direction => dispatch(move(direction))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard)
