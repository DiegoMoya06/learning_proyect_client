import {Deck} from "../types/models/Deck.ts";
import {user1, user2} from "./userData.ts";


export const deck1: Deck = {
    id: '1', name: 'Deck 1', description: 'First deck', type: 'Manual', created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const deck2: Deck = {
    id: '2', name: 'Deck 2', description: 'Second deck', type: 'Manual', created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user2.name,
    updatedBy: user2.name
};