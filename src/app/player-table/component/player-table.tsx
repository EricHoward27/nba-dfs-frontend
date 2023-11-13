'use client'
import React, {useEffect, useState } from 'react';
import { getPlayers } from '../api/playersApi';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger, 
  DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Define a type for player data
type Player = {
  StatID?: string,
  id?: string;
  Name?: string;
  Position: string;
  Points: string;
  FantasyPointsDraftKings: string;
  FantasyPointsFanDuel: string;
  DraftKingsSalary: string;
  FanDuelSalary: string;
  Minutes: string;
  Assists: string;
  Steals: string;
  Rebounds: string;
  BlockedShots: string;
  UsageRatePercentage: string;
  PlusMinus: string;
  DoubleDoubles: string;
  TripleDoubles: string;
}
// define type for dropdown options
type DropDownOption = 'All' | 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'G' | 'F' ;

function PlayerTable() {
  const [players, setPlayers] = useState<Player[]>([]); // set initial state to empty array
  const [loading, setLoading] = useState<boolean>(true); // set initial state to true
  const [positionFilter, setPositionFilter] = useState<DropDownOption | ''>(''); // set initial state to empty string

  // fetch players from api
  useEffect(() => {
    const date = '2023-10-29'; // hardcode date for now
    getPlayers(date) // getPlayers returns a promise
    .then((data: Player[]) => { // when the promise resolves, set the players state
      setPlayers(data); // setPlayers is a function that updates the state
      setLoading(false); // set loading to false
    })
  }, []);

  // filter players by position
  const filteredPlayers = players.filter(player => !positionFilter || player.Position === positionFilter); // if positionFilter is empty string, return all players, otherwise return players that match the positionFilter
  return ( 
    <div>
      {/** Filter Dropdown */}
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>Filter by Position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Player Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={positionFilter} onValueChange={(value: string ) => setPositionFilter}>
          <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='PG'>PG</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='SG'>SG</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='SF'>SF</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='PF'>PF</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='C'>C</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
     </DropdownMenu>

      {/** Player Table */}
      <Table>
        <TableCaption>Player Pool</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Player ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>FantasyPointsDraftKings</TableCell>
            <TableCell>FantasyPointsFanDuel</TableCell>
            <TableCell>DraftKingsSalary</TableCell>
            <TableCell>FanDuelSalary</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell>Assists</TableCell>
            <TableCell>Steals</TableCell>
            <TableCell>Rebounds</TableCell>
            <TableCell>BlockedShots</TableCell>
            <TableCell>UsageRatePercentage</TableCell>
            <TableCell>PlusMinus</TableCell>
            <TableCell>DoubleDoubles</TableCell>
            <TableCell>TripleDoubles</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlayers.map((player:Player) => (
            <TableRow key={player.StatID}>
              <TableCell>{player.StatID}</TableCell>
              <TableCell>{player.Name}</TableCell>
              <TableCell>{player.Position}</TableCell>
              <TableCell>{player.FantasyPointsDraftKings}</TableCell>
              <TableCell>{player.FantasyPointsFanDuel}</TableCell>
              <TableCell>{player.DraftKingsSalary}</TableCell>
              <TableCell>{player.FanDuelSalary}</TableCell>
              <TableCell>{player.Minutes}</TableCell>
              <TableCell>{player.Assists}</TableCell>
              <TableCell>{player.Steals}</TableCell>
              <TableCell>{player.Rebounds}</TableCell>
              <TableCell>{player.BlockedShots}</TableCell>
              <TableCell>{player.UsageRatePercentage}</TableCell>
              <TableCell>{player.PlusMinus}</TableCell>
              <TableCell>{player.DoubleDoubles}</TableCell>
              <TableCell>{player.TripleDoubles}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
   );
}

export default PlayerTable;