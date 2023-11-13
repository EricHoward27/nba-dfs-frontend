import PlayerTable from "./component/player-table";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PlayerPool = () => {
  return ( 
    <div>
      <h1>Player Pool Table</h1>
      
        <Link href='/'>
        <Button variant='outline' size='icon'>
        <ChevronLeftIcon className="h-4 w-4"/>
        </Button>
        </Link>
      
      <PlayerTable />
    </div>
   );
}
 
export default PlayerPool;