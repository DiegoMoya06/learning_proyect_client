import {DecksService} from "./DecksService.ts";
import {describe, expect, it, vi} from "vitest";
import {DeckModel} from "../types/models/DeckModel.ts";
import {deck1, deck2} from "../testData/deckData.ts";
import axios from "axios";
import {baseUrl} from "../utils/utils.tsx";

vi.mock("axios");

describe('DecksService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Should get all decks succesfully', async () => {
        const mockDecks: DeckModel[] = [deck1, deck2];

        const getSpy = vi.spyOn(axios, "get").mockResolvedValue({data: mockDecks});

        console.log("Mocked axios.get before call:", getSpy.mock.calls);

        const result = await DecksService.getAllDecks();

        console.log("Mocked axios.get after call:", getSpy.mock.calls);

        expect(result).toEqual(mockDecks);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenCalledWith(`${baseUrl}decks`);
    });

    it("should handle API errors", async () => {
        const getSpy = vi.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));

        await expect(DecksService.getAllDecks()).rejects.toThrow("Network error or unexpected issue");
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
