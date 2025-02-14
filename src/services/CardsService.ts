import axios from 'axios';
import {baseUrl} from "../utils.tsx";
import {CardModel} from "../types/models/CardModel.ts";

const cardsUrl = "card/";

export const CardsService = {

    async getAllCadsByDeckId(deckId: string) {
        const response = await axios.get<CardModel[]>(`${baseUrl}${cardsUrl}getByDeckId`, {
            params: {deckId}
        });

        return response.data;
    }
}