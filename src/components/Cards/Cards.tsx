import {Box, Button, Card, CardContent, Container, Divider, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './cards.css';
import {CardsService} from "../../services/CardsService.ts";
import {useParams} from "react-router-dom";
import {CardModel} from "../../types/models/CardModel.ts";
import {card1, card2, card3, card4} from "../../testData/cardData.ts";


// TODO: remove when db is connected
const cards: CardModel[] = [card1, card2, card3, card4];

export default function Cards() {
    let {deckId} = useParams();

    const [dbCards, setDbCards] = useState<CardModel[]>([]);

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

    const [selectedCard, setSelectedCard] = useState<CardModel | null>(cards.find(card => card.rate === 1) || null);

    const handleRateCard = useCallback(() => {
        //     TODO: update rate of card
        if (!selectedCard) {
            return;
        }
        const index = cards.findIndex(card => card.id === selectedCard?.id);

        setSelectedCard(index < (cards.length - 1) ? cards[index + 1] : cards[0]);
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