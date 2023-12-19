import { Game } from '../app/types/GameData';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const GameScoreNavbar = () => {
    const [games, setGames ] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            const url = 'https://api-nba-v1.p.rapidapi.com/games?date=2023-12-17';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ae79fe5b01msh24aa2cde7368113p13d652jsn6150bad87405',
		            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setGames(data.response);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to load game data');
                setIsLoading(false);
            }
        };
        fetchGames();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div className='flex flex-wrap justify-center gap-2'>
            {games.map((game, index) => (
            <div key={index} className='flex-none bg-secondary text-white rounded-lg'>
                <div className='flex items-center space-x-2'>
                    <Image src={game.teams.visitors.logo} alt={game.teams.visitors.nickname}width={10} height={10} className='object-cover'/>
                 <div>
                    <span className='text-xs'>{game.teams.visitors.name} vs {game.teams.home.name}</span>
                    <span className='font-bold'>{game.scores.visitors.points} - {game.scores.home.points}</span>
                </div>
              </div>
            </div>
            ))}
        </div>
    )
}
export default GameScoreNavbar;