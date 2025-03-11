import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import CardModal from './CardModal';
import {card2} from "../../testData/cardData.ts";
import {updateCardTitleAndDescription} from "../../slices/demoSlice.ts";
import userEvent from '@testing-library/user-event';

const useDispatchMock = vi.fn();

vi.mock('react-redux', () => ({
    useDispatch: () => useDispatchMock,
}));

vi.mock('./CardToDisplay', () => ({
    default: (props: any) => (
        <div data-testid="mock-card-to-display">
            {props.isEditing ? (
                <div>
                    <input
                        data-testid="title-input"
                        value={props.cardData.title || ''} // Ensure value is always defined
                        onChange={(e) => props.updateCardTitle(e)} // Pass the event to the handler
                    />
                    <input
                        data-testid="description-input"
                        value={props.cardData.description || ''} // Ensure value is always defined
                        onChange={(e) => props.updateCardDescription(e)} // Pass the event to the handler
                    />
                </div>
            ) : (
                <div>
                    <div>{props.cardData.title}</div>
                    <div>{props.cardData.description}</div>
                </div>
            )}
        </div>
    ),
}));

describe('CardModal', () => {
    const mockHandleClose = vi.fn();

    it('renders the dialog when isOpen is true', () => {
        render(
            <CardModal
                isOpen={true}
                isDemo={true}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Card Information')).toBeInTheDocument();
        expect(screen.getByText(card2.title)).toBeInTheDocument();
        expect(screen.getByText(card2.description)).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('does not render the dialog when isOpen is false', () => {
        render(
            <CardModal
                isOpen={false}
                isDemo={true}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        expect(screen.queryByRole('dialog')).toBeInTheDocument();
    });

    it('switches to editing mode when the Edit button is clicked', () => {
        render(
            <CardModal
                isOpen={true}
                isDemo={false}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        fireEvent.click(screen.getByText('Edit'));

        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('description-input')).toBeInTheDocument();
    });

    it('calls handleClose when the "Close" button is clicked', () => {
        render(
            <CardModal
                isOpen={true}
                isDemo={true}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('updates the card title and description when inputs are changed', async () => {
        const user = userEvent.setup();

        render(
            <CardModal
                isOpen={true}
                isDemo={false}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        const updatedTitle = "Updated Title";
        const updatedDescription = "Updated Description";

        // Switch to editing mode
        await user.click(screen.getByText('Edit'));

        // Update the title
        const titleInput = screen.getByTestId('title-input');
        await user.clear(titleInput);
        await user.type(titleInput, updatedTitle);

        // Update the description
        const descriptionInput = screen.getByTestId('description-input');
        await user.clear(descriptionInput);
        await user.type(descriptionInput, updatedDescription);

        expect(titleInput).toHaveValue(updatedTitle);
        expect(descriptionInput).toHaveValue(updatedDescription);
    });

    it('disables the Save changes button when title or description is empty', () => {
        render(
            <CardModal
                isOpen={true}
                isDemo={false}
                selectedCard={{...card2, title: '', description: ''}}
                handleClose={mockHandleClose}
            />
        );

        fireEvent.click(screen.getByText('Edit'));

        expect(screen.getByText('Save changes')).toBeDisabled();
    });

    it('dispatches updateCardTitleAndDescription when Save changes is clicked', () => {

        render(
            <CardModal
                isOpen={true}
                isDemo={false}
                selectedCard={card2}
                handleClose={mockHandleClose}
            />
        );

        fireEvent.click(screen.getByText('Edit'));

        fireEvent.click(screen.getByText('Save changes'));

        expect(useDispatchMock).toHaveBeenCalledWith(updateCardTitleAndDescription(card2));
        expect(mockHandleClose).toHaveBeenCalled();
    });
});