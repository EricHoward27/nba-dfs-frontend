'use client'
import React, { useState, useEffect } from 'react';
import { GenerateLineup } from '../components/generate-lineup';
import { Player } from './types/Player';
import { getPlayers } from './player-table/api/playersApi';
import { generateRandomLineup } from '@/lib/lineupUtils';
import { usePlayerContext } from './context/PlayerContext';
import LineupDisplay from '@/components/LineupDisplay';


export default function Home() {
  // set the state for the players to the context
  const { players, setPlayers } = usePlayerContext();
  // this is to set the state for the lineup
  const [lineup, setLineup] = useState<Player[]>([]);
  // set the state for loading to the context
  const { loading, setLoading } = usePlayerContext();

  // fetch players from api
  // manually set date to 2023-12-02 for now to test api in development
  const fetchPlayerData = () => {
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
 /* const fetchPlayerData = () => {
    // format today's data to match api format (YYYY-MM-DD)
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // fetch players from api with today's date
    getPlayers(date) // getPlayers returns a promise
    .then((data: Player[]) => {
      setPlayers(data); // Update the state with the fetch data
      setLoading(false); // Update loading state to false
    })
    .catch((error) => {
      console.error('Error fetching players: ', error);
    });
  }; */
  /* useEffect(() => {
    // mount the fetch data to the component mount
    fetchPlayerData();
    // set up an interval to fetch the player data every 24 hours
    const interval = setInterval(fetchPlayerData, 1000 * 60 * 60 * 24);
    // clean up interval on unmount to prevent any memory leaks
    return () => clearInterval(interval);
  }, []); // pass empty array to only run once on mount
*/
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
      {/** Generate the lineup */}
      <GenerateLineup onGenerate={handleGenerateLineup} onClear={handleClearLineup} />
      {lineup.length > 0 && <LineupDisplay lineup={lineup}/>}
    </main>
  )
}
