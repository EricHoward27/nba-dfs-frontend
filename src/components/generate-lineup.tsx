import React from "react";
import { Button } from "@/components/ui/button";
import { Player } from "@/app/types/Player";
import { usePlayerContext } from "@/app/context/PlayerContext";

type GenerateLineupProps = {
    onGenerate: () => void;
    onClear: () => void;
}

type PlayerTableProps = {
    players: Player[];
    loading: boolean;
  };

  
export const GenerateLineup: React.FC<GenerateLineupProps> = ({ onGenerate, onClear }) => {
    return (
        <div className='flex gap-6 items-center justify-center'>
            <Button onClick={onGenerate}>Generate Lineup</Button>
            <Button variant={"secondary"} onClick={onClear}>Clear Lineup</Button>
        </div>
    )
}