import {fireEvent, render, screen} from "@testing-library/react";
import {AuthProvider} from "./AuthProvider.tsx";
import TestComponent from "./TestComponent.tsx";


describe('AuthProvider', () => {
    it('provides authentication state and functions', async () => {
        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        // Initial state should be unauthenticated
        expect(await screen.getByText('Not Authenticated')).toBeInTheDocument();

        // Simulate login
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        expect(await screen.getByText('Authenticated')).toBeInTheDocument();

        // Simulate logout
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        expect(await screen.getByText('Not Authenticated')).toBeInTheDocument();
    });
});