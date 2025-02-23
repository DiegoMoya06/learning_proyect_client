import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import Login from "./index.ts";
import {AuthProvider} from '../AuthContext/AuthProvider.tsx';
import {MemoryRouter} from 'react-router-dom';

// Mock the useAuth hook
vi.mock('../AuthContext/AuthProvider.tsx', async () => {
    // Import the actual module
    const actual = await vi.importActual<typeof import('../AuthContext/AuthProvider')>('../AuthContext/AuthProvider');
    return {
        ...actual, // Spread the actual module exports
        useAuth: () => ({
            isAuthenticated: false,
            login: mockLogin,
            logout: vi.fn(),
        }),
    };
});

const mockLogin = vi.fn();

describe('Login', () => {
    it('calls the login function when the form is submitted', async () => {

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </AuthProvider>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: {value: 'testuser@email.com'},
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: {value: 'password123'},
        });

        // Submit the form
        fireEvent.click(screen.getByText('Sign In'));

        // Debugging: Check if mockLogin was called
        console.log('mockLogin calls:', mockLogin.mock.calls);

        // Ensure the login function was called
        expect(mockLogin).toHaveBeenCalledWith("token"); // Adjust based on your implementation
    });
});