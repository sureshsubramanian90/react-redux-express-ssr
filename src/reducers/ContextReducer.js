/**
 * Reducer to handle the application context changes
 */
export default function ContextReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_APP_CONTEXT':
            return action.context;
        default:
            return state;
    }
}
