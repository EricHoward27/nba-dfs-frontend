'use client'
import PlayerTable from "./component/player-table";
import { getPlayers } from "./api/playersApi";
import { usePlayerContext } from "../context/PlayerContext";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const PlayerPool = () => {
  const {players, loading, error} = usePlayerContext();

  return ( 
    <div>
      <h1>Player Pool Table</h1>
      {error && <div className="error-message">{error}</div>}
      <PlayerTable players={players} loading={loading}/>
        <Link href='/'>
        <Button variant='outline' size='icon'>
        <ChevronLeftIcon className="h-4 w-4"/>
        </Button>
        </Link>
    </div>
   );
}
 
export default PlayerPool;