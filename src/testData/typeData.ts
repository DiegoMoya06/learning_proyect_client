import {user1} from "./userData.ts";
import {TypeModel} from "../types/models/TypeModel.ts";

export const type1: TypeModel = {
    id: '1',
    name: 'Manual',
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};