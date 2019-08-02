import io from 'socket.io-client';

const redTetrisMiddleware = store => next => action => {
    next(action)
}

export default redTetrisMiddleware