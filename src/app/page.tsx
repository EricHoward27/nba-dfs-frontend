import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <main className="p-24">
       <Nav />
      <section className='py-12 flex flex-col items-center text-center'>
        <h1 className='text-4xl font-bold'>NBA DFS Lineup Generator</h1>
        <p className='text-2xl text-muted-foreground'>Generate the best possible NBA DFS lineup for the day</p>
      </section>
      <div className='flex gap-6 items-center justify-center'>
          <Button>Generate Lineup</Button>
          <Button variant={"secondary"}>Clear Lineup</Button>
      </div>
    </main>
  )
}
