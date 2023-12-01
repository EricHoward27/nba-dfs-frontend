import PlayerTable from "./component/player-table";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Player } from '../types/Player';

type PlayerTableProps = {
  players: Player[];
  loading: boolean;
};

const PlayerPool = ({players, loading = true}: PlayerTableProps) => {
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