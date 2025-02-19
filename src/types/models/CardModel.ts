import {Base} from "./Base.ts";


export interface CardModel extends Base {
    title: string;
    description: string;
    rate: number;
    probability: number;
    displayedTimes: number;
}