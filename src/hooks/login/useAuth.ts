import { useState } from "react"

const useAuth = () => {
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return { token, login, logout };
}

export default useAuth;