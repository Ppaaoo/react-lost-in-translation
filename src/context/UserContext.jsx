import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKey";
import { storageRead } from "../utils/storage";

//Context object - exposing states
const UserContext = createContext()

//For easy access throughout the app
export const useUser = () => {
    return useContext(UserContext) //Returns an object {user, setUser}
}

//Provider - Managing states
const UserProvider = ({children}) => {

    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER))

    const state = {user, setUser}

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider