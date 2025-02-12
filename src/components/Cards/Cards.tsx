import {Box, Button, Card, CardContent, Container, Divider, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './cards.css';
import {CardsService, ShownCard} from "./CardsService.ts";
import {useParams} from "react-router-dom";


// TODO: remove when db is connected
// TODO: add card interface when db is designed
const cards: ShownCard[] = [
    {
        id: 1,
        // TODO: long text to test css
        // title: 'Plants Plants Plants Plants Plants Plants Plants Plants  Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants Plants ',
        // description: 'Plants are essential for all life.' +
        //     'Plants are essential for all life.' +
        //     'Plants are essential for all life.' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life. ' +
        //     'Plants are essential for all life. Plants are essential for all life.',
        title: 'Plants',
        description: 'Plants are essential for all life.',
        order: 1
    },
    {
        id: 2,
        title: 'Animals',
        description: 'Animals are a part of nature.',
        order: 2
    },
    {
        id: 3,
        title: 'Humans',
        description: 'Humans depend on plants and animals for survival.',
        order: 3
    },
];

export default function Cards() {
    let {deckId} = useParams();

    const [dbCards, setDbCards] = useState<ShownCard[]>([]);

    useEffect(() => {
        if (deckId) {
            CardsService.getAllCadsByDeckId(deckId).then((data) => {
                setDbCards(data);
            }).catch((error) => {
                console.log("Error", error);
            });
        }
    }, [deckId]);

    useEffect(() => {
        // TODO: remove later
        console.log("CARDS", dbCards);
    }, [dbCards]);

    const [selectedCard, setSelectedCard] = useState<ShownCard | null>(cards.find(card => card.order === 1) || null);

    const handleRateCard = useCallback(() => {
        //     TODO: update rate of card
        if (!selectedCard) {
            return;
        }

        const nextCard = cards.find(card => card.order === selectedCard?.order + 1);
        setSelectedCard(nextCard ?? cards[0]);
    }, [selectedCard, cards]);

    return (
        <Container maxWidth="lg">
            <Box className="main_content">
                {selectedCard ? (
                    <Card className="card" key={selectedCard.id}>
                        <CardContent className="card_content">
                            <Box className="card_title">
                                <Typography gutterBottom variant="h6">
                                    {selectedCard.title}
                                </Typography>
                                <Divider/>
                            </Box>

                            <Box className="card_description">
                                <Typography className="description_text" gutterBottom>
                                    {selectedCard.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography gutterBottom variant="h6">
                        No cards available
                    </Typography>
                )}

                <Box className="actions">
                    <Button data-testid="again-button" size="large" variant="outlined" endIcon={<ReplayIcon/>}
                            onClick={handleRateCard}>
                        Again
                    </Button>
                    <Button data-testid="good-button" size="large" variant="outlined" endIcon={<DoneIcon/>}
                            onClick={handleRateCard}>
                        Good
                    </Button>
                    <Button data-testid="easy-button" size="large" variant="outlined" endIcon={<DoneAllIcon/>}
                            onClick={handleRateCard}>
                        Easy
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}