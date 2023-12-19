import React from "react";
import { Button } from "@/components/ui/button";
import { usePlayerContext } from "@/app/context/PlayerContext";

  
export const GenerateLineup: React.FC = () => {
    const {generateLineup, clearLineup, setModalOpen } = usePlayerContext();

    const handleGenerateLineupClick = () => {
        generateLineup();
        setModalOpen(true);
    }
    return (
        <div className='flex gap-6 items-center justify-center'>
            
            <Button onClick={handleGenerateLineupClick}>Generate Lineup</Button>
            <Button onClick={clearLineup}>Clear Lineup</Button>
        </div>
    )
}