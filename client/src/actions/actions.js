// action types

export const MOVE = 'MOVE'

// other constant

export const Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  DOWN: 'DOWN'
}

// action creators

export function move(direction) {
  return { type: MOVE, direction }
}