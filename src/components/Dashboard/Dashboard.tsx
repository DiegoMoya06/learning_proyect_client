import {Box, Card, CardActionArea, CardContent, Container, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {useAppDispatch} from "../../utils/store.ts";
import {setDemoMode} from "../../slices/demoSlice.ts";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const breadcrumbs = [
        {name: 'Dashboard', url: ''}
    ];

    const handleNavigate = useCallback((url: string) => {
        if (url === "deckDetails") {
            dispatch(setDemoMode(true));
        }

        navigate(url, {state: {isDemo: true}});
    }, []);

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Card sx={{maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3}}>
                    <CardActionArea
                        onClick={() => handleNavigate('deckDetails')}
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
                                Demo of Learning Cards
                            </Typography>
                            <Divider/>
                            <Typography variant="body1" color="text.secondary">
                                With this tool, you can now:
                            </Typography>
                            <Box component="ul" sx={{pl: 2, mb: 2}}>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    <strong>Automatically create decks</strong> to organize your study materials
                                    efficiently.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    <strong>View detailed insights</strong> for each deck, including:
                                    <Box component="ul" sx={{pl: 2}}>
                                        <Typography component="li" variant="body2" color="text.secondary">
                                            The number of cards in every deck.
                                        </Typography>
                                        <Typography component="li" variant="body2" color="text.secondary">
                                            How many times each card has been displayed.
                                        </Typography>
                                        <Typography component="li" variant="body2" color="text.secondary">
                                            The date of the last time a card was shown.
                                        </Typography>
                                    </Box>
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    <strong>Edit card information</strong> to keep your content up-to-date.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    <strong>Start learning</strong> immediately and track your progress seamlessly.
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                Simplify your study routine and stay on top of your learning goals with ease!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container>
    );
}