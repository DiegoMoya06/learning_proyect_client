import {fireEvent, render, screen} from "@testing-library/react";
import DeckDetails from "./DeckDetails.tsx";
import {it, vi} from "vitest";
import {configureStore} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import demoSlice from "../../slices/demoSlice.ts";
import {deck1} from "../../testData/deckData.ts";

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

    return {
        ...actual,
        useNavigate: () => navigateMock,
        useLocation: () => ({state: {isDemo: true}}),
        useParams: () => ({isDemo: 'true'})
    };
});

describe('DeckDetails Component', () => {
    let store: any;
    let useParamsMock = vi.fn();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                demoInfo: demoSlice
            },
            preloadedState: {
                demoInfo: {
                    deck: deck1,
                    isShowingDemo: true
                },
            },
        });

        vi.doMock('react-router-dom', async () => {
            const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
            return {
                ...actual,
                useNavigate: () => navigateMock,
                useLocation: () => ({state: {isDemo: true}}),
                useParams: useParamsMock
            };
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

        expect(screen.getByText(deck1.name)).toBeInTheDocument();
        expect(screen.getByText(deck1.description)).toBeInTheDocument();
    });

    it('displays the correct card count and progress', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DeckDetails/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Total number of cards: ' + deck1.cards?.length)).toBeInTheDocument();
        expect(screen.getByText('20 cards to learn')).toBeInTheDocument();
        expect(screen.getByText('0 cards to repeat')).toBeInTheDocument();
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
        expect(navigateMock).toHaveBeenCalledWith('../library/cards/' + deck1.id, {state: {isDemo: true}});
    });
});