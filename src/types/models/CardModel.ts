import {Base} from "./Base.ts";
import {v4 as uuidv4} from 'uuid';
import {user1} from "../../testData/userData.ts";


export interface CardModel extends Base {
    title: string;
    description: string;
    rate: number;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date | string | null;
}

export interface CardStatsModel {
    id: string;
    title: string;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date | string | null;
}

export interface NewACardModel {
    id: string;
    title: string;
    description: string;
    deckId: string;
    rate: number;
    timesDisplayed: number;
    lastDisplayed: Date;
    probability: number;
}

export const toCardModel = (newCard: NewACardModel):CardModel => {
    const tempId = uuidv4();
    const currentDate = new Date().toDateString();
    const {
        title,
        description,
        rate,
        timesDisplayed,
        probability,
    } = newCard;

    return {
        id: tempId,
        title,
        description,
        rate,
        probability,
        timesDisplayed,
        lastDisplayed:null,
        created: currentDate,
        updated: currentDate,
        createdBy: user1.name,
        updatedBy: user1.name
    };
}