import {Box, Container, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DecksService} from "../../services/DecksService.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";

export default function Library() {
    const navigate = useNavigate();

    const [decks, setDecks] = useState<DeckModel[]>([]);

    const breadcrumbs = [{name: 'Dashboard', url: '/'}, {name: 'Library', url: ''}];

    useEffect(() => {
        DecksService.getAllDecks().then((data) => {
            setDecks(data);
        }).catch((error) => {
            console.log("Error", error);
        });
    }, []);

    const handleSelectedDeck = useCallback((deckId: string) => {
        navigate('./cards/' + deckId);
    }, [navigate]);

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>

            <Container maxWidth="sm">
                <List>
                    {decks ? decks.map(deck => (
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
                        <>No Data</>
                    )}
                </List>
            </Container>
        </Container>
    );
}