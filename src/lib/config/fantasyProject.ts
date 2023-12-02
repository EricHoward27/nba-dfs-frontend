import { parse } from "path";
import { draftKingsScoring, fanDuelScoring } from "./scoringRules";
import { Player } from '@/app/types/Player';


const AVERAGE_GAME_LENGTH = 30; // minutes

function calculateFantasyProjection(player: Player, isDraftKings = true) {
    const scoringRules = isDraftKings ? draftKingsScoring : fanDuelScoring;

    // estimate the number of games played in the season
    // api dont have games played so we will use minutes played
    const estimatedGamesPlayed = parseFloat(player.Minutes) / AVERAGE_GAME_LENGTH;

    // calcule the averages on the stats and estiamted games played
    // calculate using simple average of season stats for current season
    const averagePoints = parseFloat(player.Points) / estimatedGamesPlayed;
    const averageRebounds = parseFloat(player.Rebounds) / estimatedGamesPlayed;
    const averageAssists = parseFloat(player.Assists) / estimatedGamesPlayed;

    const projection = (
        averagePoints * scoringRules.points +
        averageRebounds * scoringRules.rebounds +
        averageAssists * scoringRules.assists
    );

    // round to one decimal place
    return parseFloat(projection.toFixed(1));
}
export default calculateFantasyProjection;