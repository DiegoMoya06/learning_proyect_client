import {
    Box,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DecksService} from "../../services/DecksService.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";
import {useAppDispatch} from "../../utils/store.ts";
import {Notifications} from "../../slices/notificationSlice.ts";

export default function Library() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [decks, setDecks] = useState<DeckModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const breadcrumbs = [{name: 'Dashboard', url: '/'}, {name: 'Library', url: ''}];

    useEffect(() => {
        DecksService.getAllDecks().then((data) => {
            setDecks(data);
        }).catch((error) => {
            console.log(error);
            let formattedError = error.toString();

            if (error.toString().includes("File size")) {
                formattedError = "Network error occurred";
            }

            dispatch(Notifications.notifyError(formattedError, 4000))
        }).finally(() => setIsLoading(false));
    }, []);

    const handleSelectedDeck = useCallback((deckId: string) => {
        navigate('./cards/' + deckId);
    }, [navigate]);

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>

            <Container maxWidth="sm">
                <List>
                    {decks.length > 0 ? decks.map(deck => (
                        <Box key={deck.id}>
                            <ListItem>
                                <ListItemButton onClick={() => handleSelectedDeck(deck.id)}>
                                    <ListItemText
                                        primary={deck.name}
                                        secondary={deck.description}
                                    />
                                    <ArrowForwardIosIcon/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </Box>
                    )) : (
                        <Box sx={{display: "flex", justifyContent: "center", marginTop: "3rem"}}>
                            {isLoading ? (
                                <CircularProgress size="3rem"/>
                            ) : (
                                <Typography data-testid="new-a-card-title" gutterBottom variant="h6">
                                    No Decks to display
                                </Typography>
                            )}
                        </Box>
                    )}
                </List>
            </Container>
        </Container>
    );
}