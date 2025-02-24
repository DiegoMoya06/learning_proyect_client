import {Base} from "./Base.ts";


export interface CardModel extends Base {
    title: string;
    description: string;
    rate: number;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date;
}

export interface CardStatsModel {
    id: string,
    title: string;
    probability: number;
    timesDisplayed: number;
    lastDisplayed: Date;
}