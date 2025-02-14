import {CardModel} from "../types/models/CardModel.ts";
import {user1} from "./userData.ts";

export const card1: CardModel = {
    id: '1',
    title: 'Plants',
    description: 'Plants are essential for all life.',
    rate: 1,
    displayedTimes: 0,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const card2: CardModel = {
    id: '2',
    title: 'Animals',
    description: 'Animals are a part of nature.',
    rate: 1,
    displayedTimes: 0,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const card3: CardModel = {
    id: '3',
    title: 'Fungi',
    description: 'Humans depend on plants and animals for survival.',
    rate: 1,
    displayedTimes: 0,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const card4: CardModel = {
    id: '4',
    title: 'Fungi ',
    description: 'Fungi are eukaryotic organisms; i.e., their cells contain membrane-bound organelles and ' +
        'clearly defined nuclei. Historically, fungi were included in the plant kingdom; however, because fungi ' +
        'lack chlorophyll and are distinguished by unique structural and physiological features (i.e., components of ' +
        'the cell wall and cell membrane), they have been separated from plants. In addition, fungi are clearly ' +
        'distinguished from all other living organisms, including animals, by their principal modes of vegetative ' +
        'growth and nutrient intake. Fungi grow from the tips of filaments (hyphae) that make up the bodies of the ' +
        'organisms (mycelia), and they digest organic matter externally before absorbing it into their mycelia.',
    rate: 1,
    displayedTimes: 0,
    created: new Date().toDateString(),
    updated: new Date().toDateString(),
    createdBy: user1.name,
    updatedBy: user1.name
};

export const demoCards = [card1,card2,card3,card4];