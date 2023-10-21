"use client"

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'
import { ModeToggle } from "./ui/toggle-mode"
import Image from 'next/image';

// Nav component for the main navigation bar at the top of the page
// This component will be reusable across all pages as it can be placed in the layout component and will be rendered on every page
// Also this component could be used in the main page.tsx file to render the navigation bar on the main page as well
export default function Nav( { user }: Session) {
    return (
        <header>
            <nav className='flex justify-between items-center py-8'>
            <h1>NBA DFS LINEUP GENERATOR</h1>
                <ul className='flex items-center gap-12'>
                    {/** checking for a user; if the user is not sign in or null then show the sign in btn */}
                    { !user && (
                        <li>
                            <Button onClick={() => signIn()}>Sign In</Button>
                        </li>
                    
                    )}
                    {/** if the user is sign in then show the sign out btn */}
                    { user && (
                    <div className='flex items-center gap-6'>
                        <li>
                            <Image src={user?.image as string} 
                            alt={user.name as string} 
                            width={48} 
                            height={48}
                            className='rounded-full'
                            />
                        </li>
                        <li>
                            <Button onClick={() => signOut()}>Sign Out</Button>
                        </li>
                    </div>
                    )}
                    <li><ModeToggle /></li>
                </ul>
            </nav>
        </header>
    )

}