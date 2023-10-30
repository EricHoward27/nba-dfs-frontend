import axios from 'axios';

export async function getPlayers(date: string) {
    try {
        const response = await axios.get(`http://localhost:5000/players/players?date=${date}`);
        return response.data;
    } catch (error) {
        console.error('Error getting players: ', error);
        return [];
    }
}