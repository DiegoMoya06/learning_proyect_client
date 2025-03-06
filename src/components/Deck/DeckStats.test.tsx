import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import DeckStats from './DeckStats';
import {CardModel, CardStatsModel} from '../../types/models/CardModel';

describe('DeckStats', () => {
    const mockCards: CardStatsModel[] = [
        {
            id: '1',
            title: 'Card 1',
            timesDisplayed: 5,
            lastDisplayed: new Date('2023-10-01T00:00:00Z'),
            probability: 0.25,
        },
        {
            id: '2',
            title: 'Card 2',
            timesDisplayed: 10,
            lastDisplayed: new Date('2023-10-02T00:00:00Z'),
            probability: 0.5,
        },
    ];
    const isDemo = true;

    it('renders the DataGrid with correct rows and columns', () => {
        render(<DeckStats deckCards={mockCards as CardModel[]} isDemo={isDemo}/>);

        // Check if the columns are rendered
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Times displayed')).toBeInTheDocument();
        expect(screen.getByText('Last displayed')).toBeInTheDocument();
        expect(screen.getByText('Probability to be displayed')).toBeInTheDocument();

        // Check if the rows are rendered
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        expect(screen.getByText('Card 2')).toBeInTheDocument();
    });

    it('hides the ID column', () => {
        render(<DeckStats deckCards={mockCards as CardModel[]} isDemo={isDemo}/>);

        // Check if the ID column is hidden
        expect(screen.queryByText('ID')).not.toBeInTheDocument();
    });

    // TODO: complete
    // it('calls handleSelectedRow when a row is selected', () => {
    //
    // });

    it('formats the probability column correctly', () => {
        render(<DeckStats deckCards={mockCards as CardModel[]} isDemo={isDemo}/>);

        // Check if the probability is formatted as a percentage
        expect(screen.getByText('0.250%')).toBeInTheDocument();
        expect(screen.getByText('0.500%')).toBeInTheDocument();
    });

    it('formats the lastDisplayed column correctly', () => {
        render(<DeckStats deckCards={mockCards as CardModel[]} isDemo={isDemo}/>);

        // Check if the lastDisplayed date is formatted correctly
        expect(screen.getByText('Sun Oct 01 2023')).toBeInTheDocument();
        expect(screen.getByText('Mon Oct 02 2023')).toBeInTheDocument();
    });
});