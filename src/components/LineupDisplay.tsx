import React from "react";
import { usePlayerContext } from "@/app/context/PlayerContext";
import PlayerCard from "./PlayerCard";

const LineupDisplay: React.FC = () => {
    const { lineup } = usePlayerContext();
    return (
        <div>
            {lineup.map((player, index) => (
                <div key={index}>
                    <PlayerCard key={index} player={player} />
                </div>
            ))}
        </div>
        
    );
}

export default LineupDisplay;