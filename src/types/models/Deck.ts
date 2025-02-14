import {Base} from "./Base.ts";

export interface Deck extends Base {
    name: string,
    description: string,
    type: string
}