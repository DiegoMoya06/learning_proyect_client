import {configureStore} from "@reduxjs/toolkit";
import demoSlice from "../../slices/demoSlice.ts";
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {describe, expect, it, vi} from 'vitest';
import Dashboard from "./Dashboard.tsx";

const store = configureStore({
    reducer: {
        demo: demoSlice,
    },
});

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Dashboard', () => {
    it('renders the Dashboard component correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Demo of Learning Cards')).toBeInTheDocument();
        expect(screen.getByText('With this tool, you can now:')).toBeInTheDocument();

        expect(screen.getByText('Automatically create decks')).toBeInTheDocument();
        expect(screen.getByText('View detailed insights')).toBeInTheDocument();
        expect(screen.getByText('Edit card information')).toBeInTheDocument();
        expect(screen.getByText('Start learning')).toBeInTheDocument();
    });

    it('navigates to deckDetails when the card is clicked', async () => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);

        const {container} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );

        const cardActionArea = container.querySelector('.MuiCardActionArea-root');
        if (cardActionArea) {
            fireEvent.click(cardActionArea);
        }

        expect(mockNavigate).toHaveBeenCalledWith('deckDetails/true', {state: {isDemo: true}});
    });

    it('dispatches setDemoMode when navigating to deckDetails', async () => {
        const dispatchSpy = vi.spyOn(store, 'dispatch');

        const {container} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );

        const cardActionArea = container.querySelector('.MuiCardActionArea-root');
        if (cardActionArea) {
            fireEvent.click(cardActionArea);
        }

        expect(dispatchSpy).toHaveBeenCalledWith({type: 'demoInfo/setDemoMode', payload: true});
    });
});