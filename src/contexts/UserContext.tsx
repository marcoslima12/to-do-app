import React, { createContext, useState, ReactNode, } from 'react';
import api from '../services/api';

export type UserType = {
    id: string;
    email: string;
    fullname: string;
}

interface UserContextType {
    user: UserType | null;
    fetchAndSetUser: (userId: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);

    const fetchAndSetUser = async (userEmail: string) => {
        try {
            const response = await api.get(`/users/email/${userEmail}`)
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, fetchAndSetUser }}>
            {children}
        </UserContext.Provider>
    );
}

