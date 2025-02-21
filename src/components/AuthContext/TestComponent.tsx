import {useAuth} from "./AuthProvider.tsx";
import {Box, Button} from "@mui/material";

export default function TestComponent(){
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <Box>
            <span>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
            <Button onClick={() => login('fake-token')}>Login</Button>
            <Button onClick={() => logout()}>Logout</Button>
        </Box>
    );
}