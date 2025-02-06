import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Cards from "./Cards.tsx";
import {ShownCard} from "./CardsService.ts";

// TODO: remove when having real data
const cards: ShownCard[] = [
    {
        id: 1,
        title: 'Plants',
        description: 'Plants are essential for all life.',
        order: 1
    },
    {
        id: 2,
        title: 'Animals',
        description: 'Animals are a part of nature.',
        order: 2
    },
];

describe('Card view', () => {
    beforeEach(() => {
        render(<Cards/>);
    });

    // TODO: add test to check when there are no cards available, when adding db connection

    it('should show card with info and buttons', async () => {
        // TODO: will change when managing real data
        const firstCard = cards[0];

        // Text
        expect(await screen.findByText(firstCard.title)).toBeVisible();
        expect(await screen.findByText(firstCard.description)).toBeVisible();

        // Buttons
        expect(await screen.findByTestId('again-button')).toBeVisible();
        expect(await screen.findByTestId('good-button')).toBeVisible();
        expect(await screen.findByTestId('easy-button')).toBeVisible();
    });

    // TODO: test will be adapted when managing real data
    it('should change card when clicking a button', async () => {
        const firstCard = cards[0];
        const secondCard = cards[1];

        expect(await screen.findByText(firstCard.title)).toBeVisible();
        expect(await screen.findByText(firstCard.description)).toBeVisible();

        const againButton = await screen.findByTestId('again-button');
        expect(againButton).toBeInTheDocument();

        fireEvent.click(againButton);

        await waitFor(() => {
            if (screen.queryByText(firstCard.title) !== null || screen.queryByText(firstCard.description) !== null) {
                throw new Error("El elemento aún está presente");
            }
        });

        expect(await screen.findByText(secondCard.title)).toBeVisible();
        expect(await screen.findByText(secondCard.description)).toBeVisible();
    });
});