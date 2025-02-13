import {Base} from "./Base.ts";

export interface Deck extends Base {
    id: string,
    name: string,
    description: string,
    type: number
}