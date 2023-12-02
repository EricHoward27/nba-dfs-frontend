import { Player } from '../app/types/Player'
import calculateFantasyProjection from './config/fantasyProject';

// this is the rules for the DraftKings lineup
export const draftKingsRules = {
    salaryCap: 50000,
    position: {
        PG: 2, // Point Guards
        SG: 2, // Shooting Guards
        SF: 2, // Small Forwards
        PF: 2, // Power Forwards
        C: 1 // Centers
    }
};

// this is the rules for the FanDuel lineup
export const fanDuelRules = {
    salaryCap: 60000,
    position: {
        PG: 2, // Point Guards
        SG: 2, // Shooting Guards
        SF: 2, // Small Forwards
        PF: 2, // Power Forwards
        C: 1 // Centers
    }
};

// this is the lineup generator function 
// we will pass the Players array to the player parameter
// the linupSize parameter is the number of players in which will will set to 5
export function generateRandomLineup(players: Player[], lineupSize: number = 9, isDraftKings = true): Player[] {
    //logic to generate a lineup based on DraftKings rules
    // this would involve selecting the correct number of players for each position
    // and making sure the total salare does not exceed the cap
    players.forEach(player => {
        player.fantasyProjection = calculateFantasyProjection(player, isDraftKings);
    })
    // shufflePlayers variable will sort through the players array and then we will use math.random to random selects players from the pool
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    // now we will return the shuffleplayers array slice from 0 to the lineupSize
    return shuffledPlayers.slice(0, lineupSize);
}