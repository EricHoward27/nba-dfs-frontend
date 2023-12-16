'use client'
import React, {useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import { Player } from '../../types/Player';
import { usePlayerContext } from '@/app/context/PlayerContext';
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

type PlayerTableProps = {
  players: Player[];
  loading: boolean;
};

// define type for dropdown options
type DropDownOption = 'All' | 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'G' | 'F' ;

const PlayerTable: React.FC<PlayerTableProps> = ({players, loading}) => {

  const [positionFilter, setPositionFilter] = useState<DropDownOption | ''>(''); // set initial state to empty string
 

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
        <DropdownMenuRadioGroup value={positionFilter} onValueChange={(value: string ) => setPositionFilter(value as DropDownOption)}>
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
      {loading ? (
        // Display the progress bar if loading is true
        <div>
          <Progress value={50}/>
        </div>
      ): (
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
      )}
    </div>
   );
}

export default PlayerTable;