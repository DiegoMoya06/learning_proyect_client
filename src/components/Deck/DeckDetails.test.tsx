import {fireEvent, render, screen} from "@testing-library/react";
import DeckDetails from "./DeckDetails.tsx";
import {it, vi} from "vitest";
import {configureStore} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import demoSlice from "../../slices/demoSlice.ts";

const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => navigateMock,
        useLocation: () => ({state: {isDemo: true}}),
    };
});

describe('DeckDetails Component', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                demoInfo: demoSlice
            },
            preloadedState: {
                demoInfo: {
                    deck: {
                        id: '1',
                        name: 'Demo Deck',
                        description: 'A test deck',
                        cards: [
                            {id: '1', displayedTimes: 0, rate: 3},
                            {id: '2', displayedTimes: 1, rate: 5},
                        ],
                    },
                    isShowingDemo: true
                },
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the deck name and description', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DeckDetails/>
                </MemoryRouter>
            </Provider>
        );

        console.log("Shows state", store.getState());
        console.log(screen.debug()); // Debugging output to inspect rendered component

        expect(screen.getByText('Demo Deck')).toBeInTheDocument();
        expect(screen.getByText('A test deck')).toBeInTheDocument();
    });

    it('displays the correct card count and progress', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DeckDetails/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Total number of cards: 2')).toBeInTheDocument();
        expect(screen.getByText('1 card to learn')).toBeInTheDocument();
        expect(screen.getByText('1 card to repeat')).toBeInTheDocument();
    });

    it('navigates to the learning page when clicking "Start learning"', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DeckDetails/>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Start learning'));
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('../library/cards/1');
    });

    it('disables "Start learning" button when deck is not available', () => {
        store = configureStore({
            reducer: {
                demoInfo: demoSlice, // Ensure this matches your real Redux setup
            },
            preloadedState: {
                demoInfo: {
                    deck: null, // No deck data
                    isShowingDemo: true,
                },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DeckDetails/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Start learning')).toBeDisabled();
    });
});