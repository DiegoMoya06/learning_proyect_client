import {render,screen} from "@testing-library/react";
import CardToDisplay from "./CardToDisplay.tsx";
import {card1} from "../../testData/cardData.ts";


describe('CardToDisplay', () => {
    it('should display card info when card is not null',  () => {
        render(<CardToDisplay cardData={card1} />);

        // Check if the card title is rendered
        expect(screen.getByText(card1.title)).toBeInTheDocument();

        // Check if the card description is rendered
        expect(screen.getByText(card1.description)).toBeInTheDocument();
    });

    it('renders "No cards available" when cardData is null', () => {
        render(<CardToDisplay cardData={null} />);

        // Check if the fallback text is rendered
        expect(screen.getByText('No cards available')).toBeInTheDocument();
    });
});