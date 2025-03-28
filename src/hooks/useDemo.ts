import {WeightType, WeightValue} from "../types/models/DeckModel.ts";
import {demoUser, user1} from "../testData/userData.ts";
import {CardModel} from "../types/models/CardModel.ts";

export const useDemo = () => {
    const {HARD, MEDIUM, EASY, MAX, MIN} = WeightValue;

    // Weighted random selection function
    const getRandomCard = (currentCardsList: CardModel[], currentCardId?: string) => {
        const eligibleCards = currentCardId ?
            currentCardsList.filter(card => card.id !== currentCardId) :
            currentCardsList;

        if (eligibleCards.length === 0) return currentCardsList.at(0);
        if (eligibleCards.length === 1) return eligibleCards.at(0);

        let cumulativeProbability = 0.0;
        let cumulativeProbabilities: number[] = [];

        for (const cardElement of eligibleCards) {
            cumulativeProbability += cardElement.probability;
            cumulativeProbabilities.push(cumulativeProbability);
        }

        // Random number between 0 and 1
        const rand = Math.random();

        // Use binary search to find the selected card
        let left = 0;
        let right = cumulativeProbabilities.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (rand < cumulativeProbabilities[mid]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return currentCardsList.at(left);
    };

    const handleWeight = (weightType: WeightType, cardElement: CardModel, totalRate: number) => {
        const newRate = setNewRate(weightType, cardElement.rate);
        const newTotalRate = totalRate - cardElement.rate + newRate;
        const newProbability = newRate / newTotalRate;
        const newTimesDisplayed = cardElement.timesDisplayed + 1;
        const newLastDisplayed = new Date().toDateString();
        const currentDate = new Date().toDateString();

        return {
            ...cardElement,
            rate: newRate,
            probability: newProbability,
            timesDisplayed: newTimesDisplayed,
            lastDisplayed: newLastDisplayed,
            updated: currentDate,
            updatedBy: demoUser.name,
        };
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

    const calculateProbabilities = (cardList: CardModel[], updatedCardId: string) => {
        const currentDate = new Date().toDateString();
        const newTotalRate = Object.values(cardList).reduce((sum, card) => sum + card.rate, 0);

        return cardList.map(card => ({
            ...card,
            probability: card.id !== updatedCardId ? card.rate / newTotalRate : card.rate,
            updated: currentDate,
            updatedBy: user1.name
        }));
    };

    const calculateAdjustedRates = (cardList: CardModel[], updatedCardId: string) => {
        const updatedRatesList = cardList.map(card => {
            if (card.lastDisplayed && card.id !== updatedCardId) {
                const decayFactor = calculateDecayFactor(new Date(card.lastDisplayed));
                const newRate = card.rate * decayFactor;
                return {...card, rate: newRate};
            }
            return card;
        });

        return calculateProbabilities(updatedRatesList, updatedCardId);
    }

    const calculateDecayFactor = (lastDisplay: Date) => {
        const decayConstant = 1.0;
        const currentTime = new Date();
        const differenceInTime = currentTime.getTime() - lastDisplay.getTime();
        const elapsedTimeInDays = lastDisplay ? Math.round(differenceInTime / (1000 * 3600 * 24)) : 60;

        return Math.exp(-decayConstant * elapsedTimeInDays);
    }

    return {
        handleWeight,
        calculateProbabilities,
        calculateAdjustedRates,
        getRandomCard
    }
}