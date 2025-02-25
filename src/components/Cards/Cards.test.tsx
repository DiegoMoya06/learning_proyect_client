import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Cards from "./Cards.tsx";
import {CardModel} from "../../types/models/CardModel.ts";
import {card1, card2} from "../../testData/cardData.ts";
import {vi} from "vitest";
import {useDemo} from "../../hooks/useDemo.ts";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useLocation: () => ({state: {isDemo: true}}),
        useNavigate: vi.fn(),
    };
});

const useSelectorMock = vi.fn();
vi.mock('react-redux', () => ({
    useSelector: () => useSelectorMock,
}));

// Mock useDemo
vi.mock("../../hooks/useDemo", () => ({
    useDemo: vi.fn(),
}));

describe('Card view', () => {
    const mockHandleWeight = vi.fn();
    const mockCalculateProbabilities = vi.fn();
    const mockGetRandomCard = vi.fn();

    const cards: CardModel[] = [card1, card2];

    beforeEach(() => {
        // Mock useDemo to return specific methods
        (vi.mocked(useDemo)).mockReturnValue({
            getRandomCard: mockGetRandomCard,
            calculateProbabilities: mockCalculateProbabilities,
            handleWeight: mockHandleWeight,
        });
    });

    afterAll(() => {
        vi.clearAllMocks();
    });

    it('should show card with info and buttons', async () => {
        // TODO: will change when managing real data
        useSelectorMock.mockReturnValue(cards);
        const firstCard = cards[0];
        mockGetRandomCard.mockReturnValue(firstCard);

        render(<Cards/>);

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

        useSelectorMock.mockReturnValue(cards);
        const firstCard = cards[0];
        const secondCard = cards[1];
        mockGetRandomCard
            .mockReturnValueOnce(firstCard)
            .mockReturnValueOnce(secondCard);

        render(<Cards/>);

        expect(await screen.findByText(firstCard.title)).toBeVisible();
        expect(await screen.findByText(firstCard.description)).toBeVisible();

        const againButton = await screen.findByTestId('again-button');
        expect(againButton).toBeInTheDocument();

        fireEvent.click(againButton);

        mockGetRandomCard.mockReturnValue(secondCard);

        await waitFor(() => {
            if (screen.queryByText(firstCard.title) !== null || screen.queryByText(firstCard.description) !== null) {
                throw new Error("El elemento aún está presente");
            }
        });

        expect(await screen.findByText(secondCard.title)).toBeVisible();
        expect(await screen.findByText(secondCard.description)).toBeVisible();
    });

    it('should show message when no cards available', async () => {

        useSelectorMock.mockReturnValue(cards);
        mockGetRandomCard.mockReturnValue(null);

        render(<Cards/>);

        expect(await screen.findByText("No cards available")).toBeVisible();
    });
});