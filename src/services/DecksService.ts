import {baseUrl, handleApiError} from "../utils/utils.tsx";
import axios from "axios";
import {DeckModel} from "../types/models/DeckModel.ts";

const deckUrl = "decks";

export const DecksService = {

    async getAllDecks() {
        try {
            const response = await axios.get<DeckModel[]>(`${baseUrl}${deckUrl}`);

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    }
}