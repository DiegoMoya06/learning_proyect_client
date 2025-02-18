import {Base} from "./Base.ts";
import {CardModel} from "./CardModel.ts";

export interface DeckModel extends Base {
    name: string;
    description: string;
    type: string;
    cards?: CardModel[];
}