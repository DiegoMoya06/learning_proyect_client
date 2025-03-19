import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import BreadcrumbOpts, {BreadcrumbInfo} from './BreadcrumbOpts';
import {MemoryRouter, useNavigate} from 'react-router-dom';
import {deck1} from "../../testData/deckData.ts";

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('BreadcrumbOpts', () => {
    const mockElements: BreadcrumbInfo[] = [
        {name: 'Home', url: '/'},
        {name: 'Deck Details', url: '/deckDetails/false', state: {selectedDBDeck: deck1}},
        {name: 'Card Details', url: '/cardDetails'},
    ];
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        render(
            <MemoryRouter>
                <BreadcrumbOpts elements={mockElements}/>
            </MemoryRouter>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the correct number of breadcrumbs', () => {
        expect(screen.getAllByRole('button')).toHaveLength(2); // Two buttons
        expect(screen.getByText('Card Details')).toBeInTheDocument(); // One typography
    });

    it('renders the last breadcrumb as non-clickable text', () => {
        const lastBreadcrumb = screen.getByText('Card Details');
        expect(lastBreadcrumb.tagName).toBe('P'); // Typography renders as <p>
    });

    it('navigates to the correct URL when a breadcrumb is clicked', () => {
        const homeBreadcrumb = screen.getByText('Home');
        fireEvent.click(homeBreadcrumb);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('navigates with state when the URL is /deckDetails', () => {
        const deckDetailsBreadcrumb = screen.getByText('Deck Details');
        fireEvent.click(deckDetailsBreadcrumb);

        expect(mockNavigate).toHaveBeenCalledWith('/deckDetails/false', {state: {selectedDBDeck: deck1}});
    });
});