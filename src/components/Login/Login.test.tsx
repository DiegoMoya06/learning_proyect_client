import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import Login from "./index.ts";
import {AuthProvider} from '../AuthContext/AuthProvider.tsx';
import {MemoryRouter} from 'react-router-dom';

describe('Login', () => {
    it('calls the login function when the form is submitted', async () => {
        const mockLogin = vi.fn();

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </AuthProvider>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: {value: 'testuser'},
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: {value: 'password123'},
        });

        // Submit the form
        fireEvent.click(screen.getByText('Login'));

        // Ensure the login function was called
        expect(mockLogin).toHaveBeenCalledWith('fake-token'); // Adjust based on your implementation
    });
});