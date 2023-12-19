'use client'
import { useEffect, useState } from 'react';
import { GenerateLineup } from '../components/generate-lineup';
import { usePlayerContext } from './context/PlayerContext';
import LineupDisplay from '@/components/LineupDisplay';
import LineupModal from '@/components/LineupModal';
import NewsSlider from '@/components/NewsSlider';
import GameScoreNavbar from '@/components/GameScore';


export default function Home() {
  // use the player context
  const {lineup, error} = usePlayerContext();
  const [ articles, setArticles] = useState([]);
// fetch the articles from the api and set the state
  useEffect(() => {
    fetch('https://nba-stories.onrender.com/articles?limit=10')
    .then(response => response.json())
    .then(data => setArticles(data))
    .catch(error => console.error('Error fetching articles', error));
  }, []);

  return (
    <main className="p-24">
      <GameScoreNavbar />
      {/** fetch the user from the session to use data object from options */}
      <section className='py-12 flex flex-col items-center text-center'>
        <h1 className='text-4xl font-bold'>ERA NBA LINEUP GENERATOR</h1>
        <p className='text-2xl text-muted-foreground'>Free Optimal Lineup Generator Tools for Fantasy Basketball</p>
      </section>
      {/** Display the news slider */}
      <div className='flex justify-between items-start'>
        <div className='w-1/4'>
          <NewsSlider articles={articles} />
        </div>

        {/** Display the lineup generator */}
        <div className='flex-1 flex flex-col items-center'>
          <GenerateLineup />
          {lineup.length > 0 && <LineupDisplay lineup={lineup}/>}
        </div>

        {/** Display the lineup modal */}
        {error && <div className='error-message'>{error}</div>}
        <LineupModal />
      </div>
        
     
      
     
      
      
    </main>
  )
}
