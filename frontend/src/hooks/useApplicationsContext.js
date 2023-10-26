import { ApplicationsContext } from "../context/ApplicationContext";
import { useContext } from "react";

export const useApplicationsContext = () => {
    const context = useContext(ApplicationsContext)

    if(!context) {
        throw Error('useApplicationContext must be used inside of an ApplicationsContextProvider')
    }

    return context
}