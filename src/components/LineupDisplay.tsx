import React from "react";
import { Player } from "@/app/types/Player";
import PlayerCard from "./PlayerCard";
type LineupDisplayProps = {
    lineup: Player[];
}

const LineupDisplay: React.FC<LineupDisplayProps> = ({ lineup }) => {

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