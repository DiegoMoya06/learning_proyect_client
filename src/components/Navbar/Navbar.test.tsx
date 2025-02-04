import {it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import Navbar from "./Navbar.tsx";

vi.mock('react-router-dom');

describe('Navbar', () => {
    beforeEach(() => {
        render(<Navbar/>);
    });

    // TODO: add test to check the routing

    it('Should show navbars options menu', async () => {
        expect(await screen.findAllByText(/\blogo\b/i)).toHaveLength(2);
        expect(await screen.findAllByText(/\bcards\b/i)).toHaveLength(2);
        expect(await screen.findAllByText(/\edit\b/i)).toHaveLength(2);
    });

    it('Should show navbars user menu', async () => {
        expect(await screen.findAllByTestId(/\bavatar-icon-button\b/i)).toHaveLength(1);
        expect(await screen.findByTestId(/\bmenu-item-Profile\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Account\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Dashboard\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Logout\b/i)).toBeInTheDocument();
    });
});