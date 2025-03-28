import axios from 'axios';
import {baseUrl, handleApiError} from "../utils/utils.tsx";
import {CardModel} from "../types/models/CardModel.ts";
import {DeckModel, WeightType} from "../types/models/DeckModel.ts";

const cardsUrl = "cards/";

export const CardsService = {

    async getAllCardsByDeckId(deckId: string) {
        const response = await axios.get<CardModel[]>(`${baseUrl}${cardsUrl}getByDeckId`, {
            params: {deckId}
        });

        return response.data;
    },

    async createNewCard(card: CardModel, deckId: string) {
        try {
            const createModel = {
                card, deckId
            }
            const response = await axios.post<CardModel>("", createModel);

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    async updateCardWeight(weightType: WeightType, cardId: string) {
        try {
            const response = await axios.put<DeckModel>(
                `${baseUrl}${cardsUrl}${cardId}`,
                {weightType: weightType},
                {headers: {"Content-Type": "application/json"}}
            );

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    async deleteCard(cardId: string) {
        try {
            const response = await axios.delete(`/${cardId}`);

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    }
}