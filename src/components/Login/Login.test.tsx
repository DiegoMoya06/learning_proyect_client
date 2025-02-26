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

const useDispatchMock = vi.fn();

vi.mock('react-redux', () => ({
    useDispatch: () => useDispatchMock,
}));

describe('Login', () => {
    it('calls the login function when the form is submitted', async () => {

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: {value: 'testuser@email.com'},
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByText('Sign In'));

        // Debugging: Check if mockLogin was called
        console.log('mockLogin calls:', mockLogin.mock.calls);

        expect(mockLogin).toHaveBeenCalledWith("token");
    });
});