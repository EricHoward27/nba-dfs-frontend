import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth/next';
import { authOptions } from './(auth)/api/auth/[...nextauth]/route';

export default async function Home() {
  // Here we use getServerSession to get the session data that check the user is sign in 
  const session = await getServerSession(authOptions);
  return (
    <main className="p-24">
      {/** fetch the user from the session to use data object from options */}
       <Nav user={session?.user} expires={session?.expires as string }/>
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
