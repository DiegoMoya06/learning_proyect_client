import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeckModel} from "../types/models/DeckModel.ts";
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
                id, rate, probability, displayedTimes,
                updated, updatedBy
            } = action.payload;

            return {
                ...state,
                deck: {
                    ...state.deck,
                    cards: state.deck.cards.map(card =>
                        card.id === id ? {
                            ...card,
                            rate,
                            probability,
                            displayedTimes,
                            updated,
                            updatedBy
                        } : card
                    )
                }
            }
        },
    },
});

export const {setDemoMode, updateCardRate} = demoSlice.actions;
export const isDemoSelector = (state: RootState): boolean => state.demoInfo.isShowingDemo;
export const demoDeckSelector = (state: RootState): DeckModel => state.demoInfo.deck;
export const demoCardsSelector = (state: RootState): CardModel[] => state.demoInfo.deck.cards ?? [];
export default demoSlice.reducer;