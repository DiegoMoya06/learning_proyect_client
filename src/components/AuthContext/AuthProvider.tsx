import React, {createContext, useContext, useMemo, useState} from 'react';
import {useAppDispatch} from "../../utils/store.ts";
import {Notifications} from "../../slices/notificationSlice.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const dispatch = useAppDispatch();

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        dispatch(Notifications.notifySuccess('Login successful!', 2000));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        dispatch(Notifications.notifySuccess('Logout successful!', 2000));
    };

    const providerValue = useMemo(() => ({
        isAuthenticated, login, logout
    }), [isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};