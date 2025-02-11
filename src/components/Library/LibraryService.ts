import {baseUrl} from "../../utils.tsx";
import axios from "axios";

export interface Deck {
    id: number,
    name: string,
    description: string,
    type: number
}

const deckUrl = "deck/";

export const LibraryService = {

    async getAllDecks() {
        const response = await axios.get<Deck[]>(`${baseUrl}${deckUrl}`);

        return response.data;
    }
}