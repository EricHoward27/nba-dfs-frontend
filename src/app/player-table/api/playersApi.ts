import axios from 'axios';

export async function getPlayers(date: string) {
    try {
        const response = await axios.get(`https://eradfs-api.onrender.com/players/players?date=${date}`);
        return response.data;
    } catch (error) {
        console.error('Error getting players: ', error);
        return [];
    }
}