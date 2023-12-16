import React from "react";
import { Button } from "@/components/ui/button";
import { Player } from "@/app/types/Player";
import { usePlayerContext } from "@/app/context/PlayerContext";

  
export const GenerateLineup: React.FC = () => {
    const {generateLineup, clearLineup } = usePlayerContext();
    return (
        <div className='flex gap-6 items-center justify-center'>
            <Button onClick={generateLineup}>Generate Lineup</Button>
            <Button variant={"secondary"} onClick={clearLineup}>Clear Lineup</Button>
        </div>
    )
}