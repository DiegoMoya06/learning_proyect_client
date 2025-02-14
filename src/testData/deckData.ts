import {DeckModel} from "../types/models/DeckModel.ts";
import {user1, user2} from "./userData.ts";
import {demoCards} from "./cardData.ts";
import {type1} from "./typeData.ts";


export const deck1: DeckModel = {
    id: '1',
    name: 'Deck 1',
    description: 'First deck',
    type: type1.name,
    cards: demoCards,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const deck2: DeckModel = {
    id: '2',
    name: 'Deck 2',
    description: 'Second deck',
    type: type1.name,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user2.name,
    updatedBy: user2.name
};