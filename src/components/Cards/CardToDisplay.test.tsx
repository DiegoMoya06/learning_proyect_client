import {fireEvent, render, screen} from "@testing-library/react";
import CardToDisplay from "./CardToDisplay.tsx";
import {card1} from "../../testData/cardData.ts";
import {describe, expect, it, vi} from 'vitest';

describe('CardToDisplay', () => {
    const mockUpdateCardTitle = vi.fn();
    const mockUpdateCardDescription = vi.fn();

    it('should display card info when card is not null', () => {
        render(<CardToDisplay cardData={card1} isEditing={false}
                              updateCardTitle={mockUpdateCardTitle}
                              updateCardDescription={mockUpdateCardDescription}/>);

        expect(screen.getByTestId('title-field')).toHaveTextContent(card1.title);
        expect(screen.getByTestId('description-field')).toHaveTextContent(card1.description);
    });

    it('renders input fields when isEditing is true', () => {
        render(
            <CardToDisplay
                cardData={card1}
                isEditing={true}
                updateCardTitle={mockUpdateCardTitle}
                updateCardDescription={mockUpdateCardDescription}
            />
        );

        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('description-input')).toBeInTheDocument();
    });

    it('calls updateCardTitle when the title input is changed', () => {
        render(
            <CardToDisplay
                cardData={card1}
                isEditing={true}
                updateCardTitle={mockUpdateCardTitle}
                updateCardDescription={mockUpdateCardDescription}
            />
        );

        const updatedTitle = 'Updated Title';
        const titleInput = screen.getByTestId('title-input').querySelector('input')!;
        fireEvent.change(titleInput, {target: {value: updatedTitle}});

        expect(mockUpdateCardTitle).toHaveBeenCalled();
    });

    it('renders "No cards available" when cardData is null', () => {
        render(<CardToDisplay cardData={null} isEditing={false}
                              updateCardTitle={mockUpdateCardTitle}
                              updateCardDescription={mockUpdateCardDescription}/>);

        expect(screen.getByText('No cards available')).toBeInTheDocument();
    });
});