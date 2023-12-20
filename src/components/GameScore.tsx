import { Game } from '../app/types/GameData';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

const GameScoreNavbar = () => {
    const [games, setGames ] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainer = useRef(null);

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
    // scroll handler that will be used to scroll the score navbar
    const scroll = (scrollOffset: any) => {
        (scrollContainer.current as any).scrollLeft += scrollOffset;
    }

    return(
      <div className='relative'>
        <Button className='absolute left-0 z-10 bg-gray-800 text-white p-2' onClick={() => scroll(-100)}>{'<'}</Button>
        <div ref={scrollContainer} className='flex overflow-hidden whitespace-nowrap scroll-smooth px-4 py-2'>
          <div className='grid grid-flow-col auto-cols-max gap-4 px-4 py-2'>
             {games.map((game, index) => (
                <div key={index} className='min-w-max flex-col items-center bg-secondary rounded-lg shadow p-2'>
                    {/**Visitors team game content */}
                    <div className='flex items-center gap-2'>
                        <Image src={game.teams.visitors.logo} alt={game.teams.visitors.nickname} width={10} height={10} />
                        <span className='text-sm'>{game.teams.visitors.name}</span>
                    </div>
                    <div className='text-xs'>{game.scores.visitors.points}</div>
                    <div className='text-xs my-1'>-</div> 
                    {/**Home team game content */}
                    <div className='flex items-center gap-2'>
                        <Image src={game.teams.home.logo} alt={game.teams.home.nickname} height={10} width={10}/>
                        <span className='text-sm'>{game.teams.home.name}</span>
                    </div> 
                    <div className='text-xs'>{game.scores.home.points}</div> 
                </div>
             ))}
          </div>
          <Button className='absolute right-0 z-10 bg-gray-800 text-white p-2' onClick={() => scroll(100)}>{'>'}</Button>
        </div>
        
      </div>
    )
}
export default GameScoreNavbar;