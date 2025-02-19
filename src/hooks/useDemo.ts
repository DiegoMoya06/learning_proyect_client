import {WeightType, WeightValue} from "../types/models/DeckModel.ts";
import {useAppDispatch} from "../utils/store.ts";
import {useSelector} from "react-redux";
import {demoDeckSelector, updateCardRate} from "../slices/demoSlice.ts";
import {useMemo} from "react";
import {demoUser} from "../testData/userData.ts";
import {CardModel} from "../types/models/CardModel.ts";

export const useDemo = () => {
    const dispatch = useAppDispatch();
    const deckObj = useSelector(demoDeckSelector);
    const {HARD, MEDIUM, EASY, MAX, MIN} = WeightValue;

    // const [cards, setCards] = useState<CardModel[]>(deckObj?.cards ?? []);

    // Calculating Probabilities
    const cards = deckObj?.cards ?? [];
    const totalRate = useMemo(() => Object.values(cards)
        .reduce((sum, card) => sum + card.rate, 0), [deckObj.cards]);

    const calculateProbability = (toUpdate: CardModel) => {
        const cardToUpdate = cards.find(card => card.id === toUpdate.id);

        if (!cardToUpdate) return;

        const updatedCard = {
            ...cardToUpdate,
            probability: cardToUpdate.rate / totalRate
        };

        dispatch(updateCardRate(updatedCard));
    };

    const calculateProbabilities = () => {
        const updatedCards = cards.map(card => ({
            ...card,
            probability: card.rate / totalRate
        }));

        updatedCards.forEach(card => dispatch(updateCardRate(card)));
    };

    // Weighted random selection function
    const getRandomCard = () => {
        // Random number between 0 and 1
        const rand = Math.random();
        console.log("RAND", rand);
        let cumulativeProbability = 0.0;
        console.log("cumulativeProbability", cumulativeProbability);
        cards.forEach(cardElement => {
            cumulativeProbability += cardElement.probability;
            console.log("cumulativeProbability += cardElement.probability", (cumulativeProbability));

            if (rand < cumulativeProbability) {
                return cardElement;
            }
        });

        console.log("cards.at(0)", cards.at(0));
        // Fallback in case of rounding errors
        return cards.at(0);
    };

    const handleWeight = (weightType: WeightType, cardId: string) => {
        console.log("CARDS", cards)
        // TODO: is not working to update, i think is getting always the first version of "cards" and not the updated one
        const toUpdate = cards.find(card => card.id === cardId);

        if (!toUpdate) return;

        const currentDate = new Date().toDateString();

        const updatedCard = {
            ...toUpdate,
            rate: setNewRate(weightType, toUpdate.rate),
            displayedTimes: toUpdate.displayedTimes + 1,
            updated: currentDate,
            updatedBy: demoUser.name,
        };

        dispatch(updateCardRate(updatedCard));
    }

    const setNewRate = (weightType: WeightType, rate: number) => {
        switch (weightType) {
            case "Hard":
                rate = (rate * HARD) < MAX ? (rate * HARD) : MAX;
                break;
            case "Medium":
                rate = (rate * MEDIUM) < MAX ? (rate * MEDIUM) : MAX;
                break;
            case "Easy":
                rate = (rate * EASY) < MIN ? (rate * EASY) : MIN;
                break;
        }

        return rate;
    }


    return {
        handleWeight,
        calculateProbability,
        calculateProbabilities,
        getRandomCard
    }
}