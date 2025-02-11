import {it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import Navbar from "./Navbar.tsx";
import {useNavigate} from "react-router-dom";

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Navbar', () => {
    beforeEach(() => {
        render(<Navbar/>);
    });

    // TODO: add test to check the routing

    it('Should show navbar options menu', async () => {
        expect(await screen.findAllByText(/\blogo\b/i)).toHaveLength(2);
        expect(await screen.findAllByText(/\blibrary\b/i)).toHaveLength(2);
        expect(await screen.findAllByText(/\edit\b/i)).toHaveLength(2);
    });

    it('Should show navbar user menu', async () => {
        expect(await screen.findAllByTestId(/\bavatar-icon-button\b/i)).toHaveLength(1);
        expect(await screen.findByTestId(/\bmenu-item-Profile\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Account\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Dashboard\b/i)).toBeInTheDocument();
        expect(await screen.findByTestId(/\bmenu-item-Logout\b/i)).toBeInTheDocument();
    });

    it('Should navigate', async () => {
        // TODO: fix tests issues
        const navigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(navigate);

        const libraries = await screen.findAllByText(/\blibrary\b/i);
        expect(libraries).toHaveLength(2);
        fireEvent.click(libraries[0]);
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenLastCalledWith("/library");

    });
});