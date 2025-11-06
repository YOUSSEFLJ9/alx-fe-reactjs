import React, {useContext} from "react";

export const UserContext = React.createContext();


export default function UserProvider({children, value}) {
    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
    }