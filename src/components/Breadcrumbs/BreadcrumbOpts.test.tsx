import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import BreadcrumbOpts, {BreadcrumbInfo} from './BreadcrumbOpts';
import {MemoryRouter, useNavigate} from 'react-router-dom';

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
        {name: 'Deck Details', url: '/deckDetails'},
        {name: 'Card Details', url: '/cardDetails'},
    ];

    it('renders the correct number of breadcrumbs', () => {
        render(
            <MemoryRouter>
                <BreadcrumbOpts elements={mockElements}/>
            </MemoryRouter>
        );

        expect(screen.getAllByRole('button')).toHaveLength(2); // Two buttons
        expect(screen.getByText('Card Details')).toBeInTheDocument(); // One typography
    });

    it('renders the last breadcrumb as non-clickable text', () => {
        render(
            <MemoryRouter>
                <BreadcrumbOpts elements={mockElements}/>
            </MemoryRouter>
        );

        const lastBreadcrumb = screen.getByText('Card Details');
        expect(lastBreadcrumb.tagName).toBe('P'); // Typography renders as <p>
    });

    it('navigates to the correct URL when a breadcrumb is clicked', () => {
        const mockNavigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <BreadcrumbOpts elements={mockElements}/>
            </MemoryRouter>
        );

        // Click the "Home" breadcrumb
        const homeBreadcrumb = screen.getByText('Home');
        fireEvent.click(homeBreadcrumb);

        // Check if navigate was called with the correct URL
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('navigates with state when the URL is /deckDetails', () => {
        const mockNavigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <BreadcrumbOpts elements={mockElements}/>
            </MemoryRouter>
        );

        // Click the "Deck Details" breadcrumb
        const deckDetailsBreadcrumb = screen.getByText('Deck Details');
        fireEvent.click(deckDetailsBreadcrumb);

        // Check if navigate was called with the correct URL and state
        expect(mockNavigate).toHaveBeenCalledWith('/deckDetails', {state: {isDemo: true}});
    });
});