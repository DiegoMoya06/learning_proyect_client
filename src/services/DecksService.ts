import {baseUrl} from "../utils.tsx";
import axios from "axios";
import {Deck} from "../types/models/Deck.ts";

const deckUrl = "decks";

export const DecksService = {

    async getAllDecks() {
        const response = await axios.get<Deck[]>(`${baseUrl}${deckUrl}`);

        return response.data;
    }
}