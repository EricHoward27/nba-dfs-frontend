'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player } from '../types/Player';

// defining the context's type
type PlayerContextType = {
    players: Player[];
    setPlayers: (players: Player[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};
// creating the context with a default value of empty arrays
const PlayerContext = createContext<PlayerContextType>({
    players: [],
    setPlayers: () => {},
    loading: true,
    setLoading: () => {}
});
// hook for using the context
export const usePlayerContext = () => useContext(PlayerContext);

// defing the type for the player provider props
type PlayerProviderProps = {
    children: ReactNode;
};

// creating the player provider component
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }): ReactNode => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    console.log("This is the player provider data: " + players)
    return (
        <PlayerContext.Provider value={{
            players,
            setPlayers,
            loading,
            setLoading
        }}> 
            {children}
        </PlayerContext.Provider>
    );
    
};