type Player = {
    Name: string;
    Position: string;
    Points: string;
    FantasyPointsDraftKings: string;
    FantasyPointsFanDuel: string;
}

// this is the lineup generator function 
// we will pass the Players array to the player parameter
// the linupSize parameter is the number of players in which will will set to 5
export function generateRandomLineup(players: Player[], lineupSize: number = 5): Player[] {
    // shufflePlayers variable will sort through the players array and then we will use math.random to random selects players from the pool
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    // now we will return the shuffleplayers array slice from 0 to the lineupSize
    return shuffledPlayers.slice(0, lineupSize);
}