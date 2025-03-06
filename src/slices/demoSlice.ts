import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeckModel, NewADeckModel, toDeckModel} from "../types/models/DeckModel.ts";
import {deck1} from "../testData/deckData.ts";
import {CardModel} from "../types/models/CardModel.ts";
import {RootState} from "../utils/store.ts";

interface DemoInfoData {
    deck: DeckModel;
    isShowingDemo: boolean;
}

export const demoInfoInitialState: DemoInfoData = {
    deck: deck1,
    isShowingDemo: false
};

const demoSlice = createSlice({
    name: 'demoInfo',
    initialState: demoInfoInitialState,
    reducers: {
        setDemoMode(state, action: PayloadAction<boolean>) {
            return {...state, isShowingDemo: action.payload}
        },
        updateCardRate(state, action: PayloadAction<CardModel>) {
            if (!state.deck.cards) return;

            const {
                id, rate, probability, timesDisplayed, lastDisplayed,
                updated, updatedBy
            } = action.payload;

            return {
                ...state,
                deck: {
                    ...state.deck,
                    cards: state.deck.cards.map(card123 => (
                            card123.id === id ? {
                                ...card123,
                                rate,
                                probability,
                                timesDisplayed: timesDisplayed,
                                lastDisplayed,
                                updated,
                                updatedBy
                            } : card123
                        )
                    )
                }
            }
        },
        updateCardTitleAndDescription(state, action: PayloadAction<CardModel>) {
            if (!state.deck.cards) return;

            const currentDate = new Date().toDateString();
            const {
                id, title, description, updatedBy
            } = action.payload;

            return {
                ...state,
                deck: {
                    ...state.deck,
                    cards: state.deck.cards.map(card123 => (
                            card123.id === id ? {
                                ...card123,
                                title,
                                description,
                                updated: currentDate,
                                updatedBy
                            } : card123
                        )
                    )
                }
            }
        },
        updateDeck(state, action: PayloadAction<NewADeckModel>) {
            if (!state.deck) return;

            const newDeckModel = toDeckModel(action.payload);

            return {
                ...state,
                deck: newDeckModel
            }
        },
    },
});

export const {
    setDemoMode, updateCardRate,
    updateCardTitleAndDescription, updateDeck
} = demoSlice.actions;
export const isDemoSelector = (state: RootState): boolean => state.demoInfo.isShowingDemo;
export const demoDeckSelector = (state: RootState): DeckModel => state.demoInfo.deck;
export const demoCardsSelector = (state: RootState): CardModel[] => state.demoInfo.deck.cards ?? [];
export default demoSlice.reducer;