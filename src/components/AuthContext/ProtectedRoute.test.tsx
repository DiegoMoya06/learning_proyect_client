import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {AuthProvider} from "./AuthProvider.tsx";
import {Box} from "@mui/material";

// Mock components for testing
const Login = () => <Box>Login Page</Box>;
const Library = () => <Box>Library Page</Box>;

describe('ProtectedRoute', () => {
    it('redirects unauthenticated users to the login page', () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/library']}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/library" element={<Library/>}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        // Unauthenticated users should be redirected to the login page
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('allows authenticated users to access protected routes', () => {
        // Mock localStorage to simulate an authenticated user
        localStorage.setItem('token', 'fake-token');

        render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/library']}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/library" element={<Library/>}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        // Authenticated users should see the protected route
        expect(screen.getByText('Library Page')).toBeInTheDocument();

        // Clean up localStorage
        localStorage.removeItem('token');
    });
});