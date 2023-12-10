'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { GenerateLineup } from '../components/generate-lineup';
import { Player } from './types/Player';
import { getPlayers } from './player-table/api/playersApi';
import { generateRandomLineup } from '@/lib/lineupUtils';
import { usePlayerContext } from './context/PlayerContext';
import LineupDisplay from '@/components/LineupDisplay';


export default function Home() {
  // set the state for the players to the context
  const { players } = usePlayerContext();
  // this is to set the state for the lineup
  const [lineup, setLineup] = useState<Player[]>([]); //***** */ I will need to store the lineup in the context as well
  // set the state for error
  const { error, setError } = usePlayerContext();

  // fetch players from api
  // manually set date to 2023-12-02 for now to test api in development
  /***** const fetchPlayerData = () => {
    const date = '2023-12-02';

    // fetch players from api 
    getPlayers(date)
    .then((data: Player[]) => {
      setPlayers(data); // Update the state with the fetch data
      setLoading(false); // Update loading state to false
    })
    .catch((error) => {
      console.error('Error fetching players: ', error);
    });  
  }; 
  useEffect(() => {
    // mount the fetch data to the component mount
    fetchPlayerData();
  }, [])
  ******/ 



  // Generate the lineup function
  const handleGenerateLineup = () => {
    const newLineup = generateRandomLineup(players);
    setLineup(newLineup);
  }

  // clear the lineup function
  const handleClearLineup = () => {
    setLineup([]);
  }
  console.log(players)

  return (
    <main className="p-24">
      
      {/** fetch the user from the session to use data object from options */}
      <section className='py-12 flex flex-col items-center text-center'>
        <h1 className='text-4xl font-bold'>NBA DFS Lineup Generator</h1>
        <p className='text-2xl text-muted-foreground'>Generate the best possible NBA DFS lineup for the day</p>
      </section>
      {error && <div className='error-message'>{error}</div>}
      {/** Generate the lineup */}
      <GenerateLineup onGenerate={handleGenerateLineup} onClear={handleClearLineup} />
      {lineup.length > 0 && <LineupDisplay lineup={lineup}/>}
    </main>
  )
}
