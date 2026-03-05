import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const decodeTokenSafely = (token) => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const decoded = decodeTokenSafely(token);
            if (decoded) {
                setUser(decoded);
            } else {
                localStorage.removeItem("accessToken");
            }
        }

        setIsAuthLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("accessToken", token);

        const decoded = decodeTokenSafely(token);
        if (!decoded) {
            localStorage.removeItem("accessToken");
            setUser(null);
            return null;
        }

        setUser(decoded);
        return decoded;
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);