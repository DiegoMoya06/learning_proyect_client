import {Base} from "./Base.ts";
import {CardModel, NewACardModel, toCardModel} from "./CardModel.ts";
import {v4 as uuidv4} from "uuid";
import {user1} from "../../testData/userData.ts";

export interface DeckModel extends Base {
    name: string;
    description: string;
    type: string;
    cards?: CardModel[];
}

export interface NewADeckModel {
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

export const toDeckModel = (newADeck: NewADeckModel):DeckModel => {
    const tempId = uuidv4();
    const type = "Automatic";
    const currentDate = new Date().toDateString();
    const {
        name,generalDescription,cardsList
    } = newADeck;

    const newCardsList = cardsList.map(newCard => toCardModel(newCard));

    return {
        id: tempId,
        name,
        description:generalDescription,
        type,
        cards: newCardsList,
        created: currentDate,
        updated: currentDate,
        createdBy: user1.name,
        updatedBy: user1.name
    };
}