'use client'
import { GenerateLineup } from '../components/generate-lineup';
import { usePlayerContext } from './context/PlayerContext';
import LineupDisplay from '@/components/LineupDisplay';


export default function Home() {
  // use the player context
  const {lineup, error} = usePlayerContext();

  return (
    <main className="p-24">
      
      {/** fetch the user from the session to use data object from options */}
      <section className='py-12 flex flex-col items-center text-center'>
        <h1 className='text-4xl font-bold'>NBA DFS Lineup Generator</h1>
        <p className='text-2xl text-muted-foreground'>Generate the best possible NBA DFS lineup for the day</p>
      </section>
      {error && <div className='error-message'>{error}</div>}
      {/** Generate the lineup */}
      <GenerateLineup />
      {lineup.length > 0 && <LineupDisplay />}
    </main>
  )
}
