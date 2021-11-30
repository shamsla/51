import { createContext, useReducer } from 'react'
import { CONTEXT, PAGES } from 'Constants'

const reducer = (state, { type, data }) => {
    const newState = { ...state }

    switch (type) {
        case CONTEXT.ACTIVE_PAGE:
            newState.activePage = data
            break

        case CONTEXT.ENCRYPTION_KEYS:
            newState.encryptionKeys = data
            break

        default:
            return state
    }

    return newState
}

const initialState = {
    activePage: PAGES.CREDENTIALS,
    encryptionKeys: {
        first: null,
        second: null,
    },
}

const actions = dispatch => {
    return {
        setActivePage: data => {
            dispatch({ type: CONTEXT.ACTIVE_PAGE, data })
        },
        setEncryptionKeys: data => {
            dispatch({ type: CONTEXT.ENCRYPTION_KEYS, data })
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
                actions: actions(dispatch),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
