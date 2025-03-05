import {Base} from "./Base.ts";


export interface CardModel extends Base {
    title: string;
    description: string;
    rate: number;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date | string;
}

export interface CardStatsModel {
    id: string;
    title: string;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date  | string;
}

export interface NewACardModel {
    id: string;
    title: string;
    description: string;
    deckId: string;
    rate: number;
    displayedTimes: number;
    lastDisplayed: Date;
    probability: number;
}