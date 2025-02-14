import {DeckModel} from "../../types/models/DeckModel.ts";
import {useEffect, useState} from "react";
import {CardModel} from "../../types/models/CardModel.ts";
import {demoCards} from "../../testData/cardData.ts";

interface DeckDetailsProps {
    selectedDeck?: DeckModel
}

export default function DeckDetails(props: DeckDetailsProps) {
    const {selectedDeck} = props;
    const [cards, setCards] = useState<CardModel[]>([]);

    useEffect(() => {
        if (!selectedDeck) {
            setCards(demoCards);
        } else {
        //     TODO: call service to fill cards
        }
    }, [selectedDeck]);

    return <>Deck Details</>;
}