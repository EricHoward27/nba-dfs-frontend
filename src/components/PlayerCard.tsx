'use client';
import { Player } from '@/app/types/Player';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from "@/components/ui/switch"


type PlayerCardProps = {
    player: Player;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    const [isDraftKings, setIsDraftKings] = useState(true);
    const handleToggle = () => {
        setIsDraftKings(!isDraftKings);
    }
    return (
        <Card className='m-4 p-4'>
            <div className='flex justify-between items-center'>
                <CardTitle>
                    {isDraftKings ? 'DraftKings' : 'FanDuel'}
                    <Switch checked={isDraftKings} onCheckedChange={handleToggle}/>
                </CardTitle>
                <CardContent>
                    <CardHeader>{isDraftKings ? player.DraftKingsPosition : player.FanDuelPosition}</CardHeader>
                    <CardDescription className='text-lg font-bold'>Name: {player.Name}</CardDescription>
                    <CardDescription>Position: {player.Position}</CardDescription>
                    <CardDescription>Points: {player.Points}</CardDescription>
                    <CardDescription>
                        Fantasy Points: {isDraftKings ? player.FantasyPointsDraftKings : player.FantasyPointsFanDuel }
                    </CardDescription>  
                </CardContent>
                <CardFooter>
                    <CardDescription>Projected Points: {player.fantasyProjection}</CardDescription>
                </CardFooter>
            </div>
        </Card>
    );
};
export default PlayerCard;

