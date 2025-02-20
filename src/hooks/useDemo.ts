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
    const cards = useMemo(() => deckObj?.cards ?? [], [deckObj?.cards]);
    const totalRateG = useMemo(() => Object.values(cards)
        .reduce((sum, card) => sum + card.rate, 0), [deckObj.cards]);

    // TODO: check if still necessary
    const calculateProbabilities = () => {
        const updatedCards = cards.map(card => ({
            ...card,
            probability: card.rate / totalRateG
        }));

        updatedCards.forEach(card => dispatch(updateCardRate(card)));
    };

    // Weighted random selection function
    const getRandomCard = (currentCardsList: CardModel[], currentCardId?: string) => {
        // Random number between 0 and 1
        const rand = Math.random();
        let cumulativeProbability = 0.0;

        // TODO: solve issue that the first cards are shown more because are the first to be compared with rand
        for (const cardElement of currentCardsList) {
            cumulativeProbability += cardElement.probability;

            if (rand < cumulativeProbability && currentCardId !== cardElement.id) {
                return cardElement;
            }
        }

        // Fallback in case of rounding errors
        return currentCardsList.at(0);
    };

    const handleWeight = (weightType: WeightType, cardElement: CardModel, totalRate: number) => {
        if (!cardElement) return;
        console.log("CARD ELEMENT TO RATE", cardElement);

        const newRate = setNewRate(weightType, cardElement.rate);
        const newTotalRate = totalRate - cardElement.rate + newRate;
        const newProbability = newRate / newTotalRate;
        const newDisplayedTimes = cardElement.displayedTimes + 1;
        const currentDate = new Date().toDateString();

        const updatedCard = {
            ...cardElement,
            rate: newRate,
            probability: newProbability,
            displayedTimes: newDisplayedTimes,
            updated: currentDate,
            updatedBy: demoUser.name,
        };

        dispatch(updateCardRate(updatedCard));
    };

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
        calculateProbabilities,
        getRandomCard
    }
}