import {Box, Card, CardActionArea, CardContent, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {useAppDispatch} from "../../utils/store.ts";
import {setDemoMode} from "../../slices/demoSlice.ts";

const optionDetails = [
    {
        id: 1,
        title: 'Demo',
        description: 'Example of the application.',
        url: 'deckDetails'
    },
    {
        id: 2,
        title: 'Login',
        description: 'Start learning with your own decks and cards.',
        url: 'login'
    },
];

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = useCallback((url: string) => {
        if (url === "deckDetails"){
            dispatch(setDemoMode(true));
        }

        navigate(url);
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography sx={{mt: 4, mb: 6}} variant="h6" component="div">
                Choose one of the following options
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {optionDetails.map((card) => (
                    <Card key={card.id} sx={{marginLeft: '3rem', width: '15rem', height: '7rem'}}>
                        <CardActionArea
                            onClick={() => handleNavigate(card.url)}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{height: '100%'}}>
                                <Typography variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}