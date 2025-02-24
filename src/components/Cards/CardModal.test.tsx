import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import CardModal from './CardModal';
import {card2} from "../../testData/cardData.ts";

describe('CardModal', () => {
    const mockHandleClose = vi.fn();

    it('renders the dialog when isOpen is true', () => {
        render(
            <CardModal
                isOpen={true}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Card Information')).toBeInTheDocument();
        expect(screen.getByText(card2.title)).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('does not render the dialog when isOpen is false', () => {
        render(
            <CardModal
                isOpen={false}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders "No cards available" when selectedCard is null', () => {
        render(
            <CardModal
                isOpen={true}
                selectedCard={null}
                handleClose={mockHandleClose}
            />
        );

        expect(screen.getByText('No cards available')).toBeInTheDocument();
    });

    it('calls handleClose when the "Close" button is clicked', () => {
        render(
            <CardModal
                isOpen={true}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(mockHandleClose).toHaveBeenCalled();
    });
});