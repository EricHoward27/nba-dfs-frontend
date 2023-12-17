import React from "react";
import { usePlayerContext } from "@/app/context/PlayerContext";
import LineupDisplay from "./LineupDisplay";

const LineupModal = () => {
    const {isModalOpen, setModalOpen, lineup, clearLineup } = usePlayerContext();
    
    const handleClose = () => {
        setModalOpen(false);
    }

    if(!isModalOpen) return null;

    return(
        <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative bg-gray-800 text-white">
                <h3 className="font-bold text-lg text-center">Generated Lineup</h3>
                <LineupDisplay lineup={lineup}/>
                <div className="modal-action">
                    <button className="btn">Save Lineup</button>
                     <button onClick={(handleClose)} className="btn btn-secondary">Close</button>
                </div>
                <button onClick={handleClose} className="btn btn-circle btn-sm absolute right-2 top-2">x</button>
            </div>
        </div>
    )
}
export default LineupModal;