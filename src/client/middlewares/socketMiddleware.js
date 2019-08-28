
const redTetrisMiddleware = store => next => action => {
    next(action)
}

export default redTetrisMiddleware