"use client"

import { ModeToggle } from "./ui/toggle-mode"

// Nav component for the main navigation bar at the top of the page
// This component will be reusable across all pages as it can be placed in the layout component and will be rendered on every page
// Also this component could be used in the main page.tsx file to render the navigation bar on the main page as well
export default function Nav() {
    return (
        <header>
            <nav>
                <ul className="flex items-center justify-between">
                    <li><a href="/">NBA DFS LINEUP GENERATOR</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><ModeToggle /></li>
                </ul>
            </nav>
        </header>
    )

}