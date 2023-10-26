import { createContext, useReducer } from "react";

export const ApplicationsContext = createContext()

export const applicationsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                applications: action.payload
            }
        case 'CREATE_APPLICATION':
            return {
                applications: [action.payload, ...state.applications]
            }
        case 'DELETE_APPLICATION':
            return {
                applications: state.applications.filter((w) =>  w._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const ApplicationsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(applicationsReducer, {
        applications: null
    })

    return (
        <ApplicationsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ApplicationsContext.Provider>
    )
}