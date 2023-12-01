import React from "react";
import { Player } from "@/app/types/Player";

type LineupDisplayProps = {
    lineup: Player[];
}

const LineupDisplay: React.FC<LineupDisplayProps> = ({ lineup }) => {
    return (
        <div>
            {lineup.map((player, index) => (
                <div key={index}>
                    <div>{player.Name}</div>
                    <div>{player.Position}</div>
                    <div>{player.Points}</div>
                    <div>{player.FantasyPointsDraftKings}</div>
                    <div>{player.FantasyPointsFanDuel}</div>
                </div>
            ))}
        </div>
    );
}

export default LineupDisplay;