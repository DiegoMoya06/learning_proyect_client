import axios from 'axios';
import {baseUrl} from "../utils.tsx";

export interface ShownCard {
    id: number,
    title: string,
    description: string,
    order: number
}

const cardsUrl = "card/";

export const CardsService = {

    async getAllCadsByDeckId(deckId: string) {
        const response = await axios.get<ShownCard[]>(`${baseUrl}${cardsUrl}getByDeckId`, {
            params: {deckId}
        });

        return response.data;
    }
}