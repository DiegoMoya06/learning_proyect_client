import {Box, Container, Divider, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Deck, LibraryService} from "./LibraryService.ts";

// TODO: will be removed when having db data
const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 14},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 11},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export default function Library() {
    const navigate = useNavigate();

    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        LibraryService.getAllDecks().then((data) => {
            setDecks(data);
        }).catch((error) => {
            console.log("Error", error);
        });
    }, []);

    useEffect(() => {
        // TODO: remove later
        console.log("DECKS", decks);
    }, [decks]);

    const handleSelectedDeck = useCallback((deckId: string) => {
        navigate('./cards/' + deckId);
    }, [navigate]);

    return (
        <Container maxWidth="lg">
            <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                Library
            </Typography>

            <Container maxWidth="sm">
                <List>
                    {rows ? rows.map(row => (
                        <Box key={row.id}>
                            <ListItem>
                                <ListItemButton onClick={() => handleSelectedDeck(row.id.toString())}>
                                    <ListItemText
                                        primary={row.firstName}
                                        secondary={row.lastName}
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