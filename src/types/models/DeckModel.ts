import {Base} from "./Base.ts";
import {CardModel, NewACardModel} from "./CardModel.ts";

export interface DeckModel extends Base {
    name: string;
    description: string;
    type: string;
    cards?: CardModel[];
}

export interface NewADeck {
    id: string;
    name: string;
    generalDescription: string;
    cardsList: NewACardModel[];
}

export type WeightType = "Hard" | "Medium" | "Easy";

export enum WeightValue {
    HARD = 1.5,
    MEDIUM = 1.2,
    EASY = 0.8,
    MAX = 5.0,
    MIN = 0.2
}