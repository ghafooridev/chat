import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { User } from "src/types";

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

export const UserContextProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user")!) ?? null);

    const ContextValue = useMemo(() => ({ user, setUser }), [user, setUser])

    return (
        <UserContext.Provider value={ContextValue}>
            {children}
        </UserContext.Provider>
    )
}