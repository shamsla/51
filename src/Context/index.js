import { createContext, useReducer } from 'react'
import { CONTEXT, PAGES } from 'Constants'

const stateMutator = (state, type, data) => {
    switch (type) {
        case CONTEXT.ACTIVE_PAGE:
            state.activePage = data
            break

        case CONTEXT.ENCRYPTION_KEY:
            state.encryptionKey = data
            break

        default:
            return state
    }

    return state
}

const reducer = (state, { type, data }) => {
    const newState = { ...state }

    if (type === CONTEXT.SET_MULTIPLE) {
        return data.reduce(
            (accumulator, current) =>
                stateMutator(accumulator, current.type, current.data),
            newState
        )
    }

    const mutatedState = stateMutator(newState, type, data)
    return mutatedState
}

const dispatchWrapper = dispatch => (payload, options) => {
    const { shouldDispatch = true } = options || {}

    if (shouldDispatch) dispatch(payload)
    else return payload
}

const initialState = {
    activePage: PAGES.CREDENTIALS,
    encryptionKey: null,
}

const actions = dispatch => {
    return {
        setActivePage: (data, options) =>
            dispatch({ type: CONTEXT.ACTIVE_PAGE, data }, options),

        setEncryptionKey: (data, options) =>
            dispatch({ type: CONTEXT.ENCRYPTION_KEY, data }, options),

        setMultiple: multipleActions => {
            const payload = {
                type: CONTEXT.SET_MULTIPLE,
                data: multipleActions.map(({ action, payload }) =>
                    action(payload, { shouldDispatch: false })
                ),
            }

            dispatch(payload)
        },
    }
}

export const AppContext = createContext()

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider
            value={{
                state: state,
                actions: actions(dispatchWrapper(dispatch)),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
