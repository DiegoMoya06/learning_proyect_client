import {it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import Navbar from "./Navbar.tsx";
import {useNavigate} from "react-router-dom";
import {AuthProvider} from "../AuthContext/AuthProvider.tsx";

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useDispatchMock = vi.fn();

vi.mock('react-redux', () => ({
    useDispatch: () => useDispatchMock,
}));

describe('Navbar', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        // Mock localStorage to simulate an authenticated user
        localStorage.setItem('token', 'fake-token');

        render(
            <AuthProvider>
                <Navbar/>
            </AuthProvider>
        );
    });

    afterEach(() => {
        // Clean up localStorage
        localStorage.removeItem('token');
    });

    it('Should show navbar options menu', async () => {
        expect(await screen.findAllByText(/\blc\b/i)).toHaveLength(2);
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

    // TODO: complete tests to check the routing
    // TODO: (e.g., clicking on the wrong element or failure to navigate)

    it('Should navigate', async () => {
        const libraries = await screen.findAllByText(/\blibrary\b/i);

        expect(libraries).toHaveLength(2);
        fireEvent.click(libraries[0]);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenLastCalledWith("/library");

        const logo = await screen.findAllByText(/\blc\b/i);

        expect(logo).toHaveLength(2);
        fireEvent.click(logo[0]);
        expect(mockNavigate).toHaveBeenCalledTimes(2);
        expect(mockNavigate).toHaveBeenLastCalledWith("/");
    });
});