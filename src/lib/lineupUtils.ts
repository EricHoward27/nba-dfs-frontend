import { Player } from '../app/types/Player'
import calculateFantasyProjection from './config/fantasyProject';
import { DraftKingsPositions } from '@/app/types/DraftKingsPosition';
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
const draftKingsPositions: DraftKingsPositions = {
    PG: 1,
    SG: 1,
    SF: 1,
    PF: 1,
    C: 1,
    G: 1,
    F: 1,
    UTIL: 1
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
export function generateRandomLineup(players: Player[], isDraftKings = true): Player[] {
    let lineup: Player[] = [];
    let salaryCap = 50000; // this is the salary cap for DraftKings

    const positions = Object.keys(draftKingsPositions) as (keyof DraftKingsPositions)[]; // this is the positions for DraftKings
    positions.forEach(position => {
       for(let i = 0; i < draftKingsPositions[position]; i++) {
         // this will filter the players array and return the players that match the position
         let availablePlayers = players.filter(player => {
            return player.Position === position && parseFloat(player.DraftKingsSalary) <= salaryCap;
        });
        // this will select a random player from the available players array
        if (availablePlayers.length > 0) {
            // select a random player using math.random
            let selectedPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
            // add the selected player to the lineup array
            lineup.push(selectedPlayer);
            // subtract the selected player salary from the salary cap 
            salaryCap -= parseFloat(selectedPlayer.DraftKingsSalary);
        }
       }
    });

    // if lineup is not complete, fill remaing spots with UTIL players
    while (lineup.length < 8) {
        // this will filter the players array and return the players that match the position
        let availablePlayers = players.filter(player => parseFloat(player.DraftKingsSalary) <= salaryCap);
        // if there are players available, select a random player
        if (availablePlayers.length > 0) {
            let selectedPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
            // add the selected player to the lineup array
            lineup.push(selectedPlayer);
            // subtract the selected player salary from the salary cap
            salaryCap -= parseFloat(selectedPlayer.DraftKingsSalary);
            // if there are no players available, break out of the loop
        } else {
            break;
        }
    }
    //logic to generate a lineup based on DraftKings rules
    // this would involve selecting the correct number of players for each position
    // and making sure the total salare does not exceed the cap
    // for each player in the lineup, calculate their fantasy projection
    players.forEach(player => {
        player.fantasyProjection = calculateFantasyProjection(player, isDraftKings);
   });
    // shufflePlayers variable will sort through the players array and then we will use math.random to random selects players from the pool
    //let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    // now we will return the shuffleplayers array slice from 0 to the lineupSize
    // return shuffledPlayers.slice(0, lineupSize);
    // return the lineup array
    return lineup;
}