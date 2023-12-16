'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Player } from '../types/Player';
import { getPlayers } from '../player-table/api/playersApi';
import { generateRandomLineup } from '@/lib/lineupUtils';

// defining the context's type
type PlayerContextType = {
    players: Player[];
    setPlayers: (players: Player[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    lineup: Player[];
    setLineup: (lineup: Player[]) => void;
    generateLineup: () => void;
    clearLineup: () => void;
};
// creating the context with a default value of empty arrays
const PlayerContext = createContext<PlayerContextType>({
    players: [],
    setPlayers: () => {},
    loading: true,
    setLoading: () => {},
    error: null,
    setError: () => {},
    lineup: [],
    setLineup: () => {},
    generateLineup:() => {},
    clearLineup: () => {},
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
    const [error, setError] = useState<string | null>(null);
    const [lineup, setLineup ] = useState<Player[]>([]);

    const generateLineup = () => {
        const newLineup = generateRandomLineup(players); // generate lineup
        setLineup(newLineup); // update the lineup state
    }

    const clearLineup = () => {
        setLineup([]); // clear the lineup
    }
    
        const fetchPlayerData = useCallback(async () => {
            // format today's data to match api format (YYYY-MM-DD)
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const date = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
          
            // fetch players from api with today's date
            try {
              const data = await getPlayers(date);
              //throw new Error('test error'); // uncomment to test error handling
              setPlayers(data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching players: ', error);
              setError('There was an error generating a lineup. Please try again later.');
              setLoading(false);
            }
          }, [setPlayers, setLoading, setError]);
          
          // useEffect to mount the fetch data; set up an interval to fetch the player data every 24 hours
           useEffect(() => {
            // mount the fetch data to the component mount
            fetchPlayerData();
            // set up an interval to fetch the player data every 24 hours
            const interval = setInterval(fetchPlayerData, 1000 * 60 * 60 * 24);
            // clean up interval on unmount to prevent any memory leaks
            return () => clearInterval(interval);
          }, [fetchPlayerData]); // pass empty array to only run once on mount
    
    console.log("This is the player provider data: " + players)
    return (
        <PlayerContext.Provider value={{
            players,
            setPlayers,
            loading,
            setLoading,
            error,
            setError,
            lineup,
            setLineup,
            generateLineup,
            clearLineup,
        }}> 
            {children}
        </PlayerContext.Provider>
    );
    
};