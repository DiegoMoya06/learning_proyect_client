import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {Lock as LockIcon} from '@mui/icons-material';
import {useAuth} from "../AuthContext/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../utils/store.ts";
import {Notifications} from "../../slices/notificationSlice.ts"; //

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Simple validation
        setEmailError(!email.includes('@'));
        setPasswordError(password.length < 6);

        if (email.includes('@') && password.length >= 6) {
            // TODO: complete later
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ username, password }),
            // });

            // if (response.ok) {
            if (1 === 1) {
                // const { token } = await response.json();
                login("token"); // Save token and update auth state
                navigate('/'); // Redirect to a protected route
                dispatch(Notifications.notifySuccess('Login successful!', 2000));
            }
        } else {
            dispatch(Notifications.notifyError('Login failed!', 2000));
        }
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{padding: 4, marginTop: 8}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LockIcon sx={{fontSize: 40, color: 'primary.main', mb: 2}}/> {/* Optional: Lock icon */}
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1, width: '100%'}}>
                        {/*<Box sx={{mt: 1, width: '100%'}}>*/}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                            helperText={emailError ? 'Please enter a valid email address' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError}
                            helperText={passwordError ? 'Password must be at least 6 characters' : ''}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}