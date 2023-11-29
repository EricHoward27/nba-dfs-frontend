'use client'
import React, { useState, useEffect } from 'react';
import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { GenerateLineup } from '../components/generate-lineup';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './(auth)/api/auth/[...nextauth]/route';
import { Player } from './types/Player';
import { getPlayers } from './player-table/api/playersApi';
import { generateRandomLineup } from '@/lib/lineupUtils';
import { useSession } from 'next-auth/react';

export default function Home({session}: {session: any}) {
  // set the state for the players
  const [players, setPlayers] = useState<Player[]>([]);
  // this is to set the state for the lineup
  const [lineup, setLineup] = useState<Player[]>([]);
  // this is to get the session data
  // Here we use getServerSession to get the session data that check the user is sign in 

  // fetch player data on the client side
 // const fetchPlayersData = async () => {
 //   const playersData = await getPlayers();
   // setPlayers(playersData);
 // };

  // Generate the lineup function
  const handleGenerateLineup = () => {
    const newLineup = generateRandomLineup(players);
    setLineup(newLineup);
  }
  // clear the lineup function
  const handleClearLineup = () => {
    setLineup([]);
  }
  return (
    <main className="p-24">
      {/** fetch the user from the session to use data object from options */}
      <section className='py-12 flex flex-col items-center text-center'>
        <h1 className='text-4xl font-bold'>NBA DFS Lineup Generator</h1>
        <p className='text-2xl text-muted-foreground'>Generate the best possible NBA DFS lineup for the day</p>
      </section>
      {/** Generate the lineup */}
      <GenerateLineup onGenerate={handleGenerateLineup} onClear={handleClearLineup} />
    </main>
  )
}
