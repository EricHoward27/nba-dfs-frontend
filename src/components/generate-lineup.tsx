import React from "react";
import { Button } from "@/components/ui/button";

type GenerateLineupProps = {
    onGenerate: () => void;
    onClear: () => void;
}

export const GenerateLineup: React.FC<GenerateLineupProps> = ({ onGenerate, onClear }) => {
    return (
        <div className='flex gap-6 items-center justify-center'>
            <Button onClick={onGenerate}>Generate Lineup</Button>
            <Button variant={"secondary"} onClick={onClear}>Clear Lineup</Button>
        </div>
    )
}