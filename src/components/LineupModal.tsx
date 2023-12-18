import React from "react";
import { usePlayerContext } from "@/app/context/PlayerContext";
import LineupDisplay from "./LineupDisplay";
import { useSession } from "next-auth/react";

const LineupModal = () => {
    const {isModalOpen, setModalOpen, lineup } = usePlayerContext();
    const { data: session } = useSession();
    const handleClose = () => {
        setModalOpen(false);
    }
    console.log("Session user object:", session?.user)
    const saveLineup = async () => {
        console.log(session)
        const token = session?.accessToken;
        // check if user or session was return
        if(!session || !session.user) {
            console.error("Session or user is not available");
            return;
        }
        // check if token was return
        if(!token) {
            console.error('No access token available');
            return;
        }
        const playerIds = lineup.map(player => player.StatID);
        console.log("This is the playerIds:", playerIds)
        try {
            const response = await fetch('http://localhost:5000/api/lineup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    date: new Date().toISOString(),
                    playerIds: playerIds,
                }),
            });
            
            if(!response.ok) {
                throw new Error('Failed to save linup');
            }
        } catch (error) {
            console.error('Error saving lineup:', error);
        }
    }

    if(!isModalOpen) return null;

    return(
        <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative bg-gray-800 text-white">
                <h3 className="font-bold text-lg text-center">Generated Lineup</h3>
                <LineupDisplay lineup={lineup}/>
                <div className="modal-action">
                    <button className="btn" onClick={saveLineup}>Save Lineup</button>
                     <button onClick={(handleClose)} className="btn btn-secondary">Close</button>
                </div>
                <button onClick={handleClose} className="btn btn-circle btn-sm absolute right-2 top-2">x</button>
            </div>
        </div>
    )
}
export default LineupModal;