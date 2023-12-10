'use client'
import PlayerTable from "./component/player-table";
import { getPlayers } from "./api/playersApi";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePlayerContext } from '../context/PlayerContext';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Player } from '../types/Player';

type PlayerTableProps = {
  players: Player[];
  loading: boolean;
};




const PlayerPool = ({}: PlayerTableProps) => {

  const { players, setPlayers } = usePlayerContext();
  // this is to set the state for the lineup
  // set the state for loading to the context
  const { loading, setLoading } = usePlayerContext();
  // set the state for error
  const { error, setError } = usePlayerContext();


  
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


  console.log("This is the player pool data: " + players)
  return ( 
    <div>
      <h1>Player Pool Table</h1>
      <PlayerTable />
        <Link href='/'>
        <Button variant='outline' size='icon'>
        <ChevronLeftIcon className="h-4 w-4"/>
        </Button>
        </Link>
    </div>
   );
}
 
export default PlayerPool;